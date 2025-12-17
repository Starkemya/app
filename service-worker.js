// Define el nombre del cache. Incrementa la versión para forzar la actualización (e.g., v2).
const CACHE_NAME = 'starkemya-cache-v2'; 

// Lista de archivos esenciales que deben guardarse en el dispositivo.
const urlsToCache = [
  '/', // La página principal (index.html)
  '/index.html', 
  '/manifest.json', 
  '/logo-cubo.png', 
  '/sonido.mp3', // <-- Archivo de audio
  
  // <-- Imágenes de Dado GEN -->
  '/marte-marte.png',
  '/marte-venus.png',
  '/venus-marte.png',
  '/venus-venus.png',
  '/marte.png',
  '/venus.png',

  // <-- Imágenes de Dado TANTRA -->
  '/tm.png',
  '/tv.png',
  '/t1.png',
  '/t2.png',
  '/t3.png',
  '/t4.png',

  // <-- Imágenes de Cartas Interacciones -->
  '/interaccion.png',
  '/imasturbaciongenital.png',
  '/ioralgenital.png',
  '/masakes.png',
  '/oralcorporal.png',
  '/penetracion%20anal.png',
  '/exploracionanala.png',
  '/ifree.png',
  
  // <-- Imágenes de Cartas Spots -->
  '/spots.png',
  '/sexterior.png',
  '/sillon.png',
  '/baño.png',
  '/cama.png',
  '/cocina.png',
  '/sfree.png'
];

// Evento: Instalación del Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache abierto y precargado');
        return cache.addAll(urlsToCache);
      })
      .catch(error => {
        console.error('Fallo al precargar el cache:', error);
      })
  );
});

// Evento: Activación (Limpia los caches viejos para ahorrar espacio)
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Borrando cache viejo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Evento: Recuperar archivos (Estrategia: Cache First)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});