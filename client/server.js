// server.js
import express from 'express';
import compression from 'compression';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Comprimir respuestas
app.use(compression());

// Servir archivos estáticos desde el build
app.use(express.static(path.join(__dirname, 'client', 'dist')));

// ✅ Ruta fallback para aplicaciones SPA (React)
// ✅ Ruta wildcard segura que no lanza errores
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});


// Iniciar servidor
app.listen(port, () => {
  console.log(`🚀 Servidor iniciado en http://localhost:${port}`);
});
