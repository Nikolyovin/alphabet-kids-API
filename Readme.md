# Настройка окружения

### 1. инициализируем нашу папку как проект

`yarn init --yes`

### 2. устанавливаем express и смотрим доку 'express getting started'

`yarn add express @types/express`

### 3. устанавливаем nodemon в dev dependencies для того чтобы программа при изменении перезагружалась и изменения вступали в силу.

`yarn add nodemon -D`

### 4. устанавливаем ts и типы для других зависимостей в Dev dependencies

`yarn add typescript ts-node @types/node -D`

### 5. создаем tsconfig.json и изменяем место где будет компилироваться в js

`yarn tsc --init`

`"outDir": "./dist",`

### 6. можем компилировать всю программу. и желательно создать папку src

`yarn tsc`

### 7. по итогу мы будем запускать две команды, которые мы добавим в скрипты

#### первая это компиляция ts в js.чтобы постоянно не компилировать запускаем в режиме вотчера с флагом -w

#### вторая это следить за изменениями папки dist

`"scripts": {
    "watch": "tsc -w",
    "dev": "nodemon --inspect .\\dist\\index.js"
  },`
