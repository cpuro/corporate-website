import { useState, useEffect } from 'react';
import {
  GOOGLE_FORM_URL,
  FORM_ENTRY_IDS,
  VALIDATION_MESSAGES,
  VALIDATION_PATTERNS,
  RESPONSE_MESSAGES,
  TIMEOUTS,
} from '../config/constants';
import logger from '../services/logger';
import sanitizer from '../services/sanitizer';

export function useContactForm() {
  const [formData, setFormData] = useState({
    nombre: '',
    nombreOrganizacion: '',
    correoElectronico: '',
    direccion: '',
    numeroTelefono: '',
    tema: '',
    mensaje: '',
    politica: false,
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState({ show: false, success: true, message: '' });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (formData.nombre.trim().length < 2) {
      newErrors.nombre = VALIDATION_MESSAGES.nombreMin;
    } else if (!VALIDATION_PATTERNS.nombre.test(formData.nombre)) {
      newErrors.nombre = VALIDATION_MESSAGES.nombreInvalid;
    }

    if (!VALIDATION_PATTERNS.emailStrict.test(formData.correoElectronico)) {
      newErrors.correoElectronico = VALIDATION_MESSAGES.emailInvalid;
    }

    if (formData.mensaje.trim().length < 10) {
      newErrors.mensaje = VALIDATION_MESSAGES.mensajeMin;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (!formData.politica) {
      setToast({ show: true, success: false, message: VALIDATION_MESSAGES.politicaRequired });
      return;
    }

    setSubmitting(true);

    try {
      const sanitizedData = sanitizer.sanitizeFormData(formData);
      const payload = new FormData();

      Object.keys(FORM_ENTRY_IDS).forEach(key => {
        payload.append(FORM_ENTRY_IDS[key], sanitizedData[key]);
      });

      await fetch(GOOGLE_FORM_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: payload,
      });

      setToast({ show: true, success: true, message: RESPONSE_MESSAGES.success });
      setFormData({
        nombre: '',
        nombreOrganizacion: '',
        correoElectronico: '',
        direccion: '',
        numeroTelefono: '',
        tema: '',
        mensaje: '',
        politica: false,
      });
    } catch (error) {
      logger.error('Error al enviar formulario', error);
      setToast({ show: true, success: false, message: RESPONSE_MESSAGES.error });
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (!toast.show) return;
    const timer = setTimeout(
      () => setToast(prev => ({ ...prev, show: false })),
      TIMEOUTS.toastDuration
    );
    return () => clearTimeout(timer);
  }, [toast.show]);

  return {
    formData,
    errors,
    submitting,
    toast,
    handleChange,
    handleSubmit,
  };
}
