import { defineConfig } from "vite";
import { resolve } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { imagetools } from "vite-imagetools";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  root: "app",
  base: "./",
  server: {
    host: "0.0.0.0",
    allowedHosts: true,
  },
  preview: {
    host: "0.0.0.0",
    allowedHosts: true,
  },
  plugins: [
    imagetools({
      defaultDirectives: (url) => {
        // Apply webp conversion to all images in our images directory
        if (url.pathname.includes("/images/")) {
          return new URLSearchParams({
            format: "webp",
            quality: "80",
          });
        }
        return new URLSearchParams();
      },
    }),
  ],
  build: {
    outDir: "../docs",
    emptyOutDir: true,
    assetsInlineLimit: 0,
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
