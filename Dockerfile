#####################################
#### Настройка сборки приложения ####
#####################################
FROM node:12-alpine as builder

# Устанавливаем рабочую папку в контенере
WORKDIR /app

# Копируем файл package.json и устанавливаем пакеты npm
COPY package.json /app/package.json
RUN npm install

# Копируем остальные файлы в папку app
COPY . /app/

# Запускаем сборку проекта
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