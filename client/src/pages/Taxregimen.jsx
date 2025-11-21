import HeroSection from '../components/HeroSection';
import ListTaxRegimen  from '../components/ListTaxRegimen';
import heroBgImage from "../assets/images/hero-background-primary.webp";
import SectionDivider from '../components/SectionDivider';

const desarrollado = [
  {
    title: "DOCUMENTOS RTE 2025",
    subtitle: "Ver documentos pertenecientes al Régimen Especial del año 2025, clic para descargar",
    pdfUrl: "/zips/Documentos-RTE-2025.zip",
  },
  {
    title: "DOCUMENTOS RTE 2024",
    subtitle: "Ver documentos pertenecientes al Régimen Especial del año 2024, clic para descargar",
    pdfUrl: "/zips/Documentos-RTE-2024.zip",
  },
    {
    title: "DOCUMENTOS RTE 2023",
    subtitle: "Ver documentos pertenecientes al Régimen Especial del año 2023, clic para descargar",
    pdfUrl: "/zips/Documentos-RTE-2023.zip",
  },
  {
    title: "DOCUMENTOS RTE 2022",
    subtitle: "Ver documentos pertenecientes al Régimen Especial del año 2022, clic para descargar",
    pdfUrl: "/zips/Documentos-RTE-2022.zip",
  },

  {
    title: "DOCUMENTOS RTE 2021",
    subtitle: "Ver documentos pertenecientes al Régimen Especial del año 2021, clic para descargar",
    pdfUrl: "/zips/Documentos-RTE-2021.zip", 
  },
  {
    title: "DOCUMENTOS RTE 2020",
    subtitle: "Ver documentos pertenecientes al Régimen Especial del año 2020, clic para descargar",
    pdfUrl: "/zips/Documentos-RTE-2020.zip", 
  },
  {
    title: "DOCUMENTOS RTE 2019",
    subtitle: "Ver documentos pertenecientes al Régimen Especial del año 2019, clic para descargar",
    pdfUrl: "/zips/Documentos-RTE-2019.zip", 
  },
  {
    title: "DOCUMENTOS RTE 2018",
    subtitle: "Ver documentos pertenecientes al Régimen Especial del año 2018, clic para descargar",
    pdfUrl: "/zips/Documentos-RTE-2018.zip",
  },
];



const Taxregimen = () => {
  return (
      <main aria-label="Documentación regímenes tributarios">
      <HeroSection
      customTitle="REGÍMENES TRIBUTARIOS"
      customSubtitle="Documentación y requisitos para acceder al régimen especial"
      customImage={heroBgImage}
      isStatic={true}
      />
      <SectionDivider />
      
      <ListTaxRegimen title="DOCUMENTOS RTE 2018-2024" items={desarrollado}/>
    </main>
  );
};

export default Taxregimen;
