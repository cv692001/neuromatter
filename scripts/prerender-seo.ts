import fs from "node:fs";
import path from "node:path";
import type { Plugin } from "vite";

import { PAGES, SITE_URL, OG_IMAGE, absoluteUrl } from "../src/lib/site-config";

/**
 * This app is a client-rendered SPA, and vercel.json rewrites every path to
 * /index.html. That means a crawler requesting /some-blog-post receives the
 * *homepage's* head — including its <link rel="canonical"> — and only sees the
 * per-page canonical that `useSEO` injects if it chooses to execute JS.
 *
 * Google treats that as "every URL declares the same canonical", which is what
 * surfaces as "Discovered - currently not crawled" with no selected canonical.
 *
 * So after the bundle is written, emit dist/<route>/index.html for each route:
 * a byte-identical copy of the SPA shell whose head carries that route's own
 * canonical, og:url, title and description. Vercel serves a matching static
 * file before it applies the SPA rewrite, so crawlers get the right head on the
 * first request while the app still boots and hydrates exactly as before.
 */

function escapeAttr(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function escapeText(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/** Replace an existing <meta> with this name/property, or append one to <head>. */
function setMeta(
  html: string,
  attr: "name" | "property",
  key: string,
  content: string
): string {
  const tag = `<meta ${attr}="${key}" content="${escapeAttr(content)}" />`;
  const existing = new RegExp(
    `<meta\\s+${attr}="${key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"[^>]*>`,
    "i"
  );
  if (existing.test(html)) return html.replace(existing, tag);
  return html.replace(/<\/head>/i, `    ${tag}\n  </head>`);
}

function setCanonical(html: string, href: string): string {
  const tag = `<link rel="canonical" href="${escapeAttr(href)}" />`;
  const existing = /<link\s+rel="canonical"[^>]*>/i;
  if (existing.test(html)) return html.replace(existing, tag);
  return html.replace(/<\/head>/i, `    ${tag}\n  </head>`);
}

function setTitle(html: string, title: string): string {
  return html.replace(
    /<title>[\s\S]*?<\/title>/i,
    `<title>${escapeText(title)}</title>`
  );
}

export function prerenderSeo(): Plugin {
  let outDir = "dist";

  return {
    name: "neuromatter-prerender-seo",
    apply: "build",
    configResolved(config) {
      outDir = config.build.outDir;
    },
    closeBundle() {
      const root = path.resolve(process.cwd(), outDir);
      const shellPath = path.join(root, "index.html");
      if (!fs.existsSync(shellPath)) {
        this.warn(`prerender-seo: ${shellPath} not found, skipping.`);
        return;
      }

      const shell = fs.readFileSync(shellPath, "utf8");

      for (const page of PAGES) {
        const canonical = absoluteUrl(page.path);
        let html = shell;

        html = setCanonical(html, canonical);
        html = setMeta(html, "property", "og:url", canonical);
        html = setMeta(html, "property", "og:type", page.ogType ?? "website");
        html = setMeta(html, "property", "og:image", OG_IMAGE);
        html = setMeta(html, "name", "twitter:image", OG_IMAGE);

        if (page.title) {
          html = setTitle(html, page.title);
          html = setMeta(html, "property", "og:title", page.title);
          html = setMeta(html, "name", "twitter:title", page.title);
        }
        if (page.description) {
          html = setMeta(html, "name", "description", page.description);
          html = setMeta(html, "property", "og:description", page.description);
          html = setMeta(html, "name", "twitter:description", page.description);
        }
        if (page.keywords) {
          html = setMeta(html, "name", "keywords", page.keywords);
        }

        // "/" overwrites the shell in place; every other route gets a directory
        // so Vercel resolves /route -> /route/index.html from the filesystem.
        const target =
          page.path === "/"
            ? shellPath
            : path.join(root, page.path.replace(/^\//, ""), "index.html");

        fs.mkdirSync(path.dirname(target), { recursive: true });
        fs.writeFileSync(target, html, "utf8");
      }

      console.log(
        `prerender-seo: wrote ${PAGES.length} route shells with canonicals on ${SITE_URL}`
      );
    },
  };
}
