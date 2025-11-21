# 1. Etapa de build
FROM node:18 AS build
WORKDIR /app

# Copiar dependencias del cliente
COPY client/package*.json ./
RUN npm install --legacy-peer-deps

# Copiar el cliente
COPY client/ .

# Construir versión de producción
RUN npm run build

# 2. Etapa final: servidor Nginx
FROM nginx:alpine

# Copiar el build de React dentro de Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copiar configuración de caching
COPY nginx.conf /etc/nginx/nginx.conf

# Exponer puerto
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
