import React from 'react';
import HeroSection from '../components/HeroSection';
import ServiceSectionService from '../components/ServiceSectionService';
import servicesHeroBgImage from '../assets/images/services-background.webp';
import SectionDivider from '../components/SectionDivider';

const Services = () => {
  return (
    <main aria-label="Servicios ofrecidos por la empresa">
      <HeroSection
        customTitle="SERVICIOS"
        customSubtitle="Servicios de la empresa."
        customImage={servicesHeroBgImage}
        isStatic={true}
      />
      <SectionDivider />
      <ServiceSectionService />
    </main>
  );
};

export default Services;
