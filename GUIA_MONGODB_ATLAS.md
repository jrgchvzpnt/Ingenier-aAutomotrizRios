# 🍃 Configuración de MongoDB Atlas (Base de Datos Gratuita)

## ¿Por qué MongoDB Atlas?

Render no incluye MongoDB en su plan gratuito. MongoDB Atlas ofrece:
- ✅ **512 MB de almacenamiento GRATIS** (más que suficiente para tu proyecto)
- ✅ Backups automáticos
- ✅ Alta disponibilidad
- ✅ Sin tarjeta de crédito requerida

---

## Paso 1: Crear Cuenta en MongoDB Atlas

1. Ve a: https://www.mongodb.com/cloud/atlas/register
2. Puedes registrarte con:
   - Email y contraseña
   - O **Google** (más rápido)
3. Completa el formulario de registro

---

## Paso 2: Crear un Cluster (Base de Datos)

### 2.1 Seleccionar Plan

Una vez dentro:

1. Click en **"Build a Database"** o **"Create"**
2. Selecciona **"Shared"** (el plan gratuito)
3. Verás: **"FREE - $0/forever"** ✅

```
┌─────────────────────────────────────────┐
│         Choose a path                   │
├─────────────────────────────────────────┤
│                                         │
│  ┌──────────────────────────────────┐  │
│  │  Shared (FREE)                   │  │
│  │  $0/forever                      │  │
│  │  512 MB Storage                  │  │
│  │  Shared RAM                      │  │
│  │  [ Create ] ←                    │  │
│  └──────────────────────────────────┘  │
│                                         │
│  Dedicated - Starts at $57/month       │
│  Serverless - Pay as you go            │
│                                         │
└─────────────────────────────────────────┘
```

4. Click en **"Create"** en el plan Shared

---

### 2.2 Configurar el Cluster

1. **Cloud Provider:** Selecciona **AWS**
2. **Region:** Selecciona la más cercana a Oregon (donde está tu Render):
   - Recomendado: **N. California (us-west-1)** o **Oregon (us-west-2)**
3. **Cluster Tier:** Debe estar en **M0 Sandbox (Free)**
4. **Cluster Name:** `ingenieria-rios-cluster` (o el que prefieras)

```
┌─────────────────────────────────────────┐
│  Cloud Provider & Region                │
├─────────────────────────────────────────┤
│                                         │
│  Provider: ⦿ AWS  ○ Google  ○ Azure    │
│                                         │
│  Region:                                │
│  ┌────────────────────────────────┐    │
│  │ N. California (us-west-1) ←    │    │
│  │ Oregon (us-west-2)             │    │
│  │ N. Virginia (us-east-1)        │    │
│  └────────────────────────────────┘    │
│                                         │
│  Cluster Tier: M0 Sandbox (FREE)       │
│  Cluster Name: [ingenieria-rios...]    │
│                                         │
│  [ Create Cluster ]                     │
└─────────────────────────────────────────┘
```

5. Click en **"Create Cluster"**

⏱️ El cluster tardará 3-5 minutos en crearse

---

## Paso 3: Configurar Seguridad

### 3.1 Crear Usuario de Base de Datos

Mientras el cluster se crea, verás un popup:

1. **Username:** `admin_rios` (o el que prefieras)
2. **Password:** Click en **"Autogenerate Secure Password"** 
   - 📋 **COPIA Y GUARDA ESTA CONTRASEÑA** - la necesitarás después
   - O crea tu propia contraseña segura
3. Click en **"Create User"**

```
┌─────────────────────────────────────────┐
│  Create a Database User                 │
├─────────────────────────────────────────┤
│                                         │
│  Username: [admin_rios____________]     │
│                                         │
│  Password: [●●●●●●●●●●●●●●●●●●●●]     │
│            [ Autogenerate ]             │
│                                         │
│  📋 Password: xK9mP2$vQw8nL4hR          │
│     ⚠️ GUARDA ESTA CONTRASEÑA           │
│                                         │
│  [ Create User ]                        │
└─────────────────────────────────────────┘
```

---

### 3.2 Configurar Acceso de Red

1. En la siguiente pantalla: **"Network Access"**
2. **IP Access List:**
   - Click en **"Add IP Address"**
   - Selecciona **"Allow Access from Anywhere"** (0.0.0.0/0)
   - ⚠️ Esto es seguro porque tu base de datos requiere usuario y contraseña

```
┌─────────────────────────────────────────┐
│  Add IP Access List Entry               │
├─────────────────────────────────────────┤
│                                         │
│  ⦿ Add Current IP Address               │
│  ⦿ Allow Access from Anywhere ←        │
│     0.0.0.0/0                           │
│                                         │
│  Comment: [Render deployment]           │
│                                         │
│  [ Confirm ]                            │
└─────────────────────────────────────────┘
```

3. Click en **"Confirm"**

---

## Paso 4: Obtener Connection String

### 4.1 Ir a Connect

1. Espera a que el cluster esté listo (status: ✅ verde)
2. Click en el botón **"Connect"** de tu cluster

```
┌─────────────────────────────────────────┐
│  ingenieria-rios-cluster                │
│  ┌────────────────────────────────┐     │
│  │  M0 Sandbox                    │     │
│  │  AWS / N. California           │     │
│  │  Status: ● Active              │     │
│  │                                │     │
│  │  [ Connect ] ←                 │     │
│  └────────────────────────────────┘     │
└─────────────────────────────────────────┘
```

---

### 4.2 Seleccionar Método de Conexión

1. Click en **"Drivers"**
2. **Driver:** Python
3. **Version:** 3.12 or later

```
┌─────────────────────────────────────────┐
│  Connect to ingenieria-rios-cluster     │
├─────────────────────────────────────────┤
│                                         │
│  ⦿ MongoDB for VS Code                  │
│  ⦿ Drivers ←                            │
│  ⦿ MongoDB Shell                        │
│                                         │
└─────────────────────────────────────────┘
```

---

### 4.3 Copiar Connection String

Verás algo como:

```python
mongodb+srv://admin_rios:<password>@ingenieria-rios-cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

**IMPORTANTE:**
1. 📋 Copia esta URL completa
2. Reemplaza `<password>` con la contraseña que guardaste en el Paso 3.1

**Ejemplo:**
```
Antes:
mongodb+srv://admin_rios:<password>@cluster.xxxxx.mongodb.net/...

Después (con tu contraseña):
mongodb+srv://admin_rios:xK9mP2$vQw8nL4hR@cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

---

## Paso 5: Configurar en Render

### 5.1 Ir a tu Backend en Render

1. Ve a tu dashboard de Render: https://dashboard.render.com
2. Click en tu servicio **"ingenieria-rios-backend"**
3. Click en **"Environment"** en el menú izquierdo

---

### 5.2 Agregar Variable de Entorno

1. En la sección "Environment Variables"
2. Click en **"Add Environment Variable"**
3. Configura:
   - **Key:** `MONGO_URL`
   - **Value:** Tu connection string completo de MongoDB Atlas
     ```
     mongodb+srv://admin_rios:TU_PASSWORD@cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
     ```

```
┌─────────────────────────────────────────┐
│  Add Environment Variable               │
├─────────────────────────────────────────┤
│                                         │
│  Key:   [MONGO_URL________________]     │
│                                         │
│  Value: [mongodb+srv://admin_rios...  ] │
│                                         │
│  [ Save Changes ]                       │
└─────────────────────────────────────────┘
```

4. Click en **"Save Changes"**

---

### 5.3 Redesplegar

Render redesplegarará automáticamente tu backend con la nueva configuración.

⏱️ Espera 2-3 minutos

---

## Paso 6: Verificar Conexión

### 6.1 Revisar Logs

1. En Render, ve a tu servicio backend
2. Click en **"Logs"**
3. Busca mensajes como:
   ```
   INFO - Admin user already exists
   INFO - Application startup complete
   ```

✅ Si ves estos mensajes, ¡la conexión a MongoDB está funcionando!

---

### 6.2 Probar el Sitio

1. Ve a tu sitio: `https://ingenieria-rios-frontend.onrender.com`
2. Llena el formulario de contacto
3. Ve al panel admin: `/login`
4. Verifica que aparezca el mensaje en la lista

✅ Si ves el mensaje guardado, ¡todo está perfecto!

---

## 📊 Monitoreo en MongoDB Atlas

### Ver tus Datos

1. En MongoDB Atlas, click en **"Browse Collections"**
2. Selecciona tu database: `ingenieria_rios_db`
3. Verás colecciones:
   - `contact_messages` - Mensajes del formulario
   - `admin_users` - Usuario admin
   - `status_checks` - Logs de estado

```
┌─────────────────────────────────────────┐
│  Database: ingenieria_rios_db           │
├─────────────────────────────────────────┤
│                                         │
│  📁 contact_messages (5 documents)      │
│  📁 admin_users (1 document)            │
│  📁 status_checks (0 documents)         │
│                                         │
└─────────────────────────────────────────┘
```

### Estadísticas

- **Conexiones activas**
- **Operaciones por segundo**
- **Almacenamiento usado** (de tus 512 MB gratis)

---

## 🔒 Seguridad

### Mejores Prácticas:

✅ **Contraseña segura:** Usa la autogenerada o una muy fuerte
✅ **Credenciales separadas:** No uses la misma contraseña que tu admin del sitio
✅ **Backups:** MongoDB Atlas hace backups automáticos
✅ **Monitoreo:** Revisa el dashboard periódicamente

---

## ❓ Solución de Problemas

### Error: "Authentication failed"

**Causa:** Contraseña incorrecta en el connection string

**Solución:**
1. Verifica que copiaste bien la contraseña
2. Si la olvidaste, en Atlas:
   - Database Access → Edit User → Reset Password
   - Genera nueva contraseña
   - Actualiza MONGO_URL en Render

---

### Error: "Connection timeout"

**Causa:** IP no está en la whitelist

**Solución:**
1. En Atlas: Network Access
2. Verifica que 0.0.0.0/0 está en la lista
3. Si no: Add IP Address → Allow Access from Anywhere

---

### Error: "Database not found"

**Causa:** Nombre de database incorrecto

**Solución:**
1. En Render, verifica que DB_NAME = `ingenieria_rios_db`
2. El nombre debe coincidir exactamente

---

## 💰 Límites del Plan Gratuito

MongoDB Atlas FREE incluye:

| Recurso | Límite |
|---------|--------|
| Storage | 512 MB |
| RAM | Compartida |
| Backups | Últimos 2 días |
| Clusters | 1 por proyecto |
| Connections | Ilimitadas* |

*Connections simultáneas razonables para uso normal

⚠️ Si llegas al límite de 512 MB, podrás:
1. Limpiar mensajes antiguos
2. Upgrade a plan de pago ($9/mes por 2 GB)

---

## 📚 Recursos Adicionales

- **MongoDB Atlas Docs:** https://docs.atlas.mongodb.com
- **MongoDB University:** https://university.mongodb.com (cursos gratis)
- **Soporte:** support@mongodb.com

---

## ✅ Checklist de Configuración

- [ ] Cuenta de MongoDB Atlas creada
- [ ] Cluster M0 (FREE) creado
- [ ] Usuario de database creado
- [ ] Contraseña guardada de forma segura
- [ ] IP whitelist configurada (0.0.0.0/0)
- [ ] Connection string copiado
- [ ] MONGO_URL configurado en Render
- [ ] Backend redespleado
- [ ] Conexión verificada en logs
- [ ] Formulario de contacto probado
- [ ] Mensaje visible en panel admin

---

**¡MongoDB Atlas configurado exitosamente! 🎉**

Tu aplicación ahora tiene una base de datos profesional, segura y escalable.

---

**Última actualización:** Enero 2025
