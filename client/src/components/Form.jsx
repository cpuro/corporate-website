import React, { useState, useEffect } from 'react';
import BookUser from '../assets/icons/book-user.svg?react';
import TitlePrincipal from '../components/TitlePrincipal';
import {
  GOOGLE_FORM_URL,
  FORM_ENTRY_IDS,
  VALIDATION_MESSAGES,
  VALIDATION_PATTERNS,
  RESPONSE_MESSAGES,
  TIMEOUTS,
  DOCUMENT_URLS,
} from '../config/constants';
import logger from '../services/logger';
import sanitizer from '../services/sanitizer';

const formFields = [
  { name: 'nombre', label: 'Nombre completo', type: 'text' },
  { name: 'nombreOrganizacion', label: 'Nombre de la organización o empresa', type: 'text' },
  { name: 'correoElectronico', label: 'Correo electrónico', type: 'email' },
  { name: 'direccion', label: 'Dirección', type: 'text' },
  { name: 'numeroTelefono', label: 'Teléfono', type: 'tel' },
  { name: 'tema', label: 'Tema de interés', type: 'text' },
];

const Form = () => {
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

    // Validar nombre
    if (formData.nombre.trim().length < 2) {
      newErrors.nombre = VALIDATION_MESSAGES.nombreMin;
    } else if (formData.nombre.trim().length > 50) {
      newErrors.nombre = VALIDATION_MESSAGES.nombreMax;
    } else if (!VALIDATION_PATTERNS.nombre.test(formData.nombre)) {
      newErrors.nombre = VALIDATION_MESSAGES.nombreInvalid;
    }

    // Validar nombre de organización
    if (formData.nombreOrganizacion.trim().length < 2) {
      newErrors.nombreOrganizacion = VALIDATION_MESSAGES.organizacionMin;
    } else if (formData.nombreOrganizacion.trim().length > 100) {
      newErrors.nombreOrganizacion = VALIDATION_MESSAGES.organizacionMax;
    }

    // Validar email
    if (!VALIDATION_PATTERNS.emailStrict.test(formData.correoElectronico)) {
      newErrors.correoElectronico = VALIDATION_MESSAGES.emailInvalid;
    }

    // Validar dirección
    if (formData.direccion.trim().length < 5) {
      newErrors.direccion = VALIDATION_MESSAGES.direccionMin;
    } else if (formData.direccion.trim().length > 100) {
      newErrors.direccion = VALIDATION_MESSAGES.direccionMax;
    }

    // Validar teléfono
    const phoneDigits = formData.numeroTelefono.replace(/\D/g, '');
    if (phoneDigits.length < 7) {
      newErrors.numeroTelefono = VALIDATION_MESSAGES.telefonoMin;
    } else if (!VALIDATION_PATTERNS.telefono.test(formData.numeroTelefono)) {
      newErrors.numeroTelefono = VALIDATION_MESSAGES.telefonoInvalid;
    }

    // Validar tema
    if (formData.tema.trim().length > 0 && formData.tema.trim().length < 3) {
      newErrors.tema = VALIDATION_MESSAGES.temaMin;
    } else if (formData.tema.trim().length > 100) {
      newErrors.tema = VALIDATION_MESSAGES.temaMax;
    }

    // Validar mensaje
    if (formData.mensaje.trim().length < 10) {
      newErrors.mensaje = VALIDATION_MESSAGES.mensajeMin;
    } else if (formData.mensaje.trim().length > 1000) {
      newErrors.mensaje = VALIDATION_MESSAGES.mensajeMax;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    if (!formData.politica) {
      setToast({ show: true, success: false, message: VALIDATION_MESSAGES.politicaRequired });
      return;
    }

    setSubmitting(true);
    
    // Sanitizar datos antes de enviar
    const sanitizedData = sanitizer.sanitizeFormData(formData);
    
    const formPayload = new FormData();
    formFields.forEach(field => {
      formPayload.append(FORM_ENTRY_IDS[field.name], sanitizedData[field.name]);
    });
    formPayload.append(FORM_ENTRY_IDS.mensaje, sanitizedData.mensaje);

    fetch(GOOGLE_FORM_URL, {
      method: 'POST',
      mode: 'no-cors',
      body: formPayload,
    })
      .then(() => {
        setToast({
          show: true,
          success: true,
          message: RESPONSE_MESSAGES.success,
        });
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
      })
      .catch((error) => {
        logger.error('Error al enviar el formulario:', error);
        setToast({ show: true, success: false, message: RESPONSE_MESSAGES.error });
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => setToast({ ...toast, show: false }), TIMEOUTS.toastDuration);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  return (
    <section className="py-4 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden w-full" role="region" aria-label="Formulario de contacto">
      <div className="relative z-10 max-w-6xl mx-auto bg-white p-4 sm:p-6 lg:p-8 border-4 rounded-xl shadow-2xl border-[#3E4095]">
        
        {toast.show && (
          <div
            aria-live="polite"
            className={`fixed top-5 right-5 px-4 py-3 rounded-lg shadow-lg text-white z-50 transition-all duration-300 ${
              toast.success ? 'bg-green-500' : 'bg-red-500'
            }`}
          >
            {toast.message}
          </div>
        )}

        <TitlePrincipal title="CONTÁCTANOS" Icon={BookUser} />

        <p className="text-black mt-4 mb-6 font-poppins text-base sm:text-lg text-center max-w-3xl mx-auto px-2">
          ¿Tienes preguntas, necesitas más información o deseas contratar nuestros servicios? Rellena el siguiente formulario y nos pondremos en contacto contigo.
        </p>

        <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto space-y-5 bg-white border-4 border-[#3E4095] rounded-xl shadow-lg px-4 sm:px-6 lg:px-10 py-8">
          {formFields.map(({ name, label, type }) => (
            <div key={name}>
              <label htmlFor={name} className="block text-black font-poppins font-medium mb-1">{label}</label>
              <input
                id={name}
                name={name}
                type={type}
                value={formData[name]}
                onChange={handleChange}
                aria-describedby={errors[name] ? `${name}-error` : undefined}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#F16139]"
              />
              {errors[name] && <p id={`${name}-error`} className="text-sm text-red-600 mt-1" role="alert">{errors[name]}</p>}
            </div>
          ))}

          <div>
            <label htmlFor="mensaje" className="block text-black font-poppins font-medium mb-1">Mensaje</label>
            <textarea
              id="mensaje"
              name="mensaje"
              value={formData.mensaje}
              onChange={handleChange}
              rows={5}
              aria-describedby={errors.mensaje ? 'mensaje-error' : undefined}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#F16139]"
            ></textarea>
            {errors.mensaje && <p id="mensaje-error" className="text-sm text-red-600 mt-1" role="alert">{errors.mensaje}</p>}
          </div>

          <div className="flex items-start gap-2">
            <input
              id="politica"
              type="checkbox"
              name="politica"
              checked={formData.politica}
              onChange={handleChange}
              aria-describedby="politica-description"
              className="mt-1"
            />
            <label htmlFor="politica" id="politica-description" className="text-sm text-gray-700 text-left">
              Autorizo libre y voluntariamente a la Corporación Paso a Paso la recolección, almacenamiento,
              uso, transmisión y/o transferencia de los datos personales suministrados. Consulte nuestro{' '}
              <a href={DOCUMENT_URLS.privacyNotice} target="_blank" rel="noopener noreferrer" className="text-[#F16139] underline">
                Aviso de Privacidad
              </a>{' '}y acepte la{' '}
              <a href={DOCUMENT_URLS.privacyPolicy} target="_blank" rel="noopener noreferrer" className="text-[#F16139] underline">
                política de privacidad
              </a>.
            </label>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className={`w-full bg-[#3E4095] hover:bg-[#F16139] text-white font-poppins font-semibold py-2 px-6 rounded-lg transition ${
              submitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {submitting ? 'Enviando...' : 'Enviar mensaje'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Form;
