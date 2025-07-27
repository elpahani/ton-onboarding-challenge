from flask import Flask, render_template, send_from_directory, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv

# Загружаем переменные окружения
load_dotenv()

app = Flask(__name__)
CORS(app)

# Конфигурация
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'dev-secret-key')
app.config['STATIC_FOLDER'] = 'static'

@app.route('/')
def index():
    """Главная страница PWA приложения"""
    return render_template('index.html')

@app.route('/manifest.json')
def manifest():
    """Web App Manifest для PWA"""
    return jsonify({
        "name": "Flask PWA App",
        "short_name": "PWA App",
        "description": "Progressive Web Application built with Flask",
        "start_url": "/",
        "display": "standalone",
        "background_color": "#ffffff",
        "theme_color": "#000000",
        "icons": [
            {
                "src": "/static/icons/icon-192x192.png",
                "sizes": "192x192",
                "type": "image/png"
            },
            {
                "src": "/static/icons/icon-512x512.png",
                "sizes": "512x512",
                "type": "image/png"
            }
        ]
    })

@app.route('/sw.js')
def service_worker():
    """Service Worker для PWA"""
    return app.send_static_file('sw.js')

@app.route('/api/health')
def health_check():
    """API endpoint для проверки здоровья сервера"""
    return jsonify({
        "status": "healthy",
        "message": "Flask PWA server is running"
    })

@app.route('/api/data')
def get_data():
    """Пример API endpoint"""
    return jsonify({
        "data": "Hello from Flask PWA!",
        "timestamp": "2024-01-01T00:00:00Z"
    })

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    debug = os.environ.get('FLASK_ENV') == 'development'
    
    print(f"🚀 Starting Flask PWA server on port {port}")
    print(f"📱 PWA available at: http://localhost:{port}")
    
    app.run(host='0.0.0.0', port=port, debug=debug)