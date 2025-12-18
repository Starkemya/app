const CACHE_VERSION = 'v3';
const CACHE_NAME = `starkemya-cache-${CACHE_VERSION}`;

// Lista de archivos esenciales que deben guardarse en el dispositivo.
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/logo-cubo.png',
  '/sonido.mp3',

  // Dado GEN
  '/marte-marte.png',
  '/marte-venus.png',
  '/venus-marte.png',
  '/venus-venus.png',
  '/marte.png',
  '/venus.png',

  // Dado TANTRA
  '/tm.png',
  '/tv.png',
  '/t1.png',
  '/t2.png',
  '/t3.png',
  '/t4.png',

  // Cartas Interacciones
  '/interaccion.png',
  '/imasturbaciongenital.png',
  '/ioralgenital.png',
  '/masakes.png',
  '/oralcorporal.png',
  '/penetracion%20anal.png',
  '/exploracionanala.png',
  '/ifree.png',

  // Cartas Spots
  '/spots.png',
  '/sexterior.png',
  '/sillon.png',
  '/bano.png',
  '/cama.png',
  '/cocina.png',
  '/sfree.png'
];

// Evento: Instalación del Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .catch(error => {
        console.error('Fallo al precargar el cache:', error);
      })
  );

  self.skipWaiting();
});

// Evento: Activación (Limpia los caches viejos para ahorrar espacio)
self.addEventListener('activate', event => {
  event.waitUntil(
    caches
      .keys()
      .then(cacheNames =>
        Promise.all(
          cacheNames
            .filter(name => name.startsWith('starkemya-cache-') && name !== CACHE_NAME)
            .map(cacheName => caches.delete(cacheName))
        )
      )
      .then(() => self.clients.claim())
  );
});

// Evento: Recuperar archivos (Estrategia: Cache First)
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) return response;

      return fetch(event.request)
        .then(networkResponse => {
          const clonedResponse = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clonedResponse));
          return networkResponse;
        })
        .catch(() => caches.match('/'));
    })
  );
});