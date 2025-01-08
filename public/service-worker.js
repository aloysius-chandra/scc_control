const CACHE_NAME = "scc-control-cache-v1";
const urlsToCache = [
  "/", // alias ke index.html
  "/index.html",
  "/address_a.html",
  "/address_b.html",
  "/manifest.json",
  "/icon-192x192.png",
  "/icon-512x512.png",
  "/screenshot1.png",
  "/screenshot2.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Caching all resources");
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      // Jika permintaan adalah untuk navigasi halaman, fallback ke cache
      if (event.request.mode === "navigate") {
        return caches.match("/index.html");
      }

      // Coba fetch dari jaringan jika tidak ditemukan di cache
      return fetch(event.request).catch(() => caches.match("/index.html"));
    })
  );
});


self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
