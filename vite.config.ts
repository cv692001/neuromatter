import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import Sitemap from "vite-plugin-sitemap";

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
      hostname: "https://www.neuromatter.in",
      OutDir: "dist",
      generateRobotsTxt: true,
      dynamicRoutes: ["/", "/offerings", "/technology", "/news"],
      readable: true,
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
