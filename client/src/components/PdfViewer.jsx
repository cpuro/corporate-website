import { useState, useRef, useEffect } from 'react';
import TitlePrincipal from '../components/TitlePrincipal';
import SectionCard from '../components/SectionCard';
import { HiDocumentSearch } from "react-icons/hi";
import { Document, Page, pdfjs } from 'react-pdf';
import logger from '../services/logger';

// Worker de PDF.js. `new URL(<pkg>, import.meta.url)` es el patrón que resuelven
// tanto Vite (dev: lo sirve por su pipeline; build: lo emite como asset con
// hash) como react-pdf 9. El `?url` sobre el .mjs de node_modules funcionaba en
// build pero en dev dejaba el worker sin arrancar (TypeError sendWithPromise).
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

const PdfViewer = ({ pdfFiles }) => {
  const [currentPdfIndex, setCurrentPdfIndex] = useState(0);
  const [numPages, setNumPages] = useState(null);
  const [containerWidth, setContainerWidth] = useState(800);
  const [pdfLoaded, setPdfLoaded] = useState(false);
  const [pdfError, setPdfError] = useState(null);
  const [pdfData, setPdfData] = useState(null);
  const containerRef = useRef(null);

  // Cargar PDF como blob
  useEffect(() => {
    const loadPdf = async () => {
      try {
        setPdfLoaded(false);
        setPdfError(null);
        setPdfData(null);
        
        const response = await fetch(pdfFiles[currentPdfIndex]);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const blob = await response.blob();
        setPdfData(blob);
      } catch (error) {
        logger.error('Error fetching PDF:', error);
        setPdfError(error.message || 'Error al cargar el PDF');
        setPdfLoaded(false);
      }
    };

    if (pdfFiles[currentPdfIndex]) {
      loadPdf();
    }
  }, [currentPdfIndex, pdfFiles]);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        setContainerWidth(Math.min(width - 32, 800));
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPdfLoaded(true);
  };

  const onDocumentLoadError = (error) => {
    logger.error('Error al cargar el PDF:', error);
    setPdfError(error.message || 'Error al cargar el PDF');
    setPdfLoaded(false);
  };

  const goToPrevious = () => {
    if (currentPdfIndex > 0) {
      setNumPages(null);
      setPdfLoaded(false);
      setPdfError(null);
      setPdfData(null);
      setCurrentPdfIndex((prev) => prev - 1);
    }
  };

  const goToNext = () => {
    if (currentPdfIndex < pdfFiles.length - 1) {
      setNumPages(null);
      setPdfLoaded(false);
      setPdfError(null);
      setPdfData(null);
      setCurrentPdfIndex((prev) => prev + 1);
    }
  };

  return (
    <section
      className="py-8 px-4 text-center relative"
      aria-label="Sección de documentos PDF y proyectos"
    >
      <SectionCard>
        <TitlePrincipal
          title="Explora los proyectos, planes y cartillas de la Corporación."
          Icon={HiDocumentSearch}
        />

        <div className="flex justify-center gap-4 mb-4">
          <button
            onClick={goToPrevious}
            disabled={currentPdfIndex === 0 || !pdfLoaded}
            aria-label="Documento anterior"
            className={`w-full sm:w-auto px-4 py-2 text-sm sm:text-base text-white border border-white font-poppins rounded-lg transition text-center ${
              currentPdfIndex === 0 || !pdfLoaded
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-primary hover:bg-[#F16139]"
            }`}
          >
            Anterior
          </button>
          <button
            onClick={goToNext}
            disabled={currentPdfIndex === pdfFiles.length - 1 || !pdfLoaded}
            aria-label="Siguiente documento"
            className={`w-full sm:w-auto px-4 py-2 text-sm sm:text-base text-white border border-white font-poppins rounded-lg transition text-center ${
              currentPdfIndex === pdfFiles.length - 1 || !pdfLoaded
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-primary hover:bg-[#F16139]"
            }`}
          >
            Siguiente
          </button>
        </div>

        <div
          ref={containerRef}
          className="shadow-md p-1 rounded-lg w-full mx-auto overflow-hidden"
        >
          <div className="overflow-y-auto h-[600px] pr-4 bg-white/50 p-4 rounded-xl shadow-2xl border-4 border-primary">
            {pdfError && (
              <div className="text-center text-red-500 font-poppins my-8">
                Error: {pdfError}
              </div>
            )}
            
            {!pdfLoaded && !pdfError && (
              <div className="text-center text-gray-500 font-poppins my-8">
                Cargando documento...
              </div>
            )}

            {pdfFiles[currentPdfIndex] && pdfData && (
              <Document
                file={pdfData}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={onDocumentLoadError}
                loading="Cargando PDF..."
              >
                {numPages && Array.from(new Array(numPages), (_, index) => (
                  <div
                    key={`page_${index + 1}`}
                    className="mb-6 flex justify-center"
                  >
                    <Page
                      pageNumber={index + 1}
                      width={containerWidth}
                      renderTextLayer={false}
                      renderAnnotationLayer={false}
                    />
                  </div>
                ))}
              </Document>
            )}
          </div>
        </div>
      </SectionCard>
    </section>
  );
};

export default PdfViewer;
