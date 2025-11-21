import { useState, useRef, useEffect, lazy, Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from "framer-motion";

// Componentes con carga diferida
const Navbar = lazy(() => import('./Navbar'));
const Footer = lazy(() => import('../components/Footer'));
const Header = lazy(() => import('../components/Header'));
const SectionDivider = lazy(() => import('../components/SectionDivider'));

export default function Layout() {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY < lastScrollY.current);
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden">
      <div id="background-container" className="absolute inset-0 -z-10" />

      {/* Header */}
      <Suspense fallback={<div />}>
        <Header isVisible={isVisible} />
      </Suspense>

      {/* Navbar */}
      <Suspense fallback={<div />}>
        <Navbar isVisible={isVisible} />
      </Suspense>

      {/* Contenido principal con animación de página */}
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          className="flex-grow relative z-10 pt-44"
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4 }}
          role="main"
          aria-label="Contenido principal"
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>

      {/* Separador */}
      <Suspense fallback={<div />}>
        <SectionDivider />
      </Suspense>

      {/* Footer */}
      <Suspense fallback={<div />}>
        <Footer />
      </Suspense>
    </div>
  );
}
