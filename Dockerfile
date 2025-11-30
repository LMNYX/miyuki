FROM node:24-slim

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

WORKDIR /app

COPY package*.json .

RUN pnpm install

COPY . .

EXPOSE 3000

RUN pnpm run build

CMD ["node", ".output/server/index.mjs"]