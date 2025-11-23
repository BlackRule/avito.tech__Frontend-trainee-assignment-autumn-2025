# Система модерации объявлений

React-фронтенд и Express-бэкенд для модерации объявлений.

## Запуск через Docker
- Собрать и запустить оба сервиса (фронтенд через Nginx, бэкенд на Node):
  ```bash
  docker-compose up --build
  ```
  Используйте `--build`, чтобы подхватить изменения в коде, так как исходники не примонтированы как тома.
- Приложение: http://localhost:5174, API: http://localhost:3002.

### Горячая перезагрузка фронтенда (профиль dev)
Запустить dev-версию фронтенда, которая монтирует локальный код и держит Vite HMR включенным:
```bash
docker-compose up server client-hot
```
Сначала остановите обычный сервис `client`, чтобы избежать конфликта порта 5174.

## Ручная настройка
Бэкенд:
```bash
cd tech-int3-server
npm install
npm start   # http://localhost:3002
```

Фронтенд:
```bash
cd client
npm install
npm run dev -- --host 0.0.0.0 --port 5174 --strictPort
```

## Тестирование
После запуска тестов Playwright отчёт будет доступен по адресу http://localhost:9323.
