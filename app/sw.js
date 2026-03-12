import imageUrls from "./images.js";

// Import other assets to get their hashed names in the production build
const chunkUrls = import.meta.glob(["./main.js", "./styles.css"], {
  eager: true,
  query: "?url",
  import: "default",
});

(function () {
  const VERSION = "{%VERSION%}";
  const files = [
    ...Object.values(imageUrls).filter((url) => !url.startsWith("data:")),
    ...Object.values(chunkUrls),
    "./",
    "manifest.json",
  ];

  self.oninstall = (event) =>
    event.waitUntil(
      caches
        .open(`tinderforbananas-${VERSION}`)
        .then((cache) => cache.addAll(files)),
    );

  self.onactivate = (event) =>
    event.waitUntil(
      caches.keys().then((cacheNames) =>
        Promise.all(
          cacheNames
            .map((c) => c.split("-"))
            .filter((c) => c[0] === "tinderforbananas")
            .filter((c) => c[1] !== VERSION)
            .map((c) => caches.delete(c.join("-"))),
        ),
      ),
    );

  self.onfetch = (event) =>
    event.respondWith(
      caches
        .match(event.request)
        .then((response) => response || fetch(event.request)),
    );
})();
