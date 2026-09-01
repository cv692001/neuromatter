import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import Sitemap from "vite-plugin-sitemap";
import { SITE_URL, SITEMAP_ROUTES } from "./src/lib/site-config";
import { prerenderSeo } from "./scripts/prerender-seo";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    proxy: {
      // Avoid CORS when submitting email to Google Apps Script from localhost
      "/api/sheet-submit": {
        target: "https://script.google.com",
        changeOrigin: true,
        secure: true,
        rewrite: (path) =>
          "/macros/s/AKfycbzOA9q5EiV3sW_4rWud_Y2XhFpMSOmlel34rY1hHI8aS5B9WbfzJWwZw-qpjL7SSB1hDQ/exec",
      },
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    Sitemap({
      hostname: SITE_URL,
      OutDir: "dist",
      // public/robots.txt is the single source of truth; letting the plugin
      // generate one here overwrites it and drops the per-crawler rules.
      generateRobotsTxt: false,
      // Routes come from src/lib/site-config.ts so adding a blog post there
      // puts it in the sitemap and gets it a canonical in one edit.
      // "/" is emitted by the plugin itself — listing it here duplicates it.
      dynamicRoutes: SITEMAP_ROUTES,
      readable: true,
    }),
    prerenderSeo(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
