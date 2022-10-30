const CACHE_NAME = "version-1"
const urlsToCache = ["index.html","offline.html"]


this.addEventListener('install',(event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log("Opened Cache");
            return cache.addAll(urlsToCache);

        })

    )


})

this.addEventListener('fetch', (event) =>{
    event.respondWith(
        caches.match(event.request).then((res) =>{
            return fetch(event.request).catch(() => caches.match('offline.html'))


        })

        
    )

})

this.addEventListener('activate',(event) => {
    const cacheWhiteList = []
    event.waitUntil(cache.keys().then((cacheNames) => {
        cacheNames.map((cacheName) =>{
            if(!cacheWhiteList.includes(cacheName))
            {
                return cache.delete(cacheName)
            }

        })


    }))


})


