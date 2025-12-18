// Service Worker для PWA
const CACHE_NAME = "income-tracker-v3";
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

  const url = new URL(event.request.url);

  // Для динамических JS файлов Next.js всегда используем сеть
  // Они имеют хеши в имени и могут меняться при каждом деплое
  if (
    url.pathname.match(/\/_next\/static\/.*\.js$/) ||
    url.pathname.match(/\/_next\/static\/.*\.css$/) ||
    url.pathname.match(/\/_next\/static\/.*\.woff2?$/)
  ) {
    // Для статических ресурсов Next.js всегда используем сеть
    event.respondWith(
      fetch(event.request).catch(() => {
        // Если запрос не удался, возвращаем ошибку
        return new Response("Resource not found", { status: 404 });
      })
    );
    return;
  }

  // Для остальных запросов используем стратегию Network First
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Если запрос успешен, кэшируем и возвращаем
        if (response.status === 200) {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return response;
      })
      .catch(() => {
        // Если запрос не удался, пытаемся найти в кэше
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          // Для навигационных запросов возвращаем главную страницу
          if (event.request.mode === "navigate") {
            return caches.match("/");
          }
          // Для остальных возвращаем ошибку
          return new Response("Resource not found", { status: 404 });
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
            // Удаляем старые кэши
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  // Активируем Service Worker для всех клиентов
  return self.clients.claim();
});

