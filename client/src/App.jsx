import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import ScrollToTop from './components/ScrollToTop';
import Seo from './components/Seo';
import ErrorBoundary from './components/ErrorBoundary';

// Layout y páginas con carga diferida
const Layout = lazy(() => import('./components/Layout'));
const Home = lazy(() => import('./pages/Home'));
const AboutUs = lazy(() => import('./pages/AboutUs'));
const Services = lazy(() => import('./pages/Services'));
const Projects = lazy(() => import('./pages/Projects'));
const Taxregimen = lazy(() => import('./pages/Taxregimen'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./components/NotFound'));

// SEO por ruta. El <Seo> se renderiza junto al elemento de cada Route: así la
// ruta /regimen-tributario-especial también recibe metadatos sin tener que
// tocar Taxregimen.jsx.
function App() {
  return (
    <>
      <ScrollToTop />

      <ErrorBoundary>
        <Suspense fallback={<div />}>
          <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              index
              element={
                <>
                  <Seo
                    path="/"
                    description="Corporación Paso a Paso: entidad sin ánimo de lucro que transforma la realidad social y económica de Barrancabermeja y el Magdalena Medio, Colombia."
                  />
                  <Home />
                </>
              }
            />
            <Route
              path="nosotros"
              element={
                <>
                  <Seo
                    title="Nosotros"
                    path="/nosotros"
                    description="Historia, objeto social, misión y visión de la Corporación Paso a Paso, entidad sin ánimo de lucro constituida en 2004 en Barrancabermeja."
                  />
                  <AboutUs />
                </>
              }
            />
            <Route
              path="servicios"
              element={
                <>
                  <Seo
                    title="Servicios"
                    path="/servicios"
                    description="Servicios de la Corporación Paso a Paso: planificación, gestión y control de planes, programas y proyectos para el desarrollo social."
                  />
                  <Services />
                </>
              }
            />
            <Route
              path="proyectos"
              element={
                <>
                  <Seo
                    title="Proyectos"
                    path="/proyectos"
                    description="Proyectos sociales y comunitarios realizados por la Corporación Paso a Paso en Barrancabermeja y el Magdalena Medio."
                  />
                  <Projects />
                </>
              }
            />
            <Route
              path="regimen-tributario-especial"
              element={
                <>
                  <Seo
                    title="Documentación Legal"
                    path="/regimen-tributario-especial"
                    description="Documentación legal y del Régimen Tributario Especial (RTE) de la Corporación Paso a Paso, entidad sin ánimo de lucro."
                  />
                  <Taxregimen />
                </>
              }
            />
            <Route
              path="contacto"
              element={
                <>
                  <Seo
                    title="Contacto"
                    path="/contacto"
                    description="Contacta con la Corporación Paso a Paso en Barrancabermeja, Santander: formulario, teléfonos y ubicación en el mapa."
                  />
                  <Contact />
                </>
              }
            />
            <Route
              path="*"
              element={
                <>
                  <Seo title="Página no encontrada" description="La página que buscas no existe o ha sido movida." />
                  <NotFound />
                </>
              }
            />
          </Route>
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </>
  );
}

export default App;
