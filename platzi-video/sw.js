/* eslint-disable */
const VERSION = 'v1'

self.addEventListener('install', event => {
  event.waitUntil(precache())
})

self.addEventListener('fetch', event => {
  const request = event.request
  // get
  if (request.method !== 'GET') {
    return
  }

  // buscar en cache
  event.respondWith(cachedResponse(request))

  // actualziar el cache
  event.waitUntil(updateCache())
})

async function precache () {
  const cache = await caches.open(VERSION)
  return cache.addAll([
    // '/',
    // '/index.html',
    // '/assets/js/index.ts',
    // '/assets/css/styles.css',
    // '/assets/video/bigBuckBunny.mp4'
  ])
}

async function cachedResponse (request) {
  const cache = await caches.open(VERSION)
  const response = await cache.match(request)

  return response || fetch(request)
}

async function updateCache (request) {
  const cache = await caches.open(VERSION)
  const response = await fetch(request)
  return cache.put(request, response)
}