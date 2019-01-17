/**
 * Created by rahman on 1/17/2019.
 */


var cacheName ='v2';

//call Install Event

self.addEventListener('install', function(event) {
    // Perform install steps
    console.log('Service worker: Installed');

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
        fetch(event.request).then(
            function(res){
                // <ake copy/clone of rsponse
                var resClone=res.clone();

                //Open Cache
                caches
                    .open(cacheName)
                    .then(function(cache){
                        cache.put(event.request,resClone);
                    });
                return res;
            }).catch(function(err){
                caches.match(event.request).then(function(res){
                    res
                })
            })
    );
});