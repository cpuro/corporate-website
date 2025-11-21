import LazySection from "../components/LazySection";
import { Suspense, lazy } from "react";
const HeroSection = lazy(() => import("../components/HeroSection"));
const SectionDivider = lazy(() => import("../components/SectionDivider"));

const Home = () => {
  return (
    <main aria-label="Contenido principal de la página de inicio">
      <Suspense fallback={<div>Cargando sección...</div>}>
        <HeroSection />
      </Suspense>

      <LazySection importFunc={() => import("../components/Welcome")} fallback={<div>Cargando sección...</div>} />
      <SectionDivider />

      <LazySection importFunc={() => import("../components/ServiceSectionHome")} fallback={<div>Cargando sección...</div>} />
      <SectionDivider />

      <LazySection importFunc={() => import("../components/StrategicAllies")} fallback={<div>Cargando sección...</div>} />
      <SectionDivider />

      <LazySection importFunc={() => import("../components/FoundUs")} fallback={<div>Cargando sección...</div>} />
      <SectionDivider />

      <LazySection importFunc={() => import("../components/UsefulWebSites")} fallback={<div>Cargando sección...</div>} />
    </main>
  );
};

export default Home;
