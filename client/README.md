# Corporación Paso a Paso – Cliente (React + Vite)

Aplicación cliente del sitio corporativo desarrollada con `React` y `Vite`, estilizada con `Tailwind CSS` y enrutada con `react-router-dom`. Incluye pruebas con `Jest` y `React Testing Library`.

## Stack Tecnológico
- `React` 19
- `Vite` 6
- `Tailwind CSS` 3.4
- `React Router` 7
- `react-pdf` 9 + `pdfjs-dist` 4
- `framer-motion`, `leaflet`/`react-leaflet`, `react-intersection-observer`
- Pruebas con `jest` + `@testing-library/*`
- Linter con `eslint` (flat config) + `eslint-plugin-react` / `-jsx-a11y`
- Node 24 (ver `.nvmrc` en la raíz del repo)

## Estructura del Proyecto (cliente)
```
client/
├── public/
│   ├── documents/                # PDFs estáticos servidos desde /documents
│   ├── favicon.ico
│   └── robots.txt
├── src/
│   ├── assets/                   # Imágenes/iconos optimizados (WebP/SVG)
│   ├── components/               # Componentes UI
│   ├── config/                   # Constantes (rutas, URLs, validación)
│   ├── data/                     # Datos estáticos
│   ├── hooks/                    # Hooks personalizados (lazy image, formulario)
│   ├── pages/                    # Páginas enrutadas
│   ├── services/                 # Servicios (logger, sanitizador)
│   ├── __tests__/                # Pruebas unitarias
│   ├── App.jsx                   # Enrutamiento y lazy loading
│   ├── main.jsx                  # Punto de entrada
│   └── index.css                 # Estilos (Tailwind)
├── __mocks__/                    # Mocks de Jest para archivos/SVG
├── index.html
├── vite.config.js                # Configuración de Vite y plugins
├── tailwind.config.js            # Configuración de Tailwind
├── postcss.config.js             # PostCSS + Autoprefixer
├── jest.config.cjs               # Configuración de Jest
├── jest.setup.cjs                # Entorno de pruebas (env/mocks)
├── .babelrc                      # Babel para jest (babel-jest)
├── eslint.config.js              # ESLint
├── .env.example                  # Variables de entorno de ejemplo
├── .env.test                     # Variables de entorno para pruebas (opcional)
├── package.json
└── (sin servidor Express)        # Uso de `vite preview` o hosting estático
```

## Instalación y Ejecución
```bash
# 1) Instalar dependencias
npm install

# 2) Desarrollo (HMR)
npm run dev
# Abre http://localhost:5173

# 3) Build de producción
npm run build

# 4) Vista previa del build
npm run preview
```

## Scripts Disponibles
```bash
npm run dev          # Servidor de desarrollo (Vite)
npm run build        # Build de producción
npm run preview      # Servir build en local
npm run lint         # Linter (ESLint)
npm test             # Ejecutar pruebas con Jest
npm run test:watch   # Pruebas en modo observador
npm run test:coverage # Reporte de cobertura
```

## Variables de Entorno
- `VITE_GOOGLE_FORM_URL` (URL de envío de formulario)  
- `VITE_API_BASE_URL` (si aplica, para consumo de APIs)  
- `VITE_LOG_LEVEL` (nivel de logging)

Si no se establecen, el proyecto usa valores por defecto en `src/config/constants.js`. Documentación adicional pendiente por definir si se amplía el uso de variables.

## Despliegue
El sitio se despliega como ficheros estáticos en hosting compartido cPanel/Apache.
`npm run build` genera `dist/` (incluye el `.htaccess` de `public/`); se sube el
contenido de `dist/` al *document root*. El detalle, los módulos de Apache
necesarios y los síntomas si falta alguno están en el **README de la raíz del
repo** (sección «Despliegue»).

## Notas de Arquitectura
- No se requiere Express ni contenedores.
- `index.html` no debe contener referencias a assets con hash del build; Vite los
  inyecta en producción.
- Los metadatos (`<title>`, `<meta>`, `<link rel="canonical">`) por ruta los
  gestiona `src/components/Seo.jsx` con el soporte nativo de React 19.

## Licencia
Software propietario. Copyright (c) 2026 Corporación Paso a Paso. Todos los
derechos reservados. Ver [`LICENSE`](../LICENSE) en la raíz del repositorio.
