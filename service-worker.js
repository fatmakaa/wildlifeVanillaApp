// Cache name
const CACHE_NAME = "wildlife-cache-v1";

// Files for offline usage
const urlsToCache = [
  "/",
  "/index.html",
  "/animals.html",
  "/map.html",
  "/kids-tips.html",
  "/favourites.html",
  "/about.html",
  "/css/styles.css",
  "/js/theme.js",
  "/js/install.js",
  "/js/network-status.js",
  "/data/animals.json"
];

// INSTALL EVENT – caches all app shell files
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Service Worker: Caching files...");
      return cache.addAll(urlsToCache);
    })
  );
});

// ACTIVATE EVENT – removes old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            console.log("Service Worker: Clearing old cache...");
            return caches.delete(name);
          }
        })
      );
    })
  );
});

// FETCH EVENT – serves cached files when offline
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return (
        cachedResponse ||
        fetch(event.request).catch(() =>
          caches.match("/index.html")  // offline fallback
        )
      );
    })
  );
});