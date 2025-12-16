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

// Servir archivos estáticos del build (dist)
app.use(express.static(path.join(__dirname, 'client', 'dist')));

// Servir archivos estáticos de public (ejemplo: ZIPs)
app.use('/zips', express.static(path.join(__dirname, 'client', 'public', 'zips')));

// Ruta fallback para React Router SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`🚀 Servidor iniciado en http://localhost:${port}`);
});
