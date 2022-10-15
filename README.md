# Auth http-server
Пример реализации http-сервера для авторизации/регистрации пользователей на NodeJS + MongoDB.

## Используемые пакеты:
- express
- mongoose
- bcryptjs
- jsonwebtoken
- typescript

## Запуск дев-сервера:
Для работы приложения необходим доступ к базе данных [MongoDB](https://www.mongodb.com/)

Далее необходимо переименовать файл с переменными окружения `.env.sample` в `.env`, и обязательно указать в нем адрес для доступа к вашей MongoDB - *DB_HOST*.

```
yarn dev
```

