#####################################
#### Настройка сборки приложения ####
#####################################
FROM node:12-alpine as builder

# Устанавливаем рабочую папку в контенере
WORKDIR /app

# Копируем все файлы в папку app
COPY . /app

# Запускаем загрузку пакетов npm и сборку проекта
RUN npm install
RUN npm run build:test

#####################################
#### Настройка NGINX ####
#####################################
FROM nginx:1.16.0-alpine

# Копируем данные из папки приложения в NGINX
COPY --from=builder /app/build /usr/share/nginx/html

# Открывае порт 80
EXPOSE 80

# Запускаем NGINX
CMD ["nginx", "-g", "daemon off;"]