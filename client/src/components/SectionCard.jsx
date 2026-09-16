// Tarjeta blanca con borde de marca usada como contenedor principal de las
// secciones de home/páginas (LatestProject, ProjectsRealize, PdfViewer, ...).

const SectionCard = ({ children }) => (
  <div className="relative z-10 max-w-6xl mx-auto bg-white p-4 border-4 rounded-xl shadow-2xl border-primary">
    {children}
  </div>
);

export default SectionCard;
