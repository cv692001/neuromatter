import { useEffect } from "react";

import { OG_IMAGE, absoluteUrl } from "@/lib/site-config";

interface SEOOptions {
  /**
   * Route path (e.g. "/how-to-increase-roas-meta-ads"). The canonical and
   * og:url are derived from it against the configured origin, so a page can no
   * longer ship a hardcoded — or wrong-domain — absolute URL.
   */
  path: string;
  /** Omit to keep the site-wide default already in the served HTML. */
  title?: string;
  description?: string;
  keywords?: string;
  ogType?: "website" | "article";
}

function setMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export function useSEO({
  path,
  title,
  description,
  keywords,
  ogType = "website",
}: SEOOptions) {
  useEffect(() => {
    const canonical = absoluteUrl(path);

    setCanonical(canonical);
    setMeta("property", "og:url", canonical);
    setMeta("property", "og:type", ogType);
    setMeta("property", "og:image", OG_IMAGE);
    setMeta("name", "twitter:image", OG_IMAGE);

    if (title) {
      document.title = title;
      setMeta("property", "og:title", title);
      setMeta("name", "twitter:title", title);
    }
    if (description) {
      setMeta("name", "description", description);
      setMeta("property", "og:description", description);
      setMeta("name", "twitter:description", description);
    }
    if (keywords) {
      setMeta("name", "keywords", keywords);
    }
    // No cleanup: each route sets its own canonical on mount, and restoring the
    // previous page's canonical during a transition briefly advertised the
    // wrong URL for the page being entered.
  }, [path, title, description, keywords, ogType]);
}

export function useJsonLd(id: string, data: object) {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(data);
    script.setAttribute("data-jsonld-id", id);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
}
