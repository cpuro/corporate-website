import ProjectsRealize from '../components/ProjectsRealize';
import LatestProject from '../components/LatestProject';
import projectsHeroBgImage from '../assets/images/projects-completed-1.webp';
import SectionDivider from '../components/SectionDivider';
import PdfViewer from '../components/PdfViewer';

import { lazy, Suspense } from 'react';
const VideoSection = lazy(() => import('../components/VideoSection'));
const HeroSection = lazy(() => import('../components/HeroSection'));

const Projects = () => {
  return (
    <main aria-label="Proyectos desarrollados por la organización">
      <Suspense fallback={<div>Cargando sección...</div>}>
      <HeroSection
        customTitle="PROYECTOS REALIZADOS"
        customSubtitle="¡Algunas de nuestras experiencias!"
        customImage={projectsHeroBgImage}
        isStatic={true}
      />
      </Suspense>
      <SectionDivider />
      <LatestProject />
      <SectionDivider />
      <ProjectsRealize />
      <SectionDivider />
      <Suspense fallback={<div>Cargando sección...</div>}>
      <VideoSection />
      </Suspense>
      <SectionDivider />
      <PdfViewer pdfFiles={['/documents/cartilla-construccion-ciudadana.pdf', '/documents/cartilla-diagnostico.pdf', '/documents/cartilla-zonas-verdes.pdf', '/documents/desarrollo-territorial-proceda.pdf', '/documents/plan-de-desarrollo-turistico-yondo.pdf', '/documents/plan-de-desarrollo-san-pablo-mejor-2024-2027.pdf', '/documents/plan-de-desarrollo-vigencia-2016-2019-municipio-de-yondo.pdf']} />
    
    </main>
  );
};

export default Projects;
  