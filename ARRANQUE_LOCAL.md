# Script de arranque para desarrollo local

# 1. Levanta la base de datos (requiere Docker Desktop)
docker compose up -d db

# 2. Ejecuta migraciones Prisma y genera cliente
pnpm exec prisma migrate dev --schema=packages/db/schema.prisma --name init
pnpm exec prisma generate --schema=packages/db/schema.prisma

# 3. Inicia el backend NestJS (API)
pnpm --filter api dev

# 4. Inicia el frontend Next.js (landing)
pnpm --filter web dev

# 5. Accede a:
#   - http://localhost:3000 (landing)
#   - http://localhost:3001/categorias (API categorías)
