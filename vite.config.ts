import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mdx from "@mdx-js/rollup";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import path from "path";
import { cards } from "./src/data/cards";
import { communities, getCommunityDomain } from "./src/data/communities";

// Same-origin proxy for the La Crypta CRM public events API (it sends no CORS headers).
// Mirrors the production rewrites in vercel.json and public/_redirects.
const crmProxy = {
  "/api/crm": {
    target: "https://crm.lacrypta.ar",
    changeOrigin: true,
    rewrite: (p: string) => p.replace(/^\/api\/crm\/([^/]+)\/events/, "/api/public/organizations/$1/events"),
  },
};

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
    {
      name: "communities-endpoint",
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === "/api/communities") {
            res.setHeader("Content-Type", "application/json");
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.end(JSON.stringify(communities.map((c) => ({
              ...c,
              domain: getCommunityDomain(c),
            }))));
            return;
          }

          const match = req.url?.match(/^\/api\/community\/(.+?)$/);
          if (match) {
            const domain = decodeURIComponent(match[1]);
            const community = communities.find(
              (c) => getCommunityDomain(c) === domain
            );
            if (community) {
              res.setHeader("Content-Type", "application/json");
              res.setHeader("Access-Control-Allow-Origin", "*");
              res.end(JSON.stringify({
                ...community,
                domain: getCommunityDomain(community),
              }));
              return;
            }
            res.statusCode = 404;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ error: "Community not found" }));
            return;
          }

          next();
        });
      },
      generateBundle() {
        const prefix = "https://veintiuno.lat";
        const communitiesWithUrls = communities.map((community) => ({
          ...community,
          domain: getCommunityDomain(community),
          avatarImage: community.avatarImage
            ? `${prefix}${community.avatarImage}`
            : undefined,
          backgroundImage: community.backgroundImage?.startsWith("/")
            ? `${prefix}${community.backgroundImage}`
            : community.backgroundImage,
        }));

        // GET /api/communities.json — list all communities
        this.emitFile({
          type: "asset",
          fileName: "api/communities.json",
          source: JSON.stringify(communitiesWithUrls, null, 2),
        });

        // GET /api/community/{domain}.json — get community by domain
        for (const community of communitiesWithUrls) {
          if (community.domain) {
            this.emitFile({
              type: "asset",
              fileName: `api/community/${community.domain}.json`,
              source: JSON.stringify(community, null, 2),
            });
          }
        }
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
    proxy: crmProxy,
  },
  preview: {
    proxy: crmProxy,
  },
  css: {
    devSourcemap: true,
    postcss: "./postcss.config.js",
  },
  // Build settings: vendor splitting + larger warning threshold for known leaflet weight.
  build: {
    cssCodeSplit: true,
    sourcemap: true,
    // three.js (~800 kB) lives in the lazy GlobeScene chunk, loaded only when a globe scrolls into view.
    // Don't add it to manualChunks: that drags shared helpers into the entry and preloads three.
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          "motion-vendor": ["framer-motion"],
          "leaflet-vendor": ["leaflet", "react-leaflet"],
          "ui-vendor": [
            "@radix-ui/react-dialog",
            "@radix-ui/react-select",
            "@radix-ui/react-separator",
            "@radix-ui/react-slot",
            "@radix-ui/react-tooltip",
          ],
          "nostr-vendor": ["@nostr-dev-kit/ndk", "nostr-tools"],
          "qrcode-vendor": ["qrcode", "qrcode.react"],
        },
      },
    },
  },
});
