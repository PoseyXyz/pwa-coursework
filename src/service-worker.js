var cacheName='lessons'
var cacheFiles =[
    'index.html',
    'lessons.webmanifest',
    "../img/icons/android-chrome-192x192.png",
    "../img/icons/android-chrome-512x512.png",
    './images',
    '../public/lessons.webmanifest',
    '../public/manifest.json',
    '../public/manifest.json'
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