FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json* bun.lock* ./
RUN npm ci

COPY . .

ENV PORT=4000
EXPOSE 4000

CMD ["npx", "tsx", "src/index.ts"]
