import BookUser from '../assets/icons/book-user.svg?react';
import TitlePrincipal from '../components/TitlePrincipal';
import { useContactForm } from '../hooks/useContactForm';
import { DOCUMENT_URLS } from '../config/constants';

const formFields = [
  { name: 'nombre', label: 'Nombre completo', type: 'text' },
  { name: 'nombreOrganizacion', label: 'Nombre de la organización o empresa', type: 'text' },
  { name: 'correoElectronico', label: 'Correo electrónico', type: 'email' },
  { name: 'direccion', label: 'Dirección', type: 'text' },
  { name: 'numeroTelefono', label: 'Teléfono', type: 'tel' },
  { name: 'tema', label: 'Tema de interés', type: 'text' },
];

const Form = () => {
  const {
    formData,
    errors,
    submitting,
    toast,
    handleChange,
    handleSubmit,
  } = useContactForm();

  return (
    <section
      className="py-4 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden w-full"
      aria-label="Formulario de contacto"
    >
      <div className="relative z-10 max-w-6xl mx-auto bg-white p-4 sm:p-6 lg:p-8 border-4 rounded-xl shadow-2xl border-primary">

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

        <p className="text-black mt-4 mb-6 font-poppins text-base sm:text-lg text-justify max-w-3xl mx-auto px-2">
          ¿Tienes preguntas, necesitas más información o deseas contratar nuestros servicios?
          Rellena el siguiente formulario y nos pondremos en contacto contigo.
        </p>

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-3xl mx-auto space-y-5 bg-white border-4 border-primary rounded-xl shadow-lg px-4 sm:px-6 lg:px-10 py-8"
        >
          {formFields.map(({ name, label, type }) => (
            <div key={name}>
              <label
                htmlFor={name}
                className="block text-black font-poppins font-medium mb-1"
              >
                {label}
              </label>

              <input
                id={name}
                name={name}
                type={type}
                value={formData[name]}
                onChange={handleChange}
                aria-label={label}
                aria-describedby={errors[name] ? `${name}-error` : undefined}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2
                           focus:outline-none focus:ring-2 focus:ring-[#F16139]"
              />

              {errors[name] && (
                <p
                  id={`${name}-error`}
                  className="text-sm text-red-600 mt-1"
                  role="alert"
                >
                  {errors[name]}
                </p>
              )}
            </div>
          ))}

          <div>
            <label
              htmlFor="mensaje"
              className="block text-black font-poppins font-medium mb-1"
            >
              Mensaje
            </label>

            <textarea
              id="mensaje"
              name="mensaje"
              value={formData.mensaje}
              onChange={handleChange}
              rows={5}
              aria-label="Mensaje"
              aria-describedby={errors.mensaje ? 'mensaje-error' : undefined}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2
                         focus:outline-none focus:ring-2 focus:ring-[#F16139]"
            />

            {errors.mensaje && (
              <p
                id="mensaje-error"
                className="text-sm text-red-600 mt-1"
                role="alert"
              >
                {errors.mensaje}
              </p>
            )}
          </div>

          <div className="flex items-start gap-2">
            <input
              id="politica"
              type="checkbox"
              name="politica"
              checked={formData.politica}
              onChange={handleChange}
              aria-label="Autorizo el tratamiento de mis datos personales"
              className="mt-1"
            />

            <label
              htmlFor="politica"
              className="text-sm text-gray-700 text-left"
            >
              Autorizo libre y voluntariamente la recolección y uso de mis datos
              personales. Consulta nuestro{' '}
              <a
                href={DOCUMENT_URLS.privacyNotice}
                download
                className="text-[#F16139] underline"
                aria-label={`Descargar ${DOCUMENT_URLS.privacyNotice}`}
              >
                Aviso de Privacidad
              </a>{' '}
              y la{' '}
              <a
                href={DOCUMENT_URLS.privacyPolicy}
                download
                className="text-[#F16139] underline"
                aria-label={`Descargar ${DOCUMENT_URLS.privacyPolicy}`}
              >
                política de privacidad
              </a>.
            </label>
          </div>

          <button
            type="submit"
            disabled={submitting}
            aria-busy={submitting}
            aria-disabled={submitting}
            className={`w-full bg-primary hover:bg-[#F16139]
                        text-white font-poppins font-semibold
                        py-2 px-6 rounded-lg transition
                        ${submitting ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {submitting ? 'Enviando...' : 'Enviar mensaje'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Form;
