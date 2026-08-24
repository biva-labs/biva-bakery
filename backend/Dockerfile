FROM oven/bun:1-alpine

WORKDIR /app

COPY backend/package.json backend/bun.lock ./
RUN bun install

COPY backend/ .

ENV PORT=4000
EXPOSE 4000

CMD ["bun", "src/index.ts"]
