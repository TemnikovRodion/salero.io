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

#####################################
#### Настройка NGINX ####
#####################################
FROM nginx:1.16.0-alpine

# Копируем данные из папки приложения в NGINX
COPY --from=builder /test/build /usr/share/nginx/html

# Открываем порт
EXPOSE 80
EXPOSE 90

# Запускаем NGINX
CMD ["nginx", "-g", "daemon off;"]