# Event Registration - Docker Setup

## Структура проєкту

```
event-registration/
├── backend/                    # NestJS Backend
│   ├── src/
│   ├── test/
│   ├── Dockerfile
│   ├── .dockerignore
│   └── package.json
│
├── frontend/                   # React + Vite Frontend
│   ├── src/
│   ├── public/
│   ├── Dockerfile
│   ├── nginx.conf             # Для production
│   ├── .dockerignore
│   └── package.json
│
├── docker-compose.yml          # Головна конфігурація
├── .env                        # Змінні середовища
├── .env.example               # Приклад
├── .env.production            # Production змінні
├── .gitignore
├── Makefile                   # Команди для зручності
└── README.md
```

### Доступ

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000
- **Swagger Docs**: http://localhost:3000/api

---

## Режими роботи

### Development

```bash
# Запуск з hot reload
make dev

# У фоновому режимі
make dev-d

# Перегляд логів
make logs
```

**Особливості development:**

- Hot reload для backend і frontend
- Source maps увімкнені
- Детальні логи
- Vite dev server на порту 5173

### Production

```bash
# Запуск production
make prod-build

# У фоновому режимі
make prod-d
```

**Особливості production:**

- Оптимізовані білди
- Nginx для фронтенду
- Мінімальні Docker образи
- Gzip compression
- Security headers

---

## Всі команди (Makefile)

```bash
make help              # Показати всі команди

# Development
make dev               # Запуск development
make dev-build         # Білд + запуск development
make dev-d             # Запуск у фоні

# Production
make prod              # Запуск production
make prod-build        # Білд + запуск production
make prod-d            # Запуск у фоні

# Управління
make build             # Тільки білд
make up                # Запуск
make down              # Зупинка
make restart           # Перезапуск

# Логи
make logs              # Всі логи
make logs-backend      # Тільки backend
make logs-frontend     # Тільки frontend

# Shell доступ
make shell-backend     # Увійти в backend контейнер
make shell-frontend    # Увійти в frontend контейнер

# Очищення
make clean             # Видалити контейнери
make clean-all         # Повне очищення
make prune             # Очистити Docker

# Інше
make ps                # Статус контейнерів
make setup             # Створити .env
```

## Docker архітектура

### Multi-stage builds

**Backend:**

1. `development` - для розробки з hot reload
2. `build` - білд TypeScript коду
3. `production` - мінімальний образ для production

**Frontend:**

1. `development` - Vite dev server
2. `build` - білд React додатку
3. `production` - Nginx з оптимізованими статичними файлами

### Volumes

```yaml
# Backend volumes (development)
- ./backend/src:/app/src # Hot reload коду
- ./backend/test:/app/test # Hot reload тестів
- /app/node_modules # Ізольовані node_modules

# Frontend volumes (development)
- ./frontend/src:/app/src # Hot reload коду
- ./frontend/public:/app/public # Статичні файли
- /app/node_modules # Ізольовані node_modules
```

## Production Deployment

### 1. Підготовка

```bash
# Створити .env.production
cp .env.production .env.production.local
nano .env.production.local
```

### 2. Білд

```bash
# Локально
make prod-build

# На сервері
docker-compose --env-file .env.production up --build -d
```

### 3. З CI/CD

Приклад GitHub Actions:

```yaml
- name: Build and deploy
  run: |
    docker-compose --env-file .env.production build
    docker-compose --env-file .env.production up -d
```

---

## Моніторинг

### Health Checks

Backend автоматично перевіряється через:

```yaml
healthcheck:
  test: ['CMD', 'wget', '--tries=1', 'http://localhost:3000/api']
  interval: 30s
  timeout: 10s
  retries: 3
```

### Логи

```bash
# Всі логи
make logs

# Тільки помилки
docker-compose logs --tail=100 | grep ERROR

# Live моніторинг
make logs-backend
```

### Ресурси

```bash
# Використання ресурсів
docker stats

# Статус
make ps
```

---

## Безпека

- Non-root користувачі в production контейнерах
- `.env` файли не комітяться (в `.gitignore`)
- Multi-stage builds з мінімальними образами
- Security headers в Nginx
- Healthchecks для надійності

---

## Розробка

### Додавання нових залежностей

```bash
# Backend
make shell-backend
npm install package-name

# Frontend
make shell-frontend
npm install package-name
```

### Запуск тестів

```bash
# Backend тести
make shell-backend
npm run test

# E2E тести
make shell-backend
npm run test:e2e
```
