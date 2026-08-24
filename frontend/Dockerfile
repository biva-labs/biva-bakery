# ---- Build stage ----
FROM node:20-alpine AS build
WORKDIR /app
COPY frontend/package.json frontend/package-lock.json* frontend/bun.lock* ./
RUN npm ci
COPY frontend/ .
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL
RUN npm run build

# ---- Serve stage ----
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY frontend/nginx.conf.template /etc/nginx/templates/default.conf.template
ENV PORT=80
EXPOSE 80
