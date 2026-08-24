FROM node:20-alpine

WORKDIR /app

COPY backend/package.json backend/package-lock.json* backend/bun.lock* ./
RUN npm ci

COPY backend/ .

ENV PORT=4000
EXPOSE 4000

CMD ["npx", "tsx", "src/index.ts"]
