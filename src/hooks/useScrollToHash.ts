import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * On mount / hash change, smooth-scroll to the element matching the URL hash.
 * Falls back to scrolling to the top when there is no hash. Lets footer/nav
 * links deep-link into a page's sub-sections (e.g. /offerings#market-command).
 */
export function useScrollToHash() {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      // Wait a frame so the target has rendered before measuring its position.
      requestAnimationFrame(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        } else {
          window.scrollTo(0, 0);
        }
      });
    } else {
      window.scrollTo(0, 0);
    }
  }, [hash, pathname]);
}
