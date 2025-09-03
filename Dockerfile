// Dockerfile raíz para desarrollo multi-app
FROM node:22-alpine
WORKDIR /repo
COPY . .
RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm install
CMD ["pnpm", "dev"]
