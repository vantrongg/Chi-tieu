const CACHE = "chi-tieu-v4";

const FILES = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon-512.PNG"
];

self.addEventListener("install", event => {

  event.waitUntil(
    caches
      .open(CACHE)
      .then(cache =>
        cache.addAll(FILES)
      )
  );

  self.skipWaiting();

});


self.addEventListener("activate", event => {

  event.waitUntil(

    caches.keys().then(keys =>

      Promise.all(

        keys
          .filter(key =>
            key !== CACHE
          )
          .map(key =>
            caches.delete(key)
          )

      )

    )

  );

  self.clients.claim();

});


self.addEventListener("fetch", event => {

  event.respondWith(

    caches
      .match(event.request)
      .then(response =>
        response ||
        fetch(event.request)
      )

  );

});
