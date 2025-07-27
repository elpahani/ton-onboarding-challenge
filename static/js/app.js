// Main Application JavaScript
class PWAApp {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.applyTheme();
        this.checkServerStatus();
        this.setupInstallPrompt();
    }

    setupEventListeners() {
        // Theme toggle
        const themeBtn = document.getElementById('toggleThemeBtn');
        if (themeBtn) {
            themeBtn.addEventListener('click', () => this.toggleTheme());
        }

        // API test button
        const apiBtn = document.getElementById('testApiBtn');
        if (apiBtn) {
            apiBtn.addEventListener('click', () => this.testAPI());
        }

        // Install button
        const installBtn = document.getElementById('installBtn');
        if (installBtn) {
            installBtn.addEventListener('click', () => this.installApp());
        }
    }

    applyTheme() {
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        localStorage.setItem('theme', this.currentTheme);
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme();
        
        // Add animation effect
        document.body.style.transition = 'none';
        setTimeout(() => {
            document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
        }, 10);
    }

    async checkServerStatus() {
        const statusIndicator = document.getElementById('serverStatus');
        const statusData = document.getElementById('statusData');
        const statusDot = statusIndicator?.querySelector('.status-dot');
        const statusText = statusIndicator?.querySelector('.status-text');

        try {
            const response = await fetch('/api/health');
            const data = await response.json();

            if (response.ok) {
                statusDot?.classList.remove('offline');
                statusDot?.classList.add('online');
                statusText.textContent = 'Онлайн';
                statusData.textContent = JSON.stringify(data, null, 2);
            } else {
                throw new Error('Server error');
            }
        } catch (error) {
            statusDot?.classList.remove('online');
            statusDot?.classList.add('offline');
            statusText.textContent = 'Офлайн';
            statusData.textContent = 'Ошибка подключения к серверу';
        }
    }

    async testAPI() {
        const apiBtn = document.getElementById('testApiBtn');
        const originalText = apiBtn.textContent;
        
        try {
            apiBtn.textContent = 'Загрузка...';
            apiBtn.disabled = true;

            const response = await fetch('/api/data');
            const data = await response.json();

            // Show notification
            this.showNotification('API тест успешен!', 'success');
            
            // Update status data
            const statusData = document.getElementById('statusData');
            if (statusData) {
                statusData.textContent = JSON.stringify(data, null, 2);
            }

        } catch (error) {
            this.showNotification('Ошибка API теста', 'error');
        } finally {
            apiBtn.textContent = originalText;
            apiBtn.disabled = false;
        }
    }

    setupInstallPrompt() {
        let deferredPrompt;
        const installBtn = document.getElementById('installBtn');

        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            deferredPrompt = e;
            
            if (installBtn) {
                installBtn.style.display = 'block';
            }
        });

        window.addEventListener('appinstalled', () => {
            if (installBtn) {
                installBtn.style.display = 'none';
            }
            this.showNotification('Приложение установлено!', 'success');
        });
    }

    async installApp() {
        if (window.deferredPrompt) {
            window.deferredPrompt.prompt();
            const { outcome } = await window.deferredPrompt.userChoice;
            
            if (outcome === 'accepted') {
                console.log('Пользователь принял установку');
            } else {
                console.log('Пользователь отклонил установку');
            }
            
            window.deferredPrompt = null;
        }
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 1000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
            word-wrap: break-word;
        `;

        // Set background color based on type
        const colors = {
            success: '#10b981',
            error: '#ef4444',
            warning: '#f59e0b',
            info: '#3b82f6'
        };
        notification.style.backgroundColor = colors[type] || colors.info;

        // Add to page
        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Utility method to show loading state
    showLoading(element, text = 'Загрузка...') {
        const originalText = element.textContent;
        element.textContent = text;
        element.disabled = true;
        return () => {
            element.textContent = originalText;
            element.disabled = false;
        };
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.pwaApp = new PWAApp();
});

// Handle online/offline events
window.addEventListener('online', () => {
    if (window.pwaApp) {
        window.pwaApp.checkServerStatus();
        window.pwaApp.showNotification('Соединение восстановлено', 'success');
    }
});

window.addEventListener('offline', () => {
    if (window.pwaApp) {
        window.pwaApp.showNotification('Соединение потеряно', 'error');
    }
});

// Service Worker update handling
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (window.pwaApp) {
            window.pwaApp.showNotification('Приложение обновлено!', 'success');
        }
    });
}