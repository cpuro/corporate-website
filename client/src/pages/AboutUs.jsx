
import FolderClock  from '../assets/icons/folder-clock.svg?react';
import UserPen   from '../assets/icons/user-pen.svg?react';
import HeroSection from '../components/HeroSection';
import VisionMision from '../components/VisionMision';
import InfoSection from '../components/InfoSection';
import SectionDivider from '../components/SectionDivider';
import aboutUsHeroImage from '../assets/images/about-us-hero.webp';
import historicalImage from '../assets/images/hero-background-tertiary.webp';
import socialImage from '../assets/images/hero-background-secondary.webp';
import organizationImage from '../assets/images/hero-background-quaternary.webp';
import objectiveImage from '../assets/images/hero-background-primary.webp';

const AboutUs = () => {
  return (
    <main aria-label="Información acerca de la Corporación Paso a Paso">
      <HeroSection
        customTitle="ACERCA DE NOSOTROS"
        customSubtitle="Corporación Paso a Paso."
        customImage={aboutUsHeroImage}
        isStatic={true}
      />

      <SectionDivider />

      <section
      className="relative overflow-hidden"
      aria-labelledby="reseña histórica"
      id="reseña histórica"
      >
        <InfoSection
          icon={FolderClock}
          title={<>RESEÑA HISTÓRICA</>}
          text="La Corporación Paso a Paso es una entidad sin ánimo de lucro organizada bajo las leyes colombianas que se constituyó el 8 de marzo de 2004 en Barrancabermeja a partir de la iniciativa de un grupo de profesionales de las ciencias económicas y administrativas con sensibilidad y compromiso en la transformación de la realidad social y económica de Barrancabermeja y el Magdalena Medio."
          images={[historicalImage, socialImage]}
        />
      </section>

      <SectionDivider />

      <section
      className="relative overflow-hidden"
      aria-labelledby="objeto social"
      id="reseña historica"
      >
        <InfoSection
          icon={UserPen}
          title={<>OBJETO SOCIAL</>}
          text="La Corporación Paso a Paso tiene como objeto social la planificación, gestión y control de planes, programas y proyectos, que contribuyan al mejoramiento de la calidad de vida de las comunidades."
          images={[objectiveImage, organizationImage]}
        />
      </section>

      <SectionDivider />
      <VisionMision />
    </main>
  );
};

export default AboutUs;
