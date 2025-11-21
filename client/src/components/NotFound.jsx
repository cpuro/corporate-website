import { Link } from 'react-router-dom';
import { FaExclamationTriangle } from 'react-icons/fa';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center bg-white px-4">
      <FaExclamationTriangle className="text-blue-500 text-6xl animate-bounce mb-6" />

      <h1 className="text-6xl font-extrabold text-blue-600 mb-4">404</h1>
      <p className="text-2xl text-gray-700 mb-2">Página no encontrada</p>
      <p className="text-gray-500 mb-6">
        Lo sentimos, no pudimos encontrar la página que estás buscando.
      </p>

      <Link
        to="/"
        className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition duration-300"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
