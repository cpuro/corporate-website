// jest.setup.cjs
// Configurar variables de entorno para Jest
process.env.VITE_GOOGLE_FORM_URL = 'https://example.com/form';
process.env.VITE_GOOGLE_FORM_ENTRY_NOMBRE = 'entry_nombre';
process.env.VITE_GOOGLE_FORM_ENTRY_EMAIL = 'entry_email';
process.env.VITE_GOOGLE_FORM_ENTRY_MENSAJE = 'entry_mensaje';
process.env.VITE_API_URL = 'http://localhost:5000';

// Mock de import.meta.env
global.importMeta = {
  env: {
    VITE_GOOGLE_FORM_URL: 'https://example.com/form',
    VITE_GOOGLE_FORM_ENTRY_NOMBRE: 'entry_nombre',
    VITE_GOOGLE_FORM_ENTRY_EMAIL: 'entry_email',
    VITE_GOOGLE_FORM_ENTRY_MENSAJE: 'entry_mensaje',
    VITE_API_URL: 'http://localhost:5000',
  },
};
