// Service Worker для PWA
const CACHE_NAME = "income-tracker-v2";
const urlsToCache = [
  "/",
  "/manifest.json",
  "/icon-192.png",
  "/icon-512.png",
  "/apple-touch-icon.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Пытаемся добавить файлы в кэш, игнорируя ошибки 404
      return Promise.allSettled(
        urlsToCache.map((url) =>
          cache.add(url).catch((err) => {
            console.log(`Failed to cache ${url}:`, err);
            return null;
          })
        )
      );
    })
  );
  // Активируем новый Service Worker сразу
  self.skipWaiting();
});

self.addEventListener("fetch", (event) => {
  // Игнорируем запросы, которые не являются GET
  if (event.request.method !== "GET") {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((response) => {
      // Если файл найден в кэше, возвращаем его
      if (response) {
        return response;
      }
      // Иначе делаем запрос к сети
      return fetch(event.request).catch(() => {
        // Если запрос не удался, возвращаем базовую страницу для навигационных запросов
        if (event.request.mode === "navigate") {
          return caches.match("/");
        }
      });
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

