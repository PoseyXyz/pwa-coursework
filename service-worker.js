importScripts("/pwa-coursework/precache-manifest.d778c12367655dfed081c97926bbee1e.js", "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

var cacheName='lessons'
var cacheFiles =[
    'index.html',
    'lessons.webmanifest',
    "/img/icons/android-chrome-192x192.png",
    "/img/icons/android-chrome-512x512.png",
    '../src/images',
    '../public/lessons.webmanifest'
]

self.addEventListener('install', e=>{
    console.log('Service Worker install');
    e.waitUntil(
        caches.open(cacheName).then(cache=>{
            console.log('Caching all files');
            return cache.addAll(cacheFiles)
        })
    )
})

self.addEventListener('fetch',  e=>{
    e.respondWith(
        caches.match(e.request).then(function (r){
            return r || fetch (e.request).then(function(response){
                return caches.open(cacheName).then(function(cache){
                    cache.put(e.request, response.clone())
                    return response
                })
            })
        })
    )
})
