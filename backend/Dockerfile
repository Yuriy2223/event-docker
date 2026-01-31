# # Stage 2: Build
# FROM node:20-alpine AS build

# WORKDIR /app

# COPY package*.json ./
# RUN npm ci

# COPY . .

# # Білдимо для production
# RUN npm run build

# # Stage 3: Production з Nginx
# FROM nginx:alpine AS production

# # Копіюємо збілджені файли
# COPY --from=build /app/dist /usr/share/nginx/html

# # Копіюємо nginx конфігурацію
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# # Відкриваємо порт
# EXPOSE 80

# # Запускаємо nginx
# CMD ["nginx", "-g", "daemon off;"]

# =============================================
# BACKEND DOCKERFILE (NestJS)
# Помістити у: backend/Dockerfile
# =============================================

# Stage 1: Development
FROM node:20-alpine AS development

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start:dev"]

# Stage 2: Build
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build
RUN npm prune --production

# Stage 3: Production
FROM node:20-alpine AS production

WORKDIR /app

COPY --from=build /app/package*.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

RUN addgroup -g 1001 -S nodejs && \
    adduser -S nestjs -u 1001

USER nestjs

EXPOSE 3000

CMD ["node", "dist/main.js"]
