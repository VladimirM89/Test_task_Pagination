# Тестовое задание

В БД имеется информация о 5000 покупателей. Разработчик добавил страницу со списком всех покупателей. Необходимо доделать этот список, добавив пагинацию - по 20 записей на страницу с разбивкой по 10 страниц.

![Результат](./result.png)

##

## Запуск проекта

Для соединения с Postgresql используется переменная окружения `APP_PG_URL`
(например: `postgresql://postgres:123456@localhost:5432/test_pagination?sslmode=disable`).

Для загрузки данных в БД используйте файл `test_pagination_localhost-dump.sql` (например: `psql -h localhost -U postgres -d test_pagination -f test_pagination_localhost-dump.sql`).

# Инструкция по запуску сервисов проекта

## Установка зависимостей

## Installation

1. Склонируйте репозиторий: `git clone https://github.com/VladimirM89/Test_task_Pagination.git`
2. Перейдите в папку **Test_task_Pagination**: `cd Test_task_Pagination`
3. Переключитель на ветку **main** - `git checkout main`
4. Перейдите в папку **srv** с помощью команды `cd srv`
5. Введите команду `npm install` и дождитесь окончания установки всех зависимостей
6. Выйдите из папки **srv** с помощью `cd ..`
7. Перейдите в папку **web** с помощью команды `cd web`
8. Введите команду `npm install` и дождитесь окончания установки всех зависимостей

## Запуск сервисов

!!! Проверьте, что Вы находитесь в корневой папке проекта (на одном уровне с данных файлом README.md)

**Для запуска сервера NEST**

1. `cd srv`
2. Переименовать **.env.example** в **.env**
3. `npm run start:dev` (development mode) или `npm run start` (prodaction mode)

- Сервер запустится по адресу `http://localhost:3000`
- Проверить работу сервера можно с помощью Postman, введя адрес `http://localhost:3000/users` и выбрав метод `GET`.

**Для запуска сервера WEB приложения**

1. Откройте второй терминал, перейдите в папку `cd web`
2. `npm run dev` (development mode) или `npm run start` (prodaction mode - может занять несколько секунд)

- Приложение запустится на 3001 порту `http://localhost:3001`

---
