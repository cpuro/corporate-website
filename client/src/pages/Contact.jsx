import HeroSection from '../components/HeroSection';
import contactHeroBgImage from '../assets/images/hero-background-primary.webp';
import SectionDivider from '../components/SectionDivider';

import { lazy, Suspense } from 'react';
const FoundUs = lazy(() => import('../components/FoundUs'));
const Form = lazy(() => import('../components/Form'));

const Contact = () => {
  return (
      <main aria-label="Documentación regímenes tributarios">
      <Suspense fallback={<div>Cargando sección...</div>}>
      <HeroSection
        customTitle="CONTÁCTANOS"
        customSubtitle="Será un gusto atenderte."
        customImage={contactHeroBgImage}
        isStatic={true}
      />    
      </Suspense>/
      <SectionDivider />
      
      <Suspense fallback={<div>Cargando sección...</div>}>
      <Form />
      </Suspense>/
      <SectionDivider />


      <Suspense fallback={<div>Cargando sección...</div>}>
      <FoundUs showButton={false} />
      </Suspense>/

  
    </main>
  );
};

export default Contact;
