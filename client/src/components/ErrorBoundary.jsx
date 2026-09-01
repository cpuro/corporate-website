import { Component } from 'react';
import logger from '../services/logger';

// Error boundary de aplicación. Sin esto, un fallo de render en cualquier
// componente (p. ej. react-pdf) desmonta todo el árbol y deja la página en
// blanco. Debe ser un componente de clase: React no ofrece equivalente en hooks.
export default class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    logger.error(`ErrorBoundary: ${error?.message || error}`, info?.componentStack);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      this.props.fallback ?? (
        <div
          role="alert"
          className="min-h-screen flex flex-col items-center justify-center gap-4 p-8 text-center font-poppins"
        >
          <h1 className="text-2xl font-semibold text-[#3E4095]">
            Algo ha ido mal
          </h1>
          <p className="text-gray-700 max-w-md">
            No se ha podido mostrar esta sección. Recarga la página o vuelve al
            inicio.
          </p>
          <a
            href="/"
            className="px-4 py-2 text-white bg-[#3E4095] rounded-lg hover:bg-[#F16139] transition"
          >
            Volver al inicio
          </a>
        </div>
      )
    );
  }
}
