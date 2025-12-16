// URLs y configuraciones de la aplicación
// IMPORTANTE: Las URLs sensibles deben venir de variables de entorno

// Función helper para obtener variables de entorno compatible con Vite y Jest
let envCache = null;

const getEnvVars = () => {
  if (envCache) return envCache;
  
  // Para Jest/Node
  if (typeof process !== 'undefined' && process.env) {
    envCache = process.env;
  }
  // Para Vite (si está disponible)
  else if (typeof window !== 'undefined' && window.__ENV__) {
    envCache = window.__ENV__;
  }
  // Fallback
  else {
    envCache = {};
  }
  
  return envCache;
};

const getEnv = (key, defaultValue) => {
  const env = getEnvVars();
  return env[key] || defaultValue;
};

export const GOOGLE_FORM_URL = getEnv(
  'VITE_GOOGLE_FORM_URL',
  'https://docs.google.com/forms/u/0/d/e/1FAIpQLSeS9E9oABuAnFNJZNW_nH7rXUFSQgy4P8r7nRceab8kDPV-kg/formResponse'
);

// IDs de entrada del formulario de Google Forms
export const FORM_ENTRY_IDS = {
  nombre: 'entry.2005620554',
  nombreOrganizacion: 'entry.851375990',
  correoElectronico: 'entry.1045781291',
  direccion: 'entry.1065046570',
  numeroTelefono: 'entry.1166974658',
  tema: 'entry.759670883',
  mensaje: 'entry.839337160',
};

// Configuración de navegación
export const NAV_ITEMS = [
  { to: '/', label: 'Inicio' },
  { to: '/nosotros', label: 'Nosotros' },
  { to: '/servicios', label: 'Servicios' },
  { to: '/proyectos', label: 'Proyectos' },
  { to: '/regimen-tributario-especial', label: 'Documentación Legal' },
  { to: '/contacto', label: 'Contacto' },
];

// URLs de documentos
export const DOCUMENT_URLS = {
  privacyNotice: '/documents/aviso-de-privacidad-paso-a-paso.pdf',  
  privacyPolicy: '/documents/politica-tratamiento-de-datos-paso-a-paso.pdf',
};

// Mensajes de validación
export const VALIDATION_MESSAGES = {
  nombreMin: 'El nombre debe tener al menos 2 caracteres.',
  nombreMax: 'El nombre no puede exceder 50 caracteres.',
  nombreInvalid: 'El nombre solo puede contener letras, espacios y acentos.',
  organizacionMin: 'El nombre de la organización debe tener al menos 2 caracteres.',
  organizacionMax: 'El nombre de la organización no puede exceder 100 caracteres.',
  emailInvalid: 'Ingresa un correo electrónico válido.',
  direccionMin: 'La dirección debe tener al menos 5 caracteres.',
  direccionMax: 'La dirección no puede exceder 100 caracteres.',
  telefonoMin: 'El número de teléfono debe tener al menos 7 dígitos.',
  telefonoInvalid: 'El teléfono solo puede contener números, espacios y caracteres especiales (+, -, ())',
  temaMin: 'El tema debe tener al menos 3 caracteres.',
  temaMax: 'El tema no puede exceder 100 caracteres.',
  mensajeMin: 'El mensaje debe tener al menos 10 caracteres.',
  mensajeMax: 'El mensaje no puede exceder 1000 caracteres.',
  politicaRequired: 'Debes aceptar la política de privacidad.',
};

// Mensajes de respuesta
export const RESPONSE_MESSAGES = {
  success: 'Gracias por contactarnos. Te responderemos pronto.',
  error: 'Hubo un error al enviar el formulario.',
  pdfLoadError: 'Error al cargar el PDF:',
};

// Tiempos
export const TIMEOUTS = {
  toastDuration: 5000,
};

// Patrones de validación
export const VALIDATION_PATTERNS = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  // Email más robusto
  emailStrict: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  // Solo números, espacios y caracteres especiales de teléfono
  telefono: /^[\d\s+\-()]+$/,
  // Nombre: letras, acentos, espacios
  nombre: /^[a-zA-ZáéíóúñÁÉÍÓÚÑ\s]*$/,
  // URL segura
  url: /^https?:\/\/.+/,
};
