// Service Worker для PWA
const CACHE_NAME = 'flask-pwa-v1';
const STATIC_CACHE = 'static-v1';
const DYNAMIC_CACHE = 'dynamic-v1';

// Файлы для кэширования
const STATIC_FILES = [
    '/',
    '/static/css/style.css',
    '/static/js/app.js',
    '/static/js/sw-register.js',
    '/manifest.json',
    '/static/icons/icon-192x192.png',
    '/static/icons/icon-512x512.png'
];

// Установка Service Worker
self.addEventListener('install', event => {
    console.log('Service Worker: Установка');
    
    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then(cache => {
                console.log('Service Worker: Кэширование статических файлов');
                return cache.addAll(STATIC_FILES);
            })
            .then(() => {
                console.log('Service Worker: Установка завершена');
                return self.skipWaiting();
            })
    );
});

// Активация Service Worker
self.addEventListener('activate', event => {
    console.log('Service Worker: Активация');
    
    event.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
                            console.log('Service Worker: Удаление старого кэша', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                console.log('Service Worker: Активация завершена');
                return self.clients.claim();
            })
    );
});

// Перехват запросов
self.addEventListener('fetch', event => {
    const { request } = event;
    const url = new URL(request.url);

    // Пропускаем запросы к API
    if (url.pathname.startsWith('/api/')) {
        return;
    }

    // Стратегия кэширования: Cache First для статических файлов
    if (request.method === 'GET') {
        event.respondWith(
            caches.match(request)
                .then(response => {
                    if (response) {
                        return response;
                    }

                    return fetch(request)
                        .then(response => {
                            // Кэшируем только успешные GET запросы
                            if (response.status === 200 && response.type === 'basic') {
                                const responseToCache = response.clone();
                                caches.open(DYNAMIC_CACHE)
                                    .then(cache => {
                                        cache.put(request, responseToCache);
                                    });
                            }
                            return response;
                        })
                        .catch(() => {
                            // Fallback для HTML страниц
                            if (request.destination === 'document') {
                                return caches.match('/');
                            }
                        });
                })
        );
    }
});

// Обработка push уведомлений
self.addEventListener('push', event => {
    console.log('Service Worker: Push уведомление получено');
    
    const options = {
        body: event.data ? event.data.text() : 'Новое уведомление',
        icon: '/static/icons/icon-192x192.png',
        badge: '/static/icons/icon-192x192.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [
            {
                action: 'explore',
                title: 'Открыть',
                icon: '/static/icons/icon-192x192.png'
            },
            {
                action: 'close',
                title: 'Закрыть',
                icon: '/static/icons/icon-192x192.png'
            }
        ]
    };

    event.waitUntil(
        self.registration.showNotification('Flask PWA', options)
    );
});

// Обработка кликов по уведомлениям
self.addEventListener('notificationclick', event => {
    console.log('Service Worker: Клик по уведомлению');
    
    event.notification.close();

    if (event.action === 'explore') {
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});

// Обработка синхронизации в фоне
self.addEventListener('sync', event => {
    console.log('Service Worker: Фоновая синхронизация', event.tag);
    
    if (event.tag === 'background-sync') {
        event.waitUntil(doBackgroundSync());
    }
});

// Функция фоновой синхронизации
async function doBackgroundSync() {
    try {
        const response = await fetch('/api/health');
        const data = await response.json();
        console.log('Фоновая синхронизация завершена:', data);
    } catch (error) {
        console.error('Ошибка фоновой синхронизации:', error);
    }
}

// Обработка сообщений от основного потока
self.addEventListener('message', event => {
    console.log('Service Worker: Получено сообщение', event.data);
    
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});