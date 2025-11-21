import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import ScrollToTop from './components/ScrollToTop';

// Layout y páginas con carga diferida
const Layout = lazy(() => import('./components/Layout'));
const Home = lazy(() => import('./pages/Home'));
const AboutUs = lazy(() => import('./pages/AboutUs'));
const Services = lazy(() => import('./pages/Services'));
const Projects = lazy(() => import('./pages/Projects'));
const Taxregimen = lazy(() => import('./pages/Taxregimen'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./components/NotFound'));

function App() {
  return (
    <>
      <ScrollToTop />

      <Suspense fallback={<div />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="nosotros" element={<AboutUs />} />
            <Route path="servicios" element={<Services />} />
            <Route path="proyectos" element={<Projects />} />
            <Route path="regimen-tributario-especial" element={<Taxregimen />} />
            <Route path="contacto" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
