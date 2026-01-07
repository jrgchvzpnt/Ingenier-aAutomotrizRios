# Build script para Render.com
#!/bin/bash

echo "🚀 Iniciando build del backend..."

# Instalar dependencias
pip install --upgrade pip
pip install -r requirements.txt

echo "✅ Backend build completado!"
