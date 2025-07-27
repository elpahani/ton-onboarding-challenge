#!/usr/bin/env python3
"""
Flask PWA Application Runner
Запуск приложения для разработки
"""

import os
import sys
from app import app

if __name__ == '__main__':
    # Установка переменных окружения для разработки
    os.environ.setdefault('FLASK_ENV', 'development')
    os.environ.setdefault('SECRET_KEY', 'dev-secret-key')
    
    # Запуск приложения
    port = int(os.environ.get('PORT', 5000))
    debug = os.environ.get('FLASK_ENV') == 'development'
    
    print("🚀 Запуск Flask PWA приложения...")
    print(f"📱 Приложение доступно по адресу: http://localhost:{port}")
    print(f"🔧 Режим отладки: {'Включен' if debug else 'Выключен'}")
    print("⏹️  Для остановки нажмите Ctrl+C")
    
    try:
        app.run(host='0.0.0.0', port=port, debug=debug)
    except KeyboardInterrupt:
        print("\n👋 Приложение остановлено")
        sys.exit(0)