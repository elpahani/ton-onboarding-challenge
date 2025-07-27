# 🚀 Настройка GitHub репозитория

## Создание нового репозитория на GitHub

### 1. Создайте новый репозиторий на GitHub
1. Перейдите на [GitHub](https://github.com)
2. Нажмите кнопку "New repository" или "+" → "New repository"
3. Заполните форму:
   - **Repository name**: `flask-pwa-app`
   - **Description**: `Modern Progressive Web Application built with Flask and Python`
   - **Visibility**: Public или Private (по вашему выбору)
   - **Initialize with**: НЕ ставьте галочки (у нас уже есть файлы)
4. Нажмите "Create repository"

### 2. Добавьте удаленный репозиторий
```bash
# Замените YOUR_USERNAME на ваше имя пользователя GitHub
git remote add origin https://github.com/YOUR_USERNAME/flask-pwa-app.git

# Или если используете SSH
git remote add origin git@github.com:YOUR_USERNAME/flask-pwa-app.git
```

### 3. Отправьте код в репозиторий
```bash
git branch -M main
git push -u origin main
```

## Альтернативный способ через GitHub CLI

### 1. Установите GitHub CLI
```bash
# Ubuntu/Debian
sudo apt install gh

# macOS
brew install gh

# Windows
winget install GitHub.cli
```

### 2. Авторизуйтесь
```bash
gh auth login
```

### 3. Создайте репозиторий
```bash
gh repo create flask-pwa-app --public --description "Modern Progressive Web Application built with Flask and Python" --source=. --remote=origin --push
```

## Проверка настройки

### Проверьте удаленный репозиторий
```bash
git remote -v
```

### Проверьте статус
```bash
git status
```

## Настройка GitHub Pages (опционально)

### 1. Включите GitHub Pages
1. Перейдите в Settings → Pages
2. Source: Deploy from a branch
3. Branch: main
4. Folder: / (root)
5. Save

### 2. Добавьте GitHub Actions для автоматического деплоя
Создайте файл `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Python
      uses: actions/setup-python@v2
      with:
        python-version: '3.8'
    
    - name: Install dependencies
      run: |
        python -m pip install --upgrade pip
        pip install -r requirements.txt
    
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./
```

## Настройка GitHub Issues и Projects

### 1. Создайте шаблоны для Issues
Создайте файл `.github/ISSUE_TEMPLATE/bug_report.md`:

```markdown
---
name: Bug report
about: Create a report to help us improve
title: ''
labels: bug
assignees: ''

---

**Describe the bug**
A clear and concise description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected behavior**
A clear and concise description of what you expected to happen.

**Screenshots**
If applicable, add screenshots to help explain your problem.

**Environment:**
 - OS: [e.g. iOS]
 - Browser: [e.g. chrome, safari]
 - Version: [e.g. 22]

**Additional context**
Add any other context about the problem here.
```

### 2. Создайте шаблон для Pull Requests
Создайте файл `.github/pull_request_template.md`:

```markdown
## Описание изменений
Краткое описание того, что было изменено.

## Тип изменений
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## Как протестировать
Опишите, как можно протестировать ваши изменения.

## Скриншоты (если применимо)
Добавьте скриншоты, если изменения касаются UI.

## Чек-лист
- [ ] Код соответствует стилю проекта
- [ ] Добавлены тесты для новых функций
- [ ] Обновлена документация
- [ ] Все тесты проходят
```

## Настройка GitHub Actions для CI/CD

### Создайте файл `.github/workflows/ci.yml`:

```yaml
name: CI

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v2
    
    - name: Set up Python
      uses: actions/setup-python@v2
      with:
        python-version: '3.8'
    
    - name: Install dependencies
      run: |
        python -m pip install --upgrade pip
        pip install -r requirements.txt
        pip install pytest pytest-cov
    
    - name: Run tests
      run: |
        pytest --cov=app --cov-report=xml
    
    - name: Upload coverage to Codecov
      uses: codecov/codecov-action@v1
      with:
        file: ./coverage.xml
```

## Настройка защиты ветки main

### 1. Перейдите в Settings → Branches
### 2. Добавьте правило для ветки main:
- Require pull request reviews before merging
- Require status checks to pass before merging
- Require branches to be up to date before merging
- Include administrators

## Настройка GitHub Sponsors (опционально)

Если хотите получать поддержку от сообщества:

1. Перейдите в Settings → Sponsors
2. Следуйте инструкциям для настройки
3. Добавьте файл `.github/FUNDING.yml`:

```yaml
github: [YOUR_USERNAME]
patreon: YOUR_PATREON_USERNAME
open_collective: YOUR_OPENCOLLECTIVE_USERNAME
ko_fi: YOUR_KOFI_USERNAME
tidelift: YOUR_TIDELIFT_USERNAME
community_bridge: YOUR_COMMUNITYBRIDGE_USERNAME
liberapay: YOUR_LIBERAPAY_USERNAME
issuehunt: YOUR_ISSUEHUNT_USERNAME
otechie: YOUR_OTECHIE_USERNAME
custom: ["https://your-custom-link.com"]
```

---

🎉 **Ваш репозиторий готов к использованию!**