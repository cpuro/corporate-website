import { useState, useRef } from "react";
import ChevronLeft from '../assets/icons/chevron-left.svg?react';
import ChevronRight from '../assets/icons/chevron-right.svg?react';
import TitlePrincipal from '../components/TitlePrincipal';
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

import Youtube from '../assets/icons/youtube.svg?react';
const videos = [
    {
    type: "local",
    src: "/videos/video-proceda.mp4",
    description: "Proyecto Ciudadano y Comunitario de Educación Ambiental PROCEDA.",
  },
  {
    type: "youtube",
    src: "https://www.youtube.com/embed/afvWwYwqtZw?si=RDQjsBFAOChVXk5u",
    description: "Paso a paso se hizo realidad un sueño​ empresarial.",
  },
  {
    type: "youtube",
    src: "https://www.youtube.com/embed/Kq01S21T2L0?si=quEMXXhcpkJtUE4x",
    description: "100 días de acciones y oportunidad para todos.",
  },
];

export default function VideoCarousel() {
  const [current, setCurrent] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const videoRef = useRef(null);

  const next = () => {
    setCurrent((current + 1) % videos.length);
  };

  const prev = () => {
    setCurrent((current - 1 + videos.length) % videos.length);
  };

  return (
    <section
      className="py-8 px-4 text-center relative"
      role="region"
      aria-label="Sección de videos"
      aria-live="polite"
      aria-atomic="false"
    >
        {/* Contenido principal */}
        <div className="relative z-10 max-w-6xl mx-auto bg-white p-4 border-4 rounded-2xl shadow-2xl border-[#3E4095]"> 
        {/* Título principal + icono */}
        <TitlePrincipal title="VIDEOS" Icon={Youtube}/>

            <div className="relative w-full max-w-full md:max-w-3xl mx-auto">
              {/* Descripción accesible */}

              <p className="mt-4 text-center text-gray-800 text-base md:text-lg font-poppins">
                {videos[current].description}
              </p>
              <p className="sr-only" aria-live="polite">
                Mostrando: {videos[current].description}
              </p>

             {/* Dots indicadores */}
              <div className="flex justify-center gap-2 mt-6 mb-4">
                {videos.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrent(idx)}
                    aria-label={`Ver video ${idx + 1}`}
                    className={`w-3 h-3 rounded-full transition-all duration-200 ${
                      current === idx ? "bg-[#F16139] scale-110" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
              
            {/* Carrusel de video */}
              <motion.div
                key={current}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="aspect-video w-full rounded-xl border-4 border-[#3E4095]"
              >
                {videos[current].type === "youtube" ? (
                  <iframe
                    src={videos[current].src}
                    title={`Video ${current + 1}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    referrerPolicy="strict-origin-when-cross-origin"
                    className="w-full h-full rounded-lg shadow-lg "
                  />
                ) : (
                  <video
                    ref={videoRef}
                    controls
                    title={`Video ${current + 1}`}
                    className="rounded-md shadow-lg"
                    onError={() => alert("No se pudo cargar el video.")}
                  >
                    <source src={videos[current].src} type="video/mp4" />
                    Tu navegador no soporta la etiqueta de video.
                  </video>
                )}
              </motion.div>

              {/* Botones navegación */}
              <button
                onClick={prev}
                aria-label="Video anterior"
                className="absolute top-1/2 left-1 transform -translate-y-1/2 z-10 bg-white/90 p-1.5 sm:p-2 rounded-full shadow hover:bg-white transition"
              >
                <ChevronLeft className="text-[#3E4095] w-6 h-6" />
              </button>
              <button
                onClick={next}
                aria-label="Siguiente video"
                className="absolute top-1/2 right-1 transform -translate-y-1/2 z-10 bg-white/90 p-1.5 sm:p-2 rounded-full shadow hover:bg-white transition"
              >
                <ChevronRight className="text-[#3E4095] w-6 h-6" />
              </button>


            </div>
          </div>
    </section>
  );
}
