// Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('Service Worker зарегистрирован:', registration);
                
                // Check for updates
                registration.addEventListener('updatefound', () => {
                    const newWorker = registration.installing;
                    newWorker.addEventListener('statechange', () => {
                        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                            // New content is available
                            if (window.pwaApp) {
                                window.pwaApp.showNotification('Доступно обновление!', 'info');
                            }
                        }
                    });
                });
            })
            .catch(error => {
                console.error('Ошибка регистрации Service Worker:', error);
            });
    });
}