self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("memoria-cache-v1").then((cache) => {
      return cache.addAll([
        "./centurycyclememoria.html",
        "./icon.jpg",
        "./manifest.json"
        // 必要なら背景画像やキャラ画像もここに追加
      ]);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
