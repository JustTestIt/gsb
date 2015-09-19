importScripts('serviceworker-cache-polyfill.js');

var CACHE_NAME = 'cache-app-v3';
var urlsToCache = [
    '/GS%20Bryggeri/index.html',
    '/GS%20Bryggeri/main.css',
    '/GS%20Bryggeri/main.css',
    '/GS%20Bryggeri/font-awesome/css/font-awesome.min.css',
    '/GS%20Bryggeri/font-awesome/fonts/fontawesome-webfont.eot?v=4.4.0',
    '/GS%20Bryggeri/font-awesome/fonts/fontawesome-webfont.eot?#iefix&v=4.4.0',
    '/GS%20Bryggeri/font-awesome/fonts/fontawesome-webfont.woff2?v=4.4.0',
    '/GS%20Bryggeri/font-awesome/fonts/fontawesome-webfont.woff?v=4.4.0',
    '/GS%20Bryggeri/font-awesome/fonts/fontawesome-webfont.ttf?v=4.4.0',
    '/GS%20Bryggeri/font-awesome/fonts/fontawesome-webfont.svg?v=4.4.0#fontawesomeregular'

];

self.addEventListener('install', function (event) {
    console.log('Installed')
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
    console.log('fetched');
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
    console.log('Activated');
    var cacheWhitelist = ['cache-app-v3'];

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