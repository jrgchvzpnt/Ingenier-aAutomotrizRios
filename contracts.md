# Contratos API - Ingeniería Automotriz Ríos

## Resumen
Este documento define los contratos entre frontend y backend para el sitio web de Ingeniería Automotriz Ríos.

## Datos Actualmente Mockeados en Frontend

### 1. Formulario de Contacto (Home.jsx)
- **Estado actual**: Muestra alert() al enviar, no persiste datos
- **Datos**:
  ```javascript
  {
    name: string,
    phone: string,
    email: string,
    message: string
  }
  ```

### 2. Servicios
- **Estado actual**: Array estático en componente
- **Datos**: 6 servicios hardcoded

### 3. Testimonios/Reseñas
- **Estado actual**: Array estático en componente
- **Datos**: 3 testimonios hardcoded

### 4. Galería
- **Estado actual**: Array de URLs estático
- **Datos**: 6 imágenes de Unsplash/Pexels

## APIs a Implementar

### 1. POST /api/contact
**Propósito**: Guardar mensajes de contacto en MongoDB

**Request Body**:
```json
{
  "name": "string (required)",
  "phone": "string (required)",
  "email": "string (required, valid email)",
  "message": "string (required)"
}
```

**Response Success (201)**:
```json
{
  "success": true,
  "message": "Mensaje recibido correctamente",
  "data": {
    "id": "string",
    "name": "string",
    "phone": "string",
    "email": "string",
    "message": "string",
    "createdAt": "ISO date string"
  }
}
```

**Response Error (400)**:
```json
{
  "success": false,
  "error": "Mensaje de error"
}
```

### 2. GET /api/contact (opcional - admin)
**Propósito**: Obtener todos los mensajes de contacto

**Response (200)**:
```json
{
  "success": true,
  "data": [
    {
      "id": "string",
      "name": "string",
      "phone": "string",
      "email": "string",
      "message": "string",
      "createdAt": "ISO date string"
    }
  ]
}
```

## Modelos MongoDB

### ContactMessage
```python
{
  "_id": ObjectId,
  "name": str,
  "phone": str,
  "email": str,
  "message": str,
  "created_at": datetime,
  "status": str  # "new", "read", "replied"
}
```

## Integración Frontend

### Cambios necesarios en Home.jsx:

1. Reemplazar `handleSubmit` para llamar API:
```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post(`${API}/contact`, formData);
    // Mostrar toast de éxito
    setFormData({ name: '', phone: '', email: '', message: '' });
  } catch (error) {
    // Mostrar toast de error
  }
};
```

2. Agregar toast notifications (sonner ya instalado)

## Validaciones Backend

1. **Email**: Formato válido
2. **Campos requeridos**: name, phone, email, message
3. **Longitud**: 
   - name: min 2, max 100
   - phone: min 10, max 20
   - email: max 100
   - message: min 10, max 1000

## Notas de Implementación

- Usar FastAPI con motor (AsyncIOMotorClient ya configurado)
- Colección MongoDB: `contact_messages`
- Agregar índice en `created_at` para ordenar
- CORS ya configurado en server.py
- Ruta debe tener prefijo `/api` (api_router)

## Testing

### Manual:
1. Llenar formulario en frontend
2. Verificar que datos se guarden en MongoDB
3. Verificar respuesta toast al usuario

### Automated:
- Test POST /api/contact con datos válidos
- Test POST /api/contact con datos inválidos
- Test GET /api/contact (si implementado)
