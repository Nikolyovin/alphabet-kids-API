# Настройка окружения

### 1. инициализируем нашу папку как проект

`yarn init --yes`

### 2. чтобы использовать import добавляем в package.json

`"type": "module",`

### 3. устанавливаем express и смотрим доку 'express getting started'

`yarn add express @types/express`

### 4. устанавливаем nodemon в dev dependencies для того чтобы программа при изменении перезагружалась и изменения вступали в силу.

`yarn add nodemon -D`

### 5. устанавливаем ts и типы для других зависимостей в Dev dependencies

`yarn add typescript ts-node @types/node -D`
