const CACHE_NAME = "xenox-cache-v1";

const urlsToCache = [
  "/xenox-recargas/",
  "/xenox-recargas/index.html",
  "/xenox-recargas/android-chrome-192x192.png",
  "/xenox-recargas/android-chrome-512x512.png"
];

// Instalar
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Activar
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// Fetch (offline)
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});
