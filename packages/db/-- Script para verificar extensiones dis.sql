-- Script para verificar extensiones disponibles y habilitar PostGIS
-- Verificar qué extensiones están instaladas
SELECT * FROM pg_extension;

-- Verificar qué extensiones están disponibles
SELECT * FROM pg_available_extensions WHERE name LIKE '%postgis%';

-- Intentar habilitar PostGIS (si está disponible)
-- CREATE EXTENSION IF NOT EXISTS postgis;