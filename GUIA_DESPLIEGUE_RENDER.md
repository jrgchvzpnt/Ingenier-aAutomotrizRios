# 🚀 Guía Completa de Despliegue en Render.com
## Ingeniería Automotriz Ríos

---

## 📋 Requisitos Previos

- ✅ Cuenta de GitHub (ya la tienes)
- ✅ Repositorio con tu código (lo crearás en paso 1)
- ✅ Cuenta de Render.com (la crearás en paso 2)

**Tiempo estimado:** 15-20 minutos  
**Costo:** 100% GRATIS

---

## 🎯 Paso 1: Subir tu Código a GitHub

### 1.1 Crear Repositorio en GitHub

1. Ve a https://github.com
2. Click en el botón verde **"New"** (o "+" → "New repository")
3. Configuración del repositorio:
   - **Repository name:** `ingenieria-automotriz-rios`
   - **Description:** "Sitio web corporativo con panel de administración"
   - **Visibility:** Selecciona **Private** o **Public** (recomendado: Private)
   - ✅ **NO marques** "Add a README file"
   - ✅ **NO selecciones** .gitignore
   - ✅ **NO selecciones** licencia
4. Click en **"Create repository"**

📸 **Captura de referencia:**
```
┌─────────────────────────────────────┐
│ Create a new repository             │
│                                     │
│ Repository name*                    │
│ [ingenieria-automotriz-rios      ] │
│                                     │
│ Description (optional)              │
│ [Sitio web corporativo...        ] │
│                                     │
│ ○ Public  ● Private                │
│                                     │
│ [ Create repository ]               │
└─────────────────────────────────────┘
```

---

### 1.2 Preparar tu Código Local

Abre una terminal en tu computadora y ejecuta:

```bash
# Navegar a la carpeta del proyecto
cd /app

# Inicializar Git (si no está inicializado)
git init

# Añadir todos los archivos
git add .

# Crear el primer commit
git commit -m "Initial commit - Sitio web Ingeniería Automotriz Ríos"

# Conectar con tu repositorio de GitHub
# ⚠️ REEMPLAZA 'TU-USUARIO' con tu nombre de usuario de GitHub
git remote add origin https://github.com/TU-USUARIO/ingenieria-automotriz-rios.git

# Subir el código
git branch -M main
git push -u origin main
```

✅ **Verificación:** Ve a tu repositorio en GitHub y deberías ver todas las carpetas: `frontend/`, `backend/`, `render.yaml`, etc.

---

## 🌐 Paso 2: Crear Cuenta en Render.com

### 2.1 Registro

1. Ve a https://render.com
2. Click en **"Get Started"** o **"Sign Up"**
3. **Opción recomendada:** Click en **"Sign up with GitHub"**
   - Esto conecta automáticamente tu GitHub
   - Autoriza el acceso cuando te lo pida
4. Completa tu perfil (nombre, email)
5. ✅ Confirma tu email

📸 **Captura de referencia:**
```
┌─────────────────────────────────────┐
│         Welcome to Render           │
│                                     │
│  [🐙 Sign up with GitHub]          │
│                                     │
│  ─────────── or ───────────        │
│                                     │
│  Email: [____________]              │
│  Password: [____________]           │
│                                     │
│  [ Create Account ]                 │
└─────────────────────────────────────┘
```

---

## 🚀 Paso 3: Desplegar tu Aplicación

### 3.1 Crear Nuevo Blueprint

1. Una vez dentro de Render, click en **"New +"** (esquina superior derecha)
2. Selecciona **"Blueprint"**

📸 **Verás un menú:**
```
┌─────────────────────────────┐
│ New +                    ▼  │
├─────────────────────────────┤
│ Web Service                 │
│ Static Site                 │
│ Private Service             │
│ Background Worker           │
│ Cron Job                    │
│ ► Blueprint                 │ ← Click aquí
└─────────────────────────────┘
```

---

### 3.2 Conectar Repositorio

1. Si es la primera vez, click en **"Connect account"** para conectar GitHub
2. Busca tu repositorio: `ingenieria-automotriz-rios`
3. Click en **"Connect"**

📸 **Verás:**
```
┌──────────────────────────────────────────┐
│ Select Repository                        │
│                                          │
│ 🔍 Search: [ingenieria-automotriz     ] │
│                                          │
│ ✓ ingenieria-automotriz-rios            │
│   Private • Updated 2 minutes ago       │
│   [ Connect ]                            │
└──────────────────────────────────────────┘
```

---

### 3.3 Configurar Blueprint

1. **Blueprint Name:** `ingenieria-automotriz-rios`
2. **Branch:** `main`
3. **Blueprint file:** Render detectará automáticamente `render.yaml`
4. Click en **"Apply"**

📸 **Render mostrará los servicios detectados:**
```
┌────────────────────────────────────────────┐
│ Services to be created:                    │
│                                            │
│ ✓ ingenieria-rios-backend (Web Service)   │
│ ✓ ingenieria-rios-frontend (Static Site)  │
│ ✓ ingenieria-rios-mongodb (Database)      │
│                                            │
│           [ Apply Blueprint ]              │
└────────────────────────────────────────────┘
```

5. Click en **"Apply Blueprint"**

---

### 3.4 Proceso de Despliegue (Automático)

Render comenzará a desplegar automáticamente:

```
🔵 Backend (Python):      ⏳ Building... (2-3 minutos)
🟢 Frontend (React):      ⏳ Building... (3-4 minutos)
🟡 MongoDB (Database):    ⏳ Provisioning... (1 minuto)
```

**Puedes ver el progreso en tiempo real:**
- Click en cada servicio para ver los logs
- Verás mensajes como:
  ```
  ==> Installing dependencies...
  ==> Building application...
  ==> Starting service...
  ==> Deploy live! ✅
  ```

⏱️ **Tiempo total:** 5-8 minutos aproximadamente

---

## 🎉 Paso 4: ¡Tu Sitio Está Listo!

### 4.1 Obtener tus URLs

Una vez completado el deploy, verás:

```
┌────────────────────────────────────────────────────┐
│ ✅ ingenieria-rios-frontend                        │
│ https://ingenieria-rios-frontend.onrender.com     │
│ Status: ● Live                                     │
└────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────┐
│ ✅ ingenieria-rios-backend                         │
│ https://ingenieria-rios-backend.onrender.com      │
│ Status: ● Live                                     │
└────────────────────────────────────────────────────┘
```

---

### 4.2 URLs de tu Aplicación

🌐 **Sitio Web Público:**
```
https://ingenieria-rios-frontend.onrender.com
```

🔐 **Panel de Administración:**
```
https://ingenieria-rios-frontend.onrender.com/login
```
**Credenciales:**
- Usuario: `admin`
- Contraseña: `admin123`

📡 **API Backend:**
```
https://ingenieria-rios-backend.onrender.com/api/
```

---

## 🔧 Paso 5: Verificación

### 5.1 Probar el Sitio Web

1. Abre: `https://ingenieria-rios-frontend.onrender.com`
2. Deberías ver tu sitio web funcionando
3. Prueba el formulario de contacto
4. Verifica que el botón de WhatsApp funcione

### 5.2 Probar el Panel Admin

1. Ve a: `https://ingenieria-rios-frontend.onrender.com/login`
2. Ingresa: `admin` / `admin123`
3. Deberías ver el panel con los mensajes
4. **¡IMPORTANTE!** Cambia tu contraseña inmediatamente:
   - Ve a la pestaña "Configuración"
   - Cambia la contraseña por defecto

### 5.3 Verificar API

1. Abre: `https://ingenieria-rios-backend.onrender.com/api/`
2. Deberías ver: `{"message": "Ingeniería Automotriz Ríos API"}`

✅ **Si ves esto, ¡todo está funcionando correctamente!**

---

## 🔄 Paso 6: Actualizaciones Futuras

### Cómo actualizar tu sitio después de hacer cambios:

```bash
# En tu terminal local:
cd /app

# Hacer tus cambios en el código...

# Subir cambios a GitHub
git add .
git commit -m "Descripción de los cambios"
git push
```

🎯 **Render detectará automáticamente los cambios y redesplegará** (toma 3-5 minutos)

---

## ⚠️ Importante: Plan Gratuito

### Limitaciones del Plan Free de Render:

1. **Auto-Sleep después de 15 minutos de inactividad**
   - El sitio se "duerme" si nadie lo visita por 15+ minutos
   - Primera visita después del sleep: tarda ~30 segundos en "despertar"
   - Visitas subsecuentes: funcionan normal y rápido

2. **750 horas de servicio gratis al mes**
   - Más que suficiente para uso normal
   - Se resetea cada mes

3. **Recursos limitados:**
   - 512 MB RAM
   - 0.1 CPU
   - Suficiente para tu sitio web

### 💡 Solución al Auto-Sleep:

Si quieres que tu sitio siempre esté "despierto", puedes:
- **Opción 1:** Upgrade a plan de pago ($7/mes por servicio)
- **Opción 2:** Usar un servicio de "ping" gratuito como:
  - UptimeRobot.com (hace ping cada 5 minutos)
  - Cron-job.org (hace ping periódico)

---

## 🌐 Paso 7 (Opcional): Usar tu Propio Dominio

Si tienes un dominio propio (ej: `www.ingenieriaautomotrizrios.com`):

### En Render:
1. Ve a tu servicio Frontend
2. Click en "Settings" → "Custom Domain"
3. Añade tu dominio
4. Render te dará registros DNS para configurar

### En tu Proveedor de Dominio (GoDaddy, Namecheap, etc.):
1. Ve a configuración de DNS
2. Añade los registros que Render te proporcionó
3. Espera 5-30 minutos para propagación

✅ Tu sitio estará disponible en tu dominio propio

---

## 🆘 Solución de Problemas

### Problema 1: "Build Failed"

**Causa común:** Dependencias faltantes

**Solución:**
1. Ve a los logs del servicio que falló
2. Lee el error exacto
3. Generalmente necesitas:
   - Backend: Actualizar `requirements.txt`
   - Frontend: Ejecutar `yarn install` localmente

### Problema 2: "Service Unavailable"

**Causa:** El servicio está "dormido" (plan free)

**Solución:**
- Espera 30 segundos y recarga la página
- El servicio se despertará automáticamente

### Problema 3: Frontend no conecta con Backend

**Causa:** Variable de entorno mal configurada

**Solución:**
1. Ve a Frontend → Settings → Environment Variables
2. Verifica que `REACT_APP_BACKEND_URL` apunte a:
   ```
   https://ingenieria-rios-backend.onrender.com
   ```
3. Guarda y redeploy

### Problema 4: MongoDB Connection Error

**Causa:** Base de datos no está lista o mal configurada

**Solución:**
1. Ve a la base de datos en Render
2. Copia el "Internal Connection String"
3. Ve a Backend → Settings → Environment Variables
4. Actualiza `MONGO_URL` con esa URL
5. Guarda y redeploy

---

## 📊 Monitoreo

### Ver Logs en Tiempo Real:

1. En Render Dashboard
2. Click en cualquier servicio
3. Tab "Logs"
4. Verás todos los eventos en tiempo real

### Métricas:

- **CPU Usage:** Uso de procesador
- **Memory Usage:** Uso de RAM
- **Request Count:** Número de visitas
- **Response Time:** Velocidad del sitio

---

## ✅ Checklist Final

- [ ] Código subido a GitHub
- [ ] Cuenta de Render creada
- [ ] Blueprint aplicado exitosamente
- [ ] Todos los servicios con status "Live" ✅
- [ ] Sitio web funcionando en la URL de Render
- [ ] Panel admin accesible con login
- [ ] Contraseña de admin cambiada
- [ ] Formulario de contacto funcional
- [ ] API respondiendo correctamente

---

## 🎯 URLs Finales de Referencia Rápida

### Desarrollo (Local):
```
Frontend: http://localhost:3000
Backend:  http://localhost:8001
Admin:    http://localhost:3000/admin
```

### Producción (Render):
```
Frontend: https://ingenieria-rios-frontend.onrender.com
Backend:  https://ingenieria-rios-backend.onrender.com
Admin:    https://ingenieria-rios-frontend.onrender.com/admin
Login:    https://ingenieria-rios-frontend.onrender.com/login
```

---

## 📞 Soporte

Si tienes problemas:

1. **Documentación de Render:** https://render.com/docs
2. **Comunidad de Render:** https://community.render.com
3. **Soporte de Render:** support@render.com

---

## 🎉 ¡Felicidades!

Tu sitio web profesional está ahora:
- ✅ Desplegado en la nube
- ✅ Accesible desde cualquier lugar del mundo
- ✅ Con HTTPS (certificado SSL automático)
- ✅ Con backup automático de base de datos
- ✅ Con deploy automático al hacer push a GitHub

**Tu sitio está listo para recibir clientes! 🚀**

---

**Última actualización:** Enero 2025
**Versión:** 1.0
