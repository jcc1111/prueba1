# 📚 Documentación Técnica Completa - TuArica

## 🎯 Visión General del Proyecto

**TuArica** es una plataforma digital diseñada para conectar comercios locales con la comunidad de Arica, Chile. La aplicación funciona como un directorio geolocalizado que permite a los usuarios descubrir comercios, productos y servicios en su área local.

### Objetivos del Negocio
- Digitalizar el comercio local de Arica
- Facilitar el descubrimiento de comercios y servicios
- Proporcionar una plataforma de marketing para pequeños comerciantes
- Fomentar el comercio local y la economía regional

---

## 🏛️ Arquitectura del Sistema

### Patrón Arquitectónico
- **Arquitectura en Capas** con separación clara de responsabilidades
- **Monorepo** para facilitar el desarrollo y mantenimiento
- **API REST** para comunicación frontend-backend
- **Server-Side Rendering** para optimización SEO

### Componentes Principales

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │    Backend      │    │   Database      │
│   (Next.js)     │◄──►│   (NestJS)      │◄──►│  (PostgreSQL)   │
│                 │    │                 │    │                 │
│ - UI/UX         │    │ - API REST      │    │ - Prisma ORM    │
│ - SSR/CSR       │    │ - Business      │    │ - Migrations    │
│ - Routing       │    │   Logic         │    │ - Seeds         │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

---

## 🗄️ Diseño de Base de Datos

### Modelo Entidad-Relación

```
categoria (1) ──────── (N) subcategoria
    │                       │
    │                       │
    │                  (1)  │  (N)
    │                   comercio ──────── (N) producto
    │                       │
    │                       │
    │                  (N)  │  (N)
    │                   resena
    │                       │
    │                  (1)  │
    │                   usuario ──────── (N) favorito
```

### Tablas Principales

#### `categoria`
```sql
- id_categoria (PK, SERIAL)
- cod_categoria (UNIQUE, CHAR(2))
- nombre (TEXT)
- slug_categoria (UNIQUE, TEXT)
- f_creacion (TIMESTAMP)
- f_actualizacion (TIMESTAMP)
```

#### `comercio`
```sql
- id_comercio (PK, SERIAL)
- id_subcategoria (FK)
- id_usuario (FK)
- cod_comercio (UNIQUE, CHAR(6))
- nombre (TEXT)
- slug_comercio (UNIQUE, TEXT)
- descripcion (TEXT)
- ubicacion_geografica (TEXT) -- Temporal, será GEOMETRY
- direccion (TEXT)
- telefono (TEXT)
- web (TEXT)
- f_creacion (TIMESTAMP)
- f_actualizacion (TIMESTAMP)
```

### Convenciones de Naming
- **Tablas**: snake_case en singular
- **Columnas**: snake_case
- **PKs**: id_[tabla]
- **FKs**: id_[tabla_referenciada]
- **Códigos**: cod_[entidad]
- **Slugs**: slug_[entidad]
- **Timestamps**: f_creacion, f_actualizacion

---

## 🔧 Configuración del Entorno

### Variables de Entorno

#### `.env` (Root)
```env
# Database Connection
DATABASE_URL="prisma+postgres://accelerate.prisma-data.net/?api_key=..."

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5000
PORT=5000

# Development
NODE_ENV=development
```

#### `.env.example` (Template)
```env
# Database
DATABASE_URL="your_database_url_here"

# API
NEXT_PUBLIC_API_URL=http://localhost:5000
PORT=5000

# Optional: Local PostgreSQL
# DATABASE_URL="postgresql://user:password@localhost:5432/tuarica"
```

### Configuraciones Específicas

#### Prisma (`packages/db/schema.prisma`)
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

#### Next.js (`apps/web/next.config.ts`)
```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configuración optimizada para Turbopack
  experimental: {
    turbo: {
      // Configuraciones específicas
    }
  }
};

export default nextConfig;
```

---

## 🛠️ Implementación Técnica

### Frontend Architecture

#### Estructura de Rutas
```
app/
├── page.tsx                    # / (Página principal)
├── layout.tsx                  # Layout global
├── loading.tsx                 # Loading UI global
├── error.tsx                   # Error UI global
├── categoria/
│   └── [slug]/
│       └── page.tsx           # /categoria/[slug]
├── comercio/
│   └── [slug]/
│       └── page.tsx           # /comercio/[slug]
└── globals.css                # Estilos globales
```

#### Data Fetching Strategy
```typescript
// Server-side data fetching
async function getCategorias() {
  const response = await fetch(`${API_URL}/categorias`, {
    cache: 'no-store' // Datos frescos
  });
  return response.json();
}

// Uso en Server Component
export default async function HomePage() {
  const categorias = await getCategorias();
  return <CategoriasList categorias={categorias} />;
}
```

### Backend Architecture

#### Estructura Modular
```
src/
├── main.ts                     # Bootstrap application
├── app.module.ts               # Root module
├── app.controller.ts           # Root controller
├── categoria.controller.ts     # Categoria endpoints
└── [future modules]/
    ├── comercio/
    ├── usuario/
    └── producto/
```

#### Controller Pattern
```typescript
@Controller('categorias')
export class CategoriaController {
  constructor(private readonly prisma: PrismaClient) {}

  @Get()
  async findAll() {
    return await this.prisma.categoria.findMany({
      include: { subcategorias: true }
    });
  }
}
```

### Database Implementation

#### Prisma Schema Design
```prisma
model comercio {
  id_comercio         Int      @id @default(autoincrement())
  slug_comercio       String   @unique
  
  // Relaciones
  subcategoria        subcategoria @relation(fields: [id_subcategoria], references: [id_subcategoria])
  productos           producto[]
  
  // Mapping
  @@map("comercio")
}
```

#### Migration Strategy
```bash
# Desarrollo
npx prisma db push          # Aplicar cambios directos

# Producción
npx prisma migrate deploy   # Aplicar migraciones
```

---

## 🔒 Seguridad y Validación

### Prisma Type Safety
```typescript
// Tipos automáticos generados
import { PrismaClient, Categoria, Comercio } from '@prisma/client';

// Type-safe queries
const comercio: Comercio = await prisma.comercio.findUnique({
  where: { slug_comercio: 'restaurante-el-sabor' }
});
```

### Input Validation (Future)
```typescript
// Usar class-validator en NestJS
export class CreateComercioDto {
  @IsString()
  @MinLength(3)
  nombre: string;

  @IsEmail()
  email: string;
}
```

---

## 🚀 Performance y Optimización

### Frontend Optimizations

#### Image Optimization
```typescript
import Image from 'next/image';

<Image
  src="/logo.svg"
  alt="TuArica logo"
  width={60}
  height={60}
  priority={true}        // Para images above fold
/>
```

#### Code Splitting
```typescript
// Lazy loading automático por rutas
// Dynamic imports para componentes pesados
const HeavyComponent = dynamic(() => import('./HeavyComponent'));
```

### Backend Optimizations

#### Prisma Query Optimization
```typescript
// Incluir relaciones necesarias
const comercios = await prisma.comercio.findMany({
  include: {
    subcategoria: {
      include: {
        categoria: true
      }
    },
    productos: true
  }
});

// Paginación
const comercios = await prisma.comercio.findMany({
  skip: (page - 1) * limit,
  take: limit
});
```

### Database Optimizations
```sql
-- Índices para búsquedas frecuentes
CREATE INDEX idx_comercio_slug ON comercio(slug_comercio);
CREATE INDEX idx_categoria_slug ON categoria(slug_categoria);
```

---

## 🧪 Testing Strategy

### Unit Testing (Future Implementation)
```typescript
// Frontend - Jest + Testing Library
import { render, screen } from '@testing-library/react';
import HomePage from './page';

test('renders categories', async () => {
  render(<HomePage />);
  expect(screen.getByText('Restaurantes')).toBeInTheDocument();
});

// Backend - Jest + Supertest
describe('CategoriaController', () => {
  it('should return categories', async () => {
    const response = await request(app)
      .get('/categorias')
      .expect(200);
    
    expect(response.body).toHaveLength(2);
  });
});
```

### Integration Testing
```typescript
// Database integration tests
describe('Categoria Model', () => {
  beforeAll(async () => {
    await prisma.categoria.deleteMany();
  });

  it('should create categoria with subcategorias', async () => {
    const categoria = await prisma.categoria.create({
      data: {
        cod_categoria: '01',
        nombre: 'Test',
        slug_categoria: 'test'
      }
    });
    
    expect(categoria.id_categoria).toBeDefined();
  });
});
```

---

## 🔄 DevOps y Deployment

### Local Development Workflow
```bash
# 1. Start all services
pnpm dev

# 2. Database changes
cd packages/db
npx prisma db push
npx prisma generate

# 3. Seed data
cd ../..
npx tsx packages/db/seed.ts

# 4. Open tools
# http://localhost:3001  (Frontend)
# http://localhost:5000  (API)
# npx prisma studio      (DB Admin)
```

### Production Deployment Strategy

#### Frontend (Vercel)
```bash
# vercel.json
{
  "builds": [
    {
      "src": "apps/web/package.json",
      "use": "@vercel/next"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "apps/web/$1"
    }
  ]
}
```

#### Backend (Railway/Heroku)
```javascript
// package.json scripts for production
{
  "scripts": {
    "start": "node dist/main.js",
    "build": "npm run build",
    "start:prod": "node dist/main.js"
  }
}
```

---

## 📊 Monitoring y Analytics

### Performance Monitoring
```typescript
// Web Vitals tracking
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

function sendToAnalytics(metric) {
  // Send to analytics service
  analytics.track(metric.name, metric.value);
}

getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getFCP(sendToAnalytics);
getLCP(sendToAnalytics);
getTTFB(sendToAnalytics);
```

### Database Monitoring
```typescript
// Prisma query logging
const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});
```

---

## 🔮 Roadmap Técnico

### Fase 1 (Actual) ✅
- ✅ Setup básico del monorepo
- ✅ Frontend con Next.js
- ✅ Backend con NestJS
- ✅ Base de datos con Prisma
- ✅ Páginas principales funcionales

### Fase 2 (Próxima) 🚧
- 🔄 Autenticación de usuarios
- 🔄 CRUD completo de comercios
- 🔄 Sistema de búsqueda
- 🔄 Geolocalización con PostGIS

### Fase 3 (Futuro) 📋
- 📋 Sistema de reseñas
- 📋 Favoritos de usuarios
- 📋 Notificaciones
- 📋 Analytics avanzado

### Fase 4 (Largo plazo) 🌟
- 🌟 Mobile app (React Native)
- 🌟 PWA features
- 🌟 AI-powered recommendations
- 🌟 Microservices architecture

---

## 🐛 Debugging y Troubleshooting

### Common Issues y Solutions

#### "Cannot find module '@prisma/client'"
```bash
# Solution
cd packages/db
npx prisma generate
```

#### "Port already in use"
```bash
# Windows
netstat -ano | findstr :3000
taskkill /f /pid <PID>

# Linux/Mac
lsof -ti:3000 | xargs kill -9
```

#### "Database connection failed"
```bash
# Check environment variables
echo $DATABASE_URL

# Test connection
npx prisma db push --preview-feature
```

### Debugging Tools
- **Prisma Studio**: Visual database browser
- **Next.js DevTools**: React debugging
- **Network Tab**: API request inspection
- **Prisma Logs**: Database query debugging

---

## 📝 Convenciones de Código

### Naming Conventions
```typescript
// Files: kebab-case
categoria-list.component.tsx
comercio-detail.page.tsx

// Components: PascalCase
export function CategoriaCard() {}

// Variables: camelCase
const comerciosList = [];

// Constants: SCREAMING_SNAKE_CASE
const API_BASE_URL = 'http://localhost:5000';

// Database: snake_case
cod_categoria, slug_comercio, f_creacion
```

### Code Organization
```typescript
// Import order
// 1. External libraries
import React from 'react';
import { NextPage } from 'next';

// 2. Internal utilities
import { prisma } from '@/lib/prisma';

// 3. Components
import { Header } from '@/components/Header';

// 4. Types
import type { Categoria } from '@prisma/client';
```

---

## 🔧 Maintenance y Updates

### Dependency Updates
```bash
# Check outdated packages
pnpm outdated

# Update all dependencies
pnpm update

# Update specific package
pnpm add package@latest
```

### Database Maintenance
```bash
# Backup (production)
pg_dump $DATABASE_URL > backup.sql

# Restore
psql $DATABASE_URL < backup.sql

# Reset development DB
npx prisma migrate reset --force
```

---

Esta documentación técnica proporciona una guía completa para entender, desarrollar y mantener el proyecto TuArica. Se actualizará conforme el proyecto evolucione y se implementen nuevas funcionalidades. 🚀
