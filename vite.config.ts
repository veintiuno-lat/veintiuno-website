import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mdx from "@mdx-js/rollup";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import path from "path";
import { cards } from "./src/data/cards";

export default defineConfig({
  base: "/",
  plugins: [
    react(),
    mdx({
      remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
    }),
    {
      name: "cards-endpoint",
      generateBundle() {
        // Generate the cards.json file during build for production
        const prefix = "https://veintiuno.lat";
        const cardsWithUrls = cards.map((card) => ({
          ...card,
          id: `veintiuno-${card.id}`,
          imageUrl: `${prefix}${card.imageUrl}`,
        }));

        this.emitFile({
          type: "asset",
          fileName: "api/cards.json",
          source: JSON.stringify(cardsWithUrls, null, 2),
        });
      },
    },
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    include: ["lucide-react"],
  },
  assetsInclude: ["**/*.mdx"],
  // Configuración mejorada para HMR
  server: {
    port: 5173,
    strictPort: true,
    host: true,
    hmr: {
      overlay: true,
      protocol: "ws",
      port: 5173,
    },
    watch: {
      usePolling: false,
      interval: 100,
    },
  },
  css: {
    devSourcemap: true,
    postcss: "./postcss.config.js",
  },
  // Configuración de build para desarrollo
  build: {
    cssCodeSplit: true,
    sourcemap: true,
  },
});
