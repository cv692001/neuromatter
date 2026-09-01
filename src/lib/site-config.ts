/// <reference types="vite/client" />

/**
 * Single source of truth for the production origin and per-route SEO metadata.
 *
 * Consumed in three places so canonical URLs can never drift apart:
 *   - `useSEO` at runtime (client-side navigation)
 *   - the sitemap plugin at build time
 *   - the prerender plugin at build time (writes the canonical into static HTML)
 *
 * Override the origin for a preview deployment with VITE_SITE_URL.
 */

const DEFAULT_SITE_URL = "https://www.neuromatter.in";

// `import.meta.env` is inlined by Vite in the client build. The build-time
// plugins import this module from plain Node, where it is undefined.
const ENV_SITE_URL = import.meta.env?.VITE_SITE_URL as string | undefined;

/** Production origin, no trailing slash. */
export const SITE_URL = (ENV_SITE_URL || DEFAULT_SITE_URL).replace(/\/+$/, "");

/** Turn a site-relative path into an absolute URL on the canonical origin. */
export function absoluteUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Shared social preview image. */
export const OG_IMAGE = absoluteUrl("/neuromatter-logo.png");

export interface PageSeo {
  /** Route path as registered in App.tsx. Doubles as the canonical path. */
  path: string;
  /** Omitted where the page should keep the site-wide default from index.html. */
  title?: string;
  description?: string;
  keywords?: string;
  ogType?: "website" | "article";
  /** Whether the route belongs in sitemap.xml. */
  inSitemap?: boolean;
}

/**
 * Every route in App.tsx that should be crawlable, with its canonical path.
 * Titles/descriptions are only listed where the page already defined its own —
 * the rest intentionally inherit the site-wide defaults from index.html.
 */
export const PAGES: PageSeo[] = [
  {
    path: "/",
    title: "Neuromatter",
    description:
      "The world's preeminent neuromarketing and neuroanalytics resource. We measure memory to predict future behavior.",
    ogType: "website",
    inSitemap: true,
  },
  {
    path: "/offerings",
    title: "Neuromarketing Services in India | Neuromatter Offerings",
    description:
      "Three tiers of neuromarketing services: pre-launch creative diagnostics, conversion architecture for pricing and product pages, and full-spectrum launch strategy.",
    ogType: "website",
    inSitemap: true,
  },
  {
    path: "/technology",
    title: "EEG Neuromarketing Technology & Brain Imaging | Neuromatter",
    description:
      "How we measure brain response: medical-grade Emotiv Insight EEG, Brainviz multi-regional activity mapping, and EmotivPRO analysis translated into marketing decisions.",
    ogType: "website",
    inSitemap: true,
  },
  {
    path: "/news",
    title: "Neuromarketing News, Research & Blog | Neuromatter",
    description:
      "Neuromarketing news, research and in-depth articles on consumer psychology, CRO and behavioral science from Neuromatter's team in India.",
    ogType: "website",
    inSitemap: true,
  },
  {
    path: "/best-neuromarketing-agency-india",
    title:
      "Who Is the Best Neuromarketing Agency in India in 2026? Our Ranked List",
    description:
      "Most agencies guess. The best neuromarketing agencies in India measure your consumer's brain. Here are the top 5 in 2026, ranked by actual neuroscience, not hype.",
    keywords:
      "Best neuromarketing agency in India, neuromarketing agency, consumer neuroscience agency, EEG marketing research, neuromarketing services, neuroscience marketing agency, consumer behavior research, brain-based marketing, advertising neuroscience",
    ogType: "article",
    inSitemap: true,
  },
  {
    path: "/best-conversion-rate-optimization-agencies-india",
    title:
      "Top 5 Best Conversion Rate Optimization Agencies in India Using Consumer Psychology",
    description:
      "Most CRO agencies test buttons. The best conversion rate optimization agencies in India rewire how your visitor's brain decides. See our 2026 ranked list.",
    keywords:
      "Best conversion rate optimization agency in India, CRO agency, conversion rate optimization, consumer psychology, neuromarketing agency, website conversion optimization, CRO experts, conversion optimization company",
    ogType: "article",
    inSitemap: true,
  },
  {
    path: "/conversion-rate-optimization-strategy",
    title:
      "Conversion Rate Optimization Strategy Powered by Neuroscience & Psychology",
    description:
      "Discover a proven conversion rate optimization strategy using neuroscience, consumer psychology, and behavioral science to increase conversions, and turn more visitors into customers.",
    keywords:
      "conversion rate optimization strategy, CRO strategy, conversion rate optimization, website conversion optimization, neuroscience marketing, consumer psychology, behavioral psychology, neuromarketing, conversion optimization strategy",
    ogType: "article",
    inSitemap: true,
  },
  {
    path: "/how-to-increase-roas-meta-ads",
    title:
      "How to Increase ROAS on Meta Ads Using Neuroscience & Emotional Marketing",
    description:
      "Learn how to increase ROAS on Meta Ads using neuroscience, emotional marketing, and consumer psychology. Discover proven strategies to improve ad performance, lower acquisition costs, and maximize return on ad spend.",
    keywords:
      "How to Increase ROAS, Meta Ads ROAS, increase ROAS on Meta Ads, return on ad spend, Meta Ads optimization, Facebook Ads ROAS, emotional marketing, consumer psychology, neuroscience marketing, Meta advertising strategy, improve ad performance, digital advertising, paid social marketing",
    ogType: "article",
    inSitemap: true,
  },
  // Crawlable and self-canonical, but kept out of the sitemap.
  { path: "/privacy", ogType: "website", inSitemap: false },
  { path: "/terms", ogType: "website", inSitemap: false },
];

/** Lookup by route path, for `useSEO` at the top of each page component. */
export const PAGE_SEO: Record<string, PageSeo> = Object.fromEntries(
  PAGES.map((page) => [page.path, page])
);

/** Routes emitted into sitemap.xml. "/" is added by the sitemap plugin itself. */
export const SITEMAP_ROUTES = PAGES.filter(
  (page) => page.inSitemap && page.path !== "/"
).map((page) => page.path);
