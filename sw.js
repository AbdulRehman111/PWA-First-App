
var cacheName ='v1';

var urlsToCache = [
    '/',
    '/index.html',
    '/src/css/app.css',
    '/src/js/app.js'

];
//call Install Event
self.addEventListener('install', function(event) {
    // Perform install steps
    console.log('Service worker: Installed');
    event.waitUntil(
        caches.open(cacheName)
            .then(function(cache) {
                console.log('Service worker: Caching Files');
                 cache.addAll(urlsToCache);
            }).then(function(){
                self.skipWaiting();
            })
    );
});

self.addEventListener('activate', function(event){
    console.log('Service Worker:Activated');
    //remove unwanted caches

    event.waitUntil(
        caches.keys().then(function(cacheNames){
            return Promise.all(
                cacheNames.filter(function(cache){
                    if(cache !== cacheName) {
                        console.log('Service Worker: Claring Old cache')
                        return caches.delete(cache);
                    }
        })
    );
})
    );
});

// call fetch event
self.addEventListener('fetch', function(event) {
    console.log('Service Worker: Fetching');
    event.respondWith(
       fetch(event.request).catch(
           function(){
               caches.match(event.request)
           }
       )
    );
});