import { Link } from 'react-router-dom';
import { FaExclamationTriangle } from 'react-icons/fa';

export default function NotFound() {
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center
                text-center bg-white px-4"
      role="alert"
      aria-live="assertive"
    >
      <FaExclamationTriangle
        className="text-blue-500 text-6xl animate-bounce mb-6"
        aria-hidden="true"
      />

      <span className="text-6xl font-extrabold text-blue-600 mb-2">
        404
      </span>

      <h1 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-2">
        Página no encontrada
      </h1>

      <p className="text-gray-500 mb-6 max-w-md">
        Lo sentimos, no pudimos encontrar la página que estás buscando.
        Es posible que la URL sea incorrecta o que el contenido ya no exista.
      </p>

      <Link
        to="/"
        className="bg-blue-600 text-white px-6 py-3 rounded-xl
                  hover:bg-blue-700 transition duration-300
                  focus-visible:outline focus-visible:outline-2
                  focus-visible:outline-blue-600"
      >
        Volver al inicio
      </Link>
    </main>
  );
}
