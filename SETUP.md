# 🚀 Быстрый старт Flask PWA

## Установка и запуск

### 1. Активация виртуального окружения
```bash
source venv/bin/activate
```

### 2. Запуск приложения
```bash
python app.py
```

### 3. Открытие в браузере
Откройте http://localhost:5000 в вашем браузере

## Альтернативные способы запуска

### Через run.py (рекомендуется для разработки)
```bash
python run.py
```

### Через Docker
```bash
docker-compose up
```

### Через Docker build
```bash
docker build -t flask-pwa .
docker run -p 5000:5000 flask-pwa
```

## Проверка работоспособности

### API Health Check
```bash
curl http://localhost:5000/api/health
```

### API Data Test
```bash
curl http://localhost:5000/api/data
```

## PWA Функции

1. **Установка на устройство** - нажмите кнопку "Установить" в браузере
2. **Темная/светлая тема** - кнопка "Сменить тему"
3. **Офлайн режим** - работает без интернета
4. **Push уведомления** - поддержка уведомлений

## Структура проекта

```
├── app.py              # Основной Flask сервер
├── run.py              # Альтернативный запуск
├── requirements.txt    # Python зависимости
├── templates/          # HTML шаблоны
│   └── index.html     # Главная страница
├── static/            # Статические файлы
│   ├── css/           # Стили
│   ├── js/            # JavaScript
│   ├── icons/         # Иконки PWA
│   └── sw.js          # Service Worker
├── Dockerfile         # Docker конфигурация
└── docker-compose.yml # Docker Compose
```

## Разработка

### Добавление новых API endpoints
Добавьте в `app.py`:
```python
@app.route('/api/new-endpoint')
def new_endpoint():
    return jsonify({"message": "New endpoint"})
```

### Изменение стилей
Редактируйте `static/css/style.css`

### Изменение логики
Редактируйте `static/js/app.js`

## Проблемы и решения

### Порт занят
Измените порт в `app.py` или используйте:
```bash
export PORT=5001
python app.py
```

### Ошибки зависимостей
Переустановите виртуальное окружение:
```bash
rm -rf venv
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### PWA не работает
1. Убедитесь, что используется HTTPS (для продакшена)
2. Проверьте консоль браузера на ошибки
3. Убедитесь, что Service Worker зарегистрирован

## Продакшн деплой

### Heroku
```bash
heroku create your-app-name
git push heroku main
```

### Vercel
```bash
vercel --prod
```

### Docker
```bash
docker build -t flask-pwa .
docker run -d -p 80:5000 flask-pwa
```

---

🎉 **Приложение готово к использованию!**