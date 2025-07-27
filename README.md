# 🚀 Flask PWA Application

Современное Progressive Web Application (PWA), построенное на Flask и Python.

## ✨ Особенности

- **Progressive Web App** - установка на устройство
- **Адаптивный дизайн** - работает на всех устройствах
- **Темная/светлая тема** - переключение между темами
- **Офлайн поддержка** - Service Worker для кэширования
- **Push уведомления** - поддержка уведомлений
- **Современный UI** - красивый и интуитивный интерфейс
- **API endpoints** - RESTful API для взаимодействия

## 🛠 Технологии

- **Backend**: Python 3.8+, Flask 2.3.3
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **PWA**: Service Worker, Web App Manifest
- **Стили**: CSS Grid, Flexbox, CSS Variables
- **Шрифты**: Inter (Google Fonts)

## 📦 Установка

1. **Клонируйте репозиторий:**
```bash
git clone <your-repo-url>
cd flask-pwa-app
```

2. **Создайте виртуальное окружение:**
```bash
python -m venv venv
source venv/bin/activate  # Linux/Mac
# или
venv\Scripts\activate     # Windows
```

3. **Установите зависимости:**
```bash
pip install -r requirements.txt
```

4. **Создайте файл .env:**
```bash
cp .env.example .env
# Отредактируйте .env файл при необходимости
```

## 🚀 Запуск

### Режим разработки
```bash
export FLASK_ENV=development
python app.py
```

### Продакшн режим
```bash
export FLASK_ENV=production
python app.py
```

Приложение будет доступно по адресу: http://localhost:5000

## 📱 PWA Функции

### Установка на устройство
- Откройте приложение в браузере
- Нажмите кнопку "Установить" в адресной строке
- Или используйте кнопку "Установить" в приложении

### Офлайн режим
- Приложение работает без интернета
- Данные кэшируются автоматически
- Service Worker обеспечивает офлайн функциональность

### Push уведомления
- Поддержка push уведомлений
- Настраиваемые действия в уведомлениях

## 🏗 Структура проекта

```
flask-pwa-app/
├── app.py                 # Основной Flask сервер
├── requirements.txt       # Python зависимости
├── .env.example          # Пример переменных окружения
├── README.md             # Документация
├── templates/
│   └── index.html        # Главная страница
├── static/
│   ├── css/
│   │   └── style.css     # Стили приложения
│   ├── js/
│   │   ├── app.js        # Основная логика
│   │   └── sw-register.js # Регистрация Service Worker
│   ├── icons/            # Иконки PWA
│   └── sw.js             # Service Worker
└── .gitignore            # Git ignore файл
```

## 🔧 API Endpoints

### GET /api/health
Проверка состояния сервера
```json
{
  "status": "healthy",
  "message": "Flask PWA server is running"
}
```

### GET /api/data
Получение данных
```json
{
  "data": "Hello from Flask PWA!",
  "timestamp": "2024-01-01T00:00:00Z"
}
```

### GET /manifest.json
Web App Manifest для PWA

### GET /sw.js
Service Worker файл

## 🎨 Кастомизация

### Изменение темы
Отредактируйте CSS переменные в `static/css/style.css`:

```css
:root {
    --primary-color: #3b82f6;
    --background-color: #ffffff;
    /* ... другие переменные */
}
```

### Добавление новых API endpoints
Добавьте новые маршруты в `app.py`:

```python
@app.route('/api/new-endpoint')
def new_endpoint():
    return jsonify({"message": "New endpoint"})
```

## 📝 Переменные окружения

Создайте файл `.env` со следующими переменными:

```env
FLASK_ENV=development
SECRET_KEY=your-secret-key
PORT=5000
```

## 🚀 Деплой

### Heroku
```bash
heroku create your-app-name
git push heroku main
```

### Docker
```bash
docker build -t flask-pwa .
docker run -p 5000:5000 flask-pwa
```

## 🤝 Вклад в проект

1. Форкните репозиторий
2. Создайте ветку для новой функции
3. Внесите изменения
4. Создайте Pull Request

## 📄 Лицензия

MIT License - см. файл LICENSE для деталей.

## 🆘 Поддержка

Если у вас есть вопросы или проблемы:
- Создайте Issue в GitHub
- Обратитесь к документации Flask
- Проверьте консоль браузера для ошибок

---

Создано с ❤️ на Python и Flask
