# 🔐 Instrucciones del Panel de Administración
## Ingeniería Automotriz Ríos

---

## 📋 Acceso al Panel

### URLs Importantes:
- **Sitio web público:** `https://tu-dominio.com/`
- **Panel de administración:** `https://tu-dominio.com/admin`
- **Login:** `https://tu-dominio.com/login`

### Credenciales Por Defecto:
```
Usuario: admin
Contraseña: admin123
```

⚠️ **IMPORTANTE:** Se recomienda cambiar estas credenciales inmediatamente después del primer acceso.

---

## 🔑 Cómo Cambiar tu Contraseña

### Paso 1: Iniciar Sesión
1. Ve a `https://tu-dominio.com/login`
2. Ingresa usuario: `admin`
3. Ingresa contraseña: `admin123`
4. Click en "Iniciar Sesión"

### Paso 2: Acceder a Configuración
1. Una vez en el panel admin, click en la pestaña **"Configuración"** (icono de engranaje)
2. Verás la sección "Cambiar Contraseña"

### Paso 3: Cambiar Contraseña
1. **Contraseña Actual:** Ingresa `admin123`
2. **Nueva Contraseña:** Ingresa tu nueva contraseña (mínimo 6 caracteres)
3. **Confirmar Nueva Contraseña:** Vuelve a ingresar tu nueva contraseña
4. Click en "Cambiar Contraseña"

✅ Verás una notificación verde confirmando el cambio exitoso.

---

## 📧 Gestión de Mensajes de Contacto

### Ver Mensajes
1. En el panel admin, la pestaña **"Mensajes"** muestra todos los mensajes recibidos
2. Puedes ver:
   - **Estado:** Nuevo, Leído, Respondido
   - **Nombre** del cliente
   - **Email** y **Teléfono**
   - **Fecha** de recepción

### Filtrar Mensajes
Click en los botones de filtro:
- **Todos:** Muestra todos los mensajes
- **Nuevos:** Solo mensajes sin revisar
- **Leídos:** Mensajes ya revisados

### Ver Detalles de un Mensaje
1. Click en cualquier fila de la tabla
2. El panel derecho mostrará:
   - Información completa del contacto
   - Mensaje completo
   - Botones de acción rápida:
     - **Responder:** Abre tu cliente de email
     - **Llamar:** Inicia llamada telefónica

### Actualizar Lista
- Click en el botón **"Actualizar"** para recargar los mensajes más recientes

---

## 🔒 Seguridad

### Recomendaciones:
✅ Usa una contraseña única que no uses en otros sitios  
✅ Incluye letras, números y símbolos  
✅ Cambia tu contraseña cada 3-6 meses  
✅ No compartas tu contraseña con nadie  
✅ Cierra sesión cuando termines  

### Cerrar Sesión
Click en el botón rojo **"Cerrar Sesión"** en la esquina superior derecha del panel.

---

## 🛡️ Protección del Panel

El panel admin está protegido con:
- ✅ **Autenticación JWT:** Token de sesión válido por 24 horas
- ✅ **Contraseñas hasheadas:** Las contraseñas están encriptadas en la base de datos
- ✅ **Rutas protegidas:** Solo usuarios autenticados pueden acceder a `/admin`
- ✅ **Verificación de token:** Cada solicitud valida la autenticación

Si alguien intenta acceder a `/admin` sin autenticación, será redirigido automáticamente a `/login`.

---

## ❓ Preguntas Frecuentes

### ¿Qué pasa si olvido mi contraseña?
Actualmente necesitarás acceso a la base de datos MongoDB o contactar al desarrollador para resetear la contraseña.

### ¿Puedo crear más usuarios admin?
Esta funcionalidad no está implementada actualmente. Solo existe un usuario admin.

### ¿Cuánto tiempo dura mi sesión?
Tu sesión es válida por 24 horas desde el login. Después deberás volver a iniciar sesión.

### ¿Los mensajes de contacto se eliminan automáticamente?
No, todos los mensajes se almacenan permanentemente en MongoDB hasta que decidas eliminarlos manualmente.

---

## 🆘 Soporte

Si tienes problemas técnicos o necesitas asistencia adicional, contacta al equipo de desarrollo.

---

**Última actualización:** Enero 2025
