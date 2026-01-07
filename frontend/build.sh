# Build script para frontend React
#!/bin/bash

echo "🚀 Iniciando build del frontend..."

# Instalar dependencias
yarn install --frozen-lockfile

# Build de producción
echo "📦 Creando build de producción..."
yarn build

echo "✅ Frontend build completado!"
echo "📁 Archivos listos en: ./build"
