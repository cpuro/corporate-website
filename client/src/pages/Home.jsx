import { lazy, Suspense } from "react";
import LazySection from "../components/LazySection";
import SectionDivider from "../components/SectionDivider";

const HeroSection = lazy(() => import("../components/HeroSection"));

const fallback = (
  <div role="status" aria-live="polite">
    Cargando sección...
  </div>
);

const Home = () => {
  return (
    <main aria-label="Contenido principal de la página de inicio">
      <Suspense fallback={fallback}>
        <HeroSection />
      </Suspense>

      <LazySection importFunc={() => import("../components/Welcome")} fallback={fallback} />
      <SectionDivider />

      <LazySection importFunc={() => import("../components/ServiceSectionHome")} fallback={fallback} />
      <SectionDivider />

      <LazySection importFunc={() => import("../components/StrategicAllies")} fallback={fallback} />
      <SectionDivider />

      <LazySection importFunc={() => import("../components/FoundUs")} fallback={fallback} />
      <SectionDivider />

      <LazySection importFunc={() => import("../components/UsefulWebSites")} fallback={fallback} />
    </main>
  );
};

export default Home;
