# 🚀 TuArica - Guía para Desarrolladores

## 📋 Resumen del Proyecto

**TuArica** es un directorio geolocalizado de comercios y servicios en Arica desarrollado con una arquitectura moderna de monorepo. El proyecto permite a los usuarios encontrar comercios locales, ver productos/servicios y obtener información de contacto.

## 🏗️ Arquitectura del Proyecto

```
TuArica/
├── apps/
│   ├── web/          # Frontend (Next.js 15)
│   └── api/          # Backend (NestJS)
├── packages/
│   └── db/           # Base de datos (Prisma + PostgreSQL)
└── configuración raíz
```

## 🚀 Inicio Rápido

### Prerrequisitos

- **Node.js** 18+ 
- **pnpm** (gestor de paquetes)
- **Git**
- **Conexión a internet** (para base de datos remota)

### Instalación

1. **Clonar el repositorio:**
```bash
git clone <url-del-repositorio>
cd TuArica
```

2. **Instalar dependencias:**
```bash
pnpm install
```

3. **Configurar variables de entorno:**
```bash
# Copiar el archivo de ejemplo
cp .env.example .env

# Editar .env con tus configuraciones
```

4. **Ejecutar migraciones de base de datos:**
```bash
cd packages/db
npx prisma db push
npx prisma generate
```

5. **Insertar datos de prueba:**
```bash
cd ../..
npx tsx packages/db/seed.ts
```

6. **Iniciar el servidor de desarrollo:**
```bash
pnpm dev
```

### URLs de Desarrollo

- **Frontend**: http://localhost:3001
- **Backend API**: http://localhost:5000
- **Prisma Studio**: http://localhost:5555 (ejecutar `npx prisma studio` desde `packages/db/`)

## 🔧 Comandos Principales

### Desarrollo
```bash
# Iniciar todo el stack de desarrollo
pnpm dev

# Solo frontend
pnpm --filter web dev

# Solo backend
pnpm --filter api dev

# Prisma Studio (desde packages/db/)
npx prisma studio
```

### Base de datos
```bash
# Aplicar cambios del schema
npx prisma db push

# Generar cliente de Prisma
npx prisma generate

# Ejecutar seed
npx tsx packages/db/seed.ts

# Resetear base de datos
npx prisma migrate reset --force
```

### Build y Deploy
```bash
# Build completo
pnpm build

# Lint
pnpm lint

# Tests
pnpm test
```

## 📁 Estructura de Directorios

### Frontend (`apps/web/`)
```
src/
├── app/
│   ├── page.tsx                 # Página principal
│   ├── layout.tsx              # Layout principal
│   ├── categoria/[slug]/       # Páginas de categorías
│   └── comercio/[slug]/        # Páginas de comercios
└── components/                 # Componentes reutilizables (pendiente)
```

### Backend (`apps/api/`)
```
src/
├── main.ts                     # Punto de entrada
├── app.module.ts               # Módulo principal
├── app.controller.ts           # Controlador principal
└── categoria.controller.ts     # Controlador de categorías
```

### Base de datos (`packages/db/`)
```
├── schema.prisma               # Schema de base de datos
├── seed.ts                     # Datos de prueba
└── migrations/                 # Migraciones (auto-generadas)
```

## 🔐 Variables de Entorno

### Archivo `.env`
```env
# Base de datos (Prisma Cloud)
DATABASE_URL="prisma+postgres://..."

# Backend
NEXT_PUBLIC_API_URL=http://localhost:5000
PORT=5000
```

## 🗄️ Esquema de Base de Datos

### Modelos Principales

- **categoria**: Categorías principales (Restaurantes, Servicios, etc.)
- **subcategoria**: Subcategorías específicas (Comida Rápida, Gourmet, etc.)
- **usuario**: Usuarios del sistema (comerciantes)
- **comercio**: Comercios registrados
- **producto**: Productos/servicios de cada comercio
- **resena**: Reseñas de usuarios
- **favorito**: Comercios/productos favoritos

### Relaciones
- Categoría → Subcategorías (1:N)
- Usuario → Comercios (1:N)
- Comercio → Productos (1:N)
- Comercio → Reseñas (1:N)

## 🌐 API Endpoints

### Actuales
- `GET /` - Información de la API
- `GET /categorias` - Lista de categorías

### Próximos (por implementar)
- `GET /categorias/:id/comercios` - Comercios por categoría
- `GET /comercios/:slug` - Detalle de comercio
- `GET /comercios/:id/productos` - Productos de un comercio
- `POST /comercios` - Crear comercio
- `POST /resenas` - Crear reseña

## 🧪 Testing

### Datos de Prueba
El proyecto incluye datos de prueba que se pueden insertar con:
```bash
npx tsx packages/db/seed.ts
```

**Datos incluidos:**
- 2 categorías (Restaurantes, Servicios)
- 2 subcategorías (Comida Rápida, Comida Gourmet)
- 1 usuario comerciante
- 1 comercio (Restaurante El Sabor)
- 2 productos (Hamburguesa Clásica, Papas Fritas)

## 🚨 Problemas Comunes

### Error de conexión a base de datos
```bash
# Verificar que las variables de entorno estén configuradas
cat .env

# Regenerar cliente de Prisma
npx prisma generate
```

### Conflicto de puertos
```bash
# Verificar puertos en uso
netstat -ano | findstr :3000
netstat -ano | findstr :5000

# Matar procesos si es necesario
taskkill /f /pid <PID>
```

### Error de TypeScript
```bash
# Instalar tipos de Node.js
pnpm add -D @types/node -w
```

## 🔄 Flujo de Desarrollo

1. **Crear rama feature:**
```bash
git checkout -b feature/nueva-funcionalidad
```

2. **Desarrollar y probar:**
```bash
pnpm dev
# Hacer cambios...
pnpm lint
pnpm test
```

3. **Actualizar base de datos (si es necesario):**
```bash
# Editar packages/db/schema.prisma
npx prisma db push
npx prisma generate
```

4. **Commit y push:**
```bash
git add .
git commit -m "feat: nueva funcionalidad"
git push origin feature/nueva-funcionalidad
```

## 🤝 Contribución

1. Fork del repositorio
2. Crear rama feature
3. Implementar cambios con tests
4. Crear Pull Request
5. Esperar review y merge

## 📞 Soporte

Para dudas técnicas o problemas:
- Revisar esta documentación
- Verificar logs en consola
- Consultar documentación de las tecnologías usadas
- Crear issue en el repositorio

---

## 🔧 Herramientas de Desarrollo

### VS Code
- Extensiones recomendadas: Prisma, TypeScript, Tailwind CSS
- Configuración incluida en `.vscode/`

### Prisma Studio
Interfaz visual para gestionar la base de datos:
```bash
cd packages/db
npx prisma studio
```

### DevTools
- React DevTools (para frontend)
- Network tab (para debugging de API)
- Prisma logs (para debugging de DB)

¡Happy coding! 🚀
