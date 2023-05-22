const CONFIG = {
	cacheName: 'service-worker',
	urlsToCache: ['index.html', 'offline.html'],
};

// Install SW
this.addEventListener('install', (evt) => {
	evt.waitUntil(
		caches.open(CONFIG.cacheName).then((cache) => {
			return cache.addAll(CONFIG.urlsToCache);
		})
	);
});

// Listen for requests
this.addEventListener('fetch', (evt) => {
	evt.respondWith(
		caches.match(evt.request).then(() => {
			return fetch(evt.request).catch(() => {
				return caches.match('offline.html');
			});
		})
	);
});

// Activate SW
this.addEventListener('activate', (evt) => {
	const cacheWhiteList = [];

	cacheWhiteList.push(CONFIG.cacheName);

	evt.waitUntil(
		caches.keys().then((cacheNames) =>
			Promise.all(
				cacheNames.map((cacheName) => {
					if (!cacheWhiteList.includes(cacheName)) {
						return caches.delete(cacheName);
					}
				})
			)
		)
	);
});
