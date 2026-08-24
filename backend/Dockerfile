FROM oven/bun:1-alpine

WORKDIR /app

COPY package.json bun.lock ./
RUN bun install

COPY . .

ENV PORT=4000
EXPOSE 4000

CMD ["bun", "src/index.ts"]
