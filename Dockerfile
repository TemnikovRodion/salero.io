#####################################
#### Настройка сборки приложения ####
#####################################
FROM node:12-alpine as builder

# Устанавливаем рабочую папку в контенере
WORKDIR /app

# Копируем все файлы в папку app
COPY . /app

# Запускаем загрузку пакетов npm и сборку проекта
ENV env="test";
RUN npm install
RUN npm run build:$env

#####################################
#### Настройка NGINX ####
#####################################
FROM nginx:1.16.0-alpine

# Копируем данные из папки приложения в NGINX
COPY --from=builder /app/build /usr/share/nginx/html

# Открываем порт
ENV port="80";
EXPOSE $port

# Запускаем NGINX
CMD ["nginx", "-g", "daemon off;"]