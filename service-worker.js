self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open('my-app-cache').then((cache) => {
        return cache.addAll([
          '/',
          '/index.html',
          '/manifest.json',
          '/icon-192x192.png',
          '/icon-512x512.png',
          'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css',
          'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css',
          'https://cdn.jsdelivr.net/npm/ua-parser-js@1.0.35/src/ua-parser.min.js',
          'https://cdn.jsdelivr.net/npm/device.js',
          'https://cdn.jsdelivr.net/npm/moment@2.29.1/moment.min.js'
        ])
        .catch(error => {
          console.error('Failed to cache resources:', error);
        });
      })
    );
  });
  
  self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request).catch((error) => {
          console.error('Fetch failed; returning offline page:', error);
        });
      })
    );
  });
  