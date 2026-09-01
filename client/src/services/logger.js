// Servicio de logging centralizado
const logger = {
  error: (message, error = null) => {
    console.error(`[ERROR] ${message}`, error || '');
  },

  warn: (message) => {
    console.warn(`[WARN] ${message}`);
  },

  info: (message) => {
    console.info(`[INFO] ${message}`);
  },

  debug: (message, data = null) => {
    if (import.meta.env.DEV) {
      console.debug(`[DEBUG] ${message}`, data || '');
    }
  },
};

export default logger;
