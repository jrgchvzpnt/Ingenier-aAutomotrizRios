# 🚗 Ingeniería Automotriz Ríos - Sitio Web Corporativo

Sitio web profesional con panel de administración para gestión de mensajes de contacto.

---

## 🌟 Características

### Sitio Web Público
- ✅ Diseño profesional responsive (móvil, tablet, desktop)
- ✅ Hero section con calificación Google (4.7⭐)
- ✅ 6 servicios especializados
- ✅ Proceso de trabajo en 5 pasos
- ✅ Testimonios de clientes reales
- ✅ Galería de trabajos
- ✅ **Formulario de contacto funcional** con validaciones
- ✅ Botón flotante de WhatsApp
- ✅ Footer completo con información

### Panel de Administración
- 🔒 **Login seguro** con JWT (tokens de 24 horas)
- 📧 **Gestión de mensajes** de contacto
- 🔍 **Filtros** por estado (Nuevos, Leídos, Respondidos)
- 📊 **Estadísticas** de mensajes
- 👤 **Cambio de contraseña** desde la interfaz
- 🔐 **Contraseñas hasheadas** con bcrypt

---

## 🚀 Despliegue Rápido en Render.com

### 📋 Requisitos
- Cuenta de GitHub
- Cuenta de Render.com (gratis)
- Cuenta de MongoDB Atlas (gratis)

### ⚡ Pasos Rápidos

1. **MongoDB Atlas:** Sigue [`GUIA_MONGODB_ATLAS.md`](./GUIA_MONGODB_ATLAS.md)
2. **GitHub:** Sube tu código
3. **Render:** Sigue [`GUIA_DESPLIEGUE_RENDER.md`](./GUIA_DESPLIEGUE_RENDER.md)

**Tiempo total:** 15-20 minutos  
**Costo:** 100% GRATIS

---

## 🔑 Acceso Admin

```
URL:      https://TU-SITIO.onrender.com/login
Usuario:  admin
Password: admin123
```

⚠️ **Cambia la contraseña inmediatamente** en Configuración

Guía completa: [`INSTRUCCIONES_ADMIN.md`](./INSTRUCCIONES_ADMIN.md)

---

## 📚 Documentación

- 📘 **[Guía de Despliegue Completa](./GUIA_DESPLIEGUE_RENDER.md)** - Paso a paso con capturas
- 📗 **[Configuración MongoDB Atlas](./GUIA_MONGODB_ATLAS.md)** - Setup de base de datos
- 📕 **[Manual del Admin](./INSTRUCCIONES_ADMIN.md)** - Uso del panel
- 📙 **[Contratos de API](./contracts.md)** - Documentación técnica

---

## 🛠️ Stack Tecnológico

**Frontend:** React + Tailwind + Shadcn/UI  
**Backend:** FastAPI + Python  
**Database:** MongoDB Atlas  
**Auth:** JWT + Bcrypt  
**Deploy:** Render.com

---

## 💻 Desarrollo Local

```bash
# Frontend
cd frontend && yarn install && yarn start

# Backend  
cd backend && pip install -r requirements.txt && uvicorn server:app --reload
```

---

## 🔒 Seguridad

✅ JWT con expiración de 24h  
✅ Contraseñas hasheadas con bcrypt  
✅ Validación de datos con Pydantic  
✅ HTTPS automático  
✅ Variables de entorno protegidas  

---

## 📞 Soporte

- **Render:** https://render.com/docs
- **MongoDB Atlas:** https://docs.atlas.mongodb.com

---

**Versión 1.0.0** | Enero 2025 | Desarrollado con ❤️
