# Corporación Paso a Paso – Sitio Web

Sitio web corporativo moderno y optimizado creado con **React**, **Vite** y **Tailwind CSS**. Empacado con **Docker** y servido con **Nginx** para producción de alto rendimiento.

## 🎯 Características

- ⚡ **Vite + React 19** - Desarrollo rápido con HMR
- 🎨 **Tailwind CSS** - Diseño responsivo y personalizado
- 📱 **Diseño Responsivo** - Optimizado para todos los dispositivos
- 📄 **Visor de PDFs** - Integrado con react-pdf
- 🐳 **Docker** - Contenedor listo para producción
- 🔍 **SEO Optimizado** - Meta tags y robots.txt
- 🚀 **Performance** - Compresión Gzip/Brotli, lazy loading
- ✅ **Testing** - Jest y React Testing Library
- 🔒 **Seguridad** - Headers de seguridad, sanitización

## 📋 Requisitos Previos

- **Node.js** 18+ (solo para desarrollo local)
- **Docker** y **Docker Compose** (para producción)
- **npm** o **yarn**

## 📁 Estructura del Proyecto

```
Corporate-website/
├── client/                    # Código React
│   ├── src/
│   │   ├── components/        # Componentes React reutilizables
│   │   ├── pages/            # Páginas (Home, About, Services, etc.)
│   │   ├── services/         # Servicios (logger, sanitizer)
│   │   ├── hooks/            # Custom hooks
│   │   ├── utils/            # Utilidades (imageOptimization)
│   │   ├── assets/           # Imágenes e iconos
│   │   ├── data/             # Datos estáticos
│   │   ├── config/           # Configuraciones
│   │   └── __tests__/        # Tests unitarios
│   ├── public/               # Archivos estáticos públicos
│   ├── vite.config.js        # Configuración de Vite
│   ├── tailwind.config.js    # Configuración de Tailwind
│   └── package.json
├── server/                    # Servidor (Express) para APIs
├── Dockerfile                 # Imagen Docker de producción
├── nginx.conf               # Configuración de Nginx
└── docker-compose.yml       # Orquestación de contenedores
```

## 🚀 Inicio Rápido

### Desarrollo Local

```bash
# Ir a la carpeta del cliente
cd client

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# La aplicación estará disponible en http://localhost:5173
```

### Build para Producción

```bash
# Crear build optimizado
npm run build

# Vista previa del build
npm run preview
```

## 🐳 Ejecutar con Docker

### Opción 1: Docker Compose (Recomendado)

```bash
# Construir imagen
docker-compose build

# Iniciar contenedor
docker-compose up -d

# Acceder a http://localhost:8080
```

### Opción 2: Docker Manual

```bash
# Construir imagen
docker build -t corporacion-pasoapaso .

# Ejecutar contenedor
docker run -p 8080:80 corporacion-pasoapaso
```

## ✅ Scripts Disponibles

### Desarrollo

```bash
npm run dev          # Iniciar servidor de desarrollo
npm run build        # Construir para producción
npm run preview      # Vista previa de build
npm run lint         # Ejecutar ESLint
```

### Testing

```bash
npm test             # Ejecutar tests
npm run test:watch   # Tests en modo observador
npm run test:coverage # Cobertura de tests
```

## 🔧 Configuración de Variables de Entorno

Crea un archivo `.env` en la carpeta `client/` (opcional):

```env
# API Configuration
VITE_API_URL=https://api.tudominio.com

# PDF Configuration
VITE_PDF_MAX_SIZE=10

# Logging
VITE_LOG_LEVEL=info
```

## 📦 Dependencias Principales

- **react** (19.1.0) - Librería de UI
- **react-router-dom** (7.6.0) - Enrutamiento
- **react-pdf** (9.2.1) - Visor de PDFs
- **pdfjs-dist** (4.8.69) - Soporte para PDFs
- **tailwindcss** (3.4) - Estilos
- **framer-motion** (12.12.1) - Animaciones
- **leaflet** & **react-leaflet** (5.0.0) - Mapas
- **react-icons** (5.5.0) - Iconos
- **swiper** (11.2.6) - Carrusel

## 🔐 Características de Seguridad

- ✅ Sanitización de HTML (DOMPurify)
- ✅ Headers de seguridad HTTP (X-Frame-Options, CSP, etc.)
- ✅ Validación de formularios
- ✅ Protección contra XSS

## 🚀 Deployment en Producción

### En Servidor con Docker

```bash
# Clonar repositorio
git clone <tu-repo>
cd Corporate-website

# Construir y ejecutar
docker-compose up -d

# Verificar que está corriendo
docker ps
```

### En Docker Hub

```bash
# Construir con tag
docker build -t tu-usuario/corporacion-pasoapaso:latest .

# Subir a Docker Hub
docker push tu-usuario/corporacion-pasoapaso:latest

# Ejecutar desde Docker Hub
docker run -p 8080:80 tu-usuario/corporacion-pasoapaso:latest
```

### Verificar Build de Producción

```bash
# Listar assets incluidos
docker exec <container-id> ls -la /usr/share/nginx/html/assets/

# Verificar que el worker de PDF se incluyó
docker exec <container-id> ls /usr/share/nginx/html/assets/ | grep pdf.worker
```

## 📊 Performance & Optimizaciones

- ✅ **Code Splitting** - Carga de componentes bajo demanda
- ✅ **Lazy Loading** - Imágenes se cargan solo cuando entran en viewport
- ✅ **Compresión** - Gzip y Brotli habilitados en Nginx
- ✅ **Caché de Assets** - Hash-based cache busting
- ✅ **Minimificación** - CSS y JS minimizados
- ✅ **Optimización de Imágenes** - WebP cuando es soportado

## 🧪 Testing

```bash
# Ejecutar todos los tests
npm test

# Tests con cobertura
npm run test:coverage

# Tests en modo observador
npm run test:watch
```

Los tests se encuentran en `src/__tests__/`

## 📚 Documentación Adicional

Ver archivos incluidos en el proyecto:

- `TESTING.md` - Detalles de testing
- `PERFORMANCE.md` - Análisis de performance
- `A11Y.md` - Accesibilidad
- `IMPROVEMENTS_SUMMARY.md` - Mejoras implementadas

## 🐛 Solución de Problemas

### El worker de PDF no se carga

```bash
# Verificar que el worker esté en los assets
docker exec <container-id> ls /usr/share/nginx/html/assets/ | grep pdf.worker

# Verificar logs de Nginx
docker logs <container-id>
```

### Puerto 8080 ya en uso

```bash
# Cambiar puerto en docker-compose.yml
ports:
  - "8081:80"  # Cambiar a otro puerto
```

### Reconstruir imagen sin caché

```bash
docker-compose build --no-cache
```

## 📝 Licencia

MIT License - Ver LICENSE.md para más detalles

## 👥 Contacto & Soporte

Para reportar problemas o sugerencias, contacta al equipo de desarrollo.

---

**Última actualización:** 21 de Noviembre de 2025
