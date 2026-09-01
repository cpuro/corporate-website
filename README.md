# Corporación Paso a Paso – Sitio Web

Sitio web corporativo de la **Corporación Paso a Paso**. Es una **SPA estática**
construida con **React 19 + Vite 6 + Tailwind CSS 3.4**. El resultado del build
son ficheros estáticos que se suben a un **hosting compartido cPanel/Apache**; no
hay servidor de aplicación ni contenedores.

## 🎯 Características

- ⚡ **Vite 6 + React 19** – desarrollo con HMR, build optimizado
- 🎨 **Tailwind CSS 3.4** – diseño responsivo
- 🧭 **React Router 7** – enrutado SPA con *code splitting* por ruta
- 📄 **Visor de PDF** – `react-pdf` + `pdfjs-dist`
- 🗺️ **Mapa** – `react-leaflet` / Leaflet (tiles de OpenStreetMap)
- 🔍 **SEO** – `<title>`/meta por ruta (metadatos nativos de React 19), Open
  Graph, `sitemap.xml`, `robots.txt` y datos estructurados JSON-LD
- 🚀 **Rendimiento** – *lazy loading*, precompresión Brotli/gzip servida por
  `.htaccess`, *cache-busting* por hash
- 🔒 **Seguridad** – cabeceras HTTP en `.htaccess` (incl. CSP en modo
  *Report-Only*), sanitización de entradas propia
- ✅ **Testing** – Jest + React Testing Library

## 📋 Requisitos

- **Node.js 24** (ver `.nvmrc`; `nvm use` lo selecciona)
- **npm**

## 📁 Estructura del proyecto

```
Corporate-website/
├── client/                     # Aplicación React (todo el código vive aquí)
│   ├── public/                 # Se copia tal cual a dist/
│   │   ├── .htaccess           # Config de Apache para el hosting (ver Despliegue)
│   │   ├── documents/          # PDFs servidos desde /documents
│   │   ├── og-image.webp       # Imagen para Open Graph
│   │   ├── robots.txt
│   │   └── sitemap.xml
│   ├── src/
│   │   ├── components/         # Componentes de UI
│   │   ├── pages/              # Páginas enrutadas
│   │   ├── hooks/              # Hooks personalizados
│   │   ├── services/           # logger, sanitizer
│   │   ├── utils/              # utilidades (imageOptimization)
│   │   ├── data/               # datos estáticos
│   │   ├── config/             # constantes (rutas, URLs, validación)
│   │   ├── assets/             # imágenes/iconos (WebP/SVG)
│   │   └── __tests__/          # pruebas unitarias
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── jest.config.cjs
│   └── package.json
├── .nvmrc                       # versión de Node
├── .editorconfig
├── .github/workflows/ci.yml     # CI: lint + test + build
├── A11Y.md
└── IMPROVEMENTS_SUMMARY.md
```

## 🚀 Desarrollo local

```bash
cd client
npm ci
npm run dev          # http://localhost:5173
```

## 🏗️ Build de producción

```bash
cd client
npm run build        # genera client/dist/
npm run preview      # sirve client/dist/ en local para revisar
```

`client/dist/` contiene el `index.html`, los assets con hash, sus versiones
`.br`/`.gz` y el `.htaccess`.

## 📤 Despliegue (hosting compartido cPanel/Apache)

No hay despliegue automático. El proceso es manual:

1. `cd client && npm ci && npm run build`.
2. Subir **el contenido de `client/dist/`** (no la carpeta, su contenido) al
   *document root* del hosting (normalmente `public_html/`), por FTP/SFTP o el
   Administrador de archivos de cPanel. El `.htaccess` va incluido en `dist/`.
3. Comprobar en el navegador las 6 rutas (`/`, `/nosotros`, `/servicios`,
   `/proyectos`, `/regimen-tributario-especial`, `/contacto`) y una recarga
   directa en una ruta profunda (p. ej. recargar estando en `/nosotros`).

El `.htaccess` necesita `mod_headers`, `mod_expires`, `mod_rewrite` y
`mod_deflate` (todos habituales en cPanel) y que el hosting permita
`AllowOverride`/`Options FollowSymLinks` para `.htaccess`.

**Síntomas si algo de eso falta:**

- Recargar en una ruta que no sea `/` devuelve **404** → `mod_rewrite` está
  desactivado o `AllowOverride` no lo permite (falla el *fallback* SPA).
- Los ficheros se sirven sin comprimir (más pesados de lo esperado) →
  `mod_rewrite`/`mod_headers` no están sirviendo los `.br`/`.gz` precomprimidos.
- Un **HTTP 500** en todo el sitio nada más subir el `.htaccess` → algún módulo
  no está y el `<IfModule>` no lo cubre; revisar el `error_log` de cPanel.

**CSP:** se envía como `Content-Security-Policy-Report-Only`, es decir **no
bloquea nada** todavía. Para activarla hay que desplegar, recorrer las 6 rutas
(más el envío del formulario y el carrusel de vídeo) vigilando la consola del
navegador, y solo cuando no haya avisos, renombrar la cabecera a
`Content-Security-Policy` en el `.htaccess` (instrucciones dentro del propio
fichero).

## ✅ Scripts (`client/`)

```bash
npm run dev            # servidor de desarrollo
npm run build          # build de producción -> dist/
npm run preview        # sirve el build en local
npm run lint           # ESLint (0 errores esperados)
npm test               # Jest
npm run test:watch     # Jest en modo watch
npm run test:coverage  # Jest con cobertura (hay umbral mínimo configurado)
```

## 🔧 Variables de entorno

Opcionales. Crear `client/.env` (o `.env.local`) a partir de `client/.env.example`:

```env
# URL del Google Form del formulario de contacto (hay un valor por defecto en el código)
VITE_GOOGLE_FORM_URL=...
# Nivel de log
VITE_LOG_LEVEL=info
```

Solo se leen variables con prefijo `VITE_` (vía `import.meta.env`). Si no hay
`.env`, la app usa los valores por defecto del código.

## 📦 Dependencias principales

| Paquete | Uso |
|---|---|
| `react` / `react-dom` 19.2 | UI |
| `react-router-dom` 7.6 | enrutado |
| `react-pdf` 9.2 + `pdfjs-dist` 4.8 | visor de PDF |
| `tailwindcss` 3.4 | estilos |
| `framer-motion` 12 | animaciones |
| `leaflet` 1.9 + `react-leaflet` 5 | mapa |
| `lucide-react`, `react-icons`, `@fortawesome/*`, `@heroicons/react` | iconos |
| `react-intersection-observer` 9 | lazy loading por viewport |

## 🔐 Seguridad

- **Sanitización de entradas propia** en `client/src/services/sanitizer.js`
  (no se usa DOMPurify).
- Validación de formularios en cliente.
- Cabeceras HTTP en `client/public/.htaccess`: `X-Frame-Options`,
  `X-Content-Type-Options`, `Referrer-Policy`, `Strict-Transport-Security` y
  `Content-Security-Policy-Report-Only` (pendiente de activar, ver Despliegue).

## 📊 Rendimiento

- *Code splitting* por ruta (`React.lazy` + `Suspense`).
- *Lazy loading* de secciones e imágenes (IntersectionObserver).
- Precompresión Brotli + gzip en el build; el `.htaccess` sirve el `.br`/`.gz`
  según `Accept-Encoding`.
- *Cache-busting* por hash: assets con hash → `Cache-Control: immutable` 1 año;
  resto de estáticos → 1 mes; HTML → sin caché.
- Imágenes en WebP.

## 🧪 Testing

```bash
cd client
npm test
npm run test:coverage
```

Las pruebas están en `client/src/__tests__/`. `jest.config.cjs` fija un
`coverageThreshold` mínimo que actúa de trinquete: si la cobertura baja de lo
medido, el comando falla.

## 🤖 CI

`.github/workflows/ci.yml` ejecuta **lint + test + build** en cada push/PR. No
incluye despliegue.

## 📚 Documentación adicional

- `A11Y.md` – accesibilidad
- `IMPROVEMENTS_SUMMARY.md` – resumen de mejoras

## 📝 Licencia

Software propietario. Copyright (c) 2026 Corporación Paso a Paso. Todos los
derechos reservados. Ver [`LICENSE`](LICENSE): no se concede licencia de uso,
copia, distribución ni modificación sin autorización previa y por escrito del
titular.
