// Servicio de sanitización para prevenir ataques XSS
const sanitizer = {
  /**
   * Sanitiza strings para prevenir inyección de HTML/JavaScript
   * @param {string} input - String a sanitizar
   * @returns {string} - String sanitizado
   */
  sanitizeInput: (input) => {
    if (typeof input !== 'string') return '';
    
    // Trimear primero
    let trimmed = input.trim();
    
    // Escapar caracteres HTML
    const element = document.createElement('div');
    element.textContent = trimmed;
    return element.innerHTML;
  },

  /**
   * Limpia espacios en blanco innecesarios
   * @param {string} input - String a limpiar
   * @returns {string} - String limpiado
   */
  trim: (input) => {
    if (typeof input !== 'string') return '';
    return input.trim().replace(/\s+/g, ' ');
  },

  /**
   * Valida y sanitiza un email
   * @param {string} email - Email a sanitizar
   * @returns {string} - Email sanitizado
   */
  sanitizeEmail: (email) => {
    if (typeof email !== 'string') return '';
    let trimmed = email.trim();
    const element = document.createElement('div');
    element.textContent = trimmed;
    return element.innerHTML.toLowerCase();
  },

  /**
   * Sanitiza múltiples campos de formulario (incluyendo objetos y arrays anidados)
   * @param {object} formData - Datos del formulario
   * @returns {object} - Datos sanitizados
   */
  sanitizeFormData: (formData) => {
    if (!formData || typeof formData !== 'object') return {};
    
    const sanitize = (value) => {
      if (typeof value === 'string') {
        return sanitizer.sanitizeInput(value);
      } else if (Array.isArray(value)) {
        return value.map(item => sanitize(item));
      } else if (value !== null && typeof value === 'object') {
        return sanitizer.sanitizeFormData(value);
      } else if (typeof value === 'boolean') {
        return value;
      } else {
        return value;
      }
    };
    
    const sanitized = {};
    Object.keys(formData).forEach(key => {
      sanitized[key] = sanitize(formData[key]);
    });
    
    return sanitized;
  },
};

export default sanitizer;
