import { defineConfig } from "vite";
import { resolve } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  root: "app",
  base: "./", // Use relative paths for assets to support subfolders (like GitHub Pages)
  server: {
    host: "0.0.0.0",
    allowedHosts: true,
  },
  preview: {
    host: "0.0.0.0",
    allowedHosts: true,
  },
  build: {
    outDir: "../docs",
    emptyOutDir: true,
    assetsInlineLimit: 0, // Disable inlining to avoid data URLs in service worker
    rollupOptions: {
      input: {
        main: resolve(__dirname, "app/index.html"),
        sw: resolve(__dirname, "app/sw.js"),
      },
      output: {
        entryFileNames: (chunkInfo) => {
          if (chunkInfo.name === "sw") {
            return "[name].js";
          }
          return "assets/[name]-[hash].js";
        },
      },
    },
  },
  assetsInclude: [
    "**/*.heic",
    "**/*.{jpg,jpeg,JPG}",
    "**/*.png",
    "**/*.gif",
    "**/*.webp",
    "**/*.svg",
  ],
});
