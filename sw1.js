importScripts('serviceworker-cache-polyfill.js');

var CACHE_NAME = 'cache-app-v4';
var urlsToCache = [
    '/gsb/index.html',
    '/gsb/main.css',
    '/gsb/main.css',
    '/gsb/font-awesome/css/font-awesome.min.css',
    '/gsb/font-awesome/fonts/fontawesome-webfont.eot?v=4.4.0',
    '/gsb/font-awesome/fonts/fontawesome-webfont.eot?#iefix&v=4.4.0',
    '/gsb/font-awesome/fonts/fontawesome-webfont.woff2?v=4.4.0',
    '/gsb/font-awesome/fonts/fontawesome-webfont.woff?v=4.4.0',
    '/gsb/font-awesome/fonts/fontawesome-webfont.ttf?v=4.4.0',
    '/gsb/font-awesome/fonts/fontawesome-webfont.svg?v=4.4.0#fontawesomeregular'

];

self.addEventListener('install', function (event) {
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                // Cache hit - return response
                if (response) {
                    return response;
                }

                return fetch(event.request);
            }
        )
    );
});

self.addEventListener('activate', function (event) {
    var cacheWhitelist = ['cache-app-v4'];

    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});