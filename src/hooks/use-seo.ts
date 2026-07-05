import { useEffect } from "react";

interface SEOOptions {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
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

export function useSEO({ title, description, keywords, canonical }: SEOOptions) {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = title;

    setMeta("name", "description", description);
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);

    if (keywords) {
      setMeta("name", "keywords", keywords);
    }

    let canonicalEl = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const previousCanonical = canonicalEl?.getAttribute("href") ?? null;
    if (canonical) {
      if (!canonicalEl) {
        canonicalEl = document.createElement("link");
        canonicalEl.setAttribute("rel", "canonical");
        document.head.appendChild(canonicalEl);
      }
      canonicalEl.setAttribute("href", canonical);
    }

    return () => {
      document.title = previousTitle;
      if (canonical && canonicalEl && previousCanonical !== null) {
        canonicalEl.setAttribute("href", previousCanonical);
      }
    };
  }, [title, description, keywords, canonical]);
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
