import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

import ChevronLeft from "@/assets/icons/chevron-left.svg?react";
import ChevronRight from "@/assets/icons/chevron-right.svg?react";
import Youtube from "@/assets/icons/youtube.svg?react";

import TitlePrincipal from "@/components/TitlePrincipal";

const videos = [
  {
    type: "local",
    src: "/videos/video-proceda.mp4",
    description: "Proyecto Ciudadano y Comunitario de Educación Ambiental PROCEDA.",
  },
  {
    type: "youtube",
    src: "https://www.youtube.com/embed/afvWwYwqtZw?si=RDQjsBFAOChVXk5u",
    description: "Paso a paso se hizo realidad un sueño empresarial.",
  },
  {
    type: "youtube",
    src: "https://www.youtube.com/embed/Kq01S21T2L0?si=quEMXXhcpkJtUE4x",
    description: "100 días de acciones y oportunidad para todos.",
  },
];

export default function VideoCarousel() {
  const [current, setCurrent] = useState(0);
  const videoRef = useRef(null);

  const next = () => {
    setCurrent((prev) => (prev + 1) % videos.length);
  };

  const prev = () => {
    setCurrent((prev) => (prev - 1 + videos.length) % videos.length);
  };

  // Pausa video local al cambiar
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [current]);

  const currentVideo = videos[current];

  return (
    <section
      className="py-8 px-4 text-center relative"
      aria-label="Sección de videos"
    >
      <div className="relative z-10 max-w-6xl mx-auto bg-white p-4 border-4 rounded-2xl shadow-2xl border-primary">
        <TitlePrincipal title="VIDEOS" Icon={Youtube} />

        <div className="relative w-full md:max-w-3xl mx-auto">
          <p className="mt-4 text-center text-gray-800 text-base md:text-lg font-poppins">
            {currentVideo.description}
          </p>

          <p className="sr-only" aria-live="polite">
            Mostrando: {currentVideo.description}
          </p>

          {/* Indicadores */}
          <div className="flex justify-center gap-2 mt-6 mb-4">
            {videos.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                aria-label={`Ver video ${idx + 1}`}
                aria-current={current === idx}
                className={`w-3 h-3 rounded-full transition-all ${
                  current === idx
                    ? "bg-[#F16139] scale-110"
                    : "bg-gray-300"
                }`}
              />
            ))}
          </div>

          {/* Video */}
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="aspect-video w-full rounded-xl border-4 border-primary"
          >
            {currentVideo.type === "youtube" ? (
              <iframe
                src={currentVideo.src}
                title={`Video ${current + 1}`}
                className="w-full h-full rounded-lg shadow-lg"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            ) : (
              // PENDIENTE DE CONTENIDO: falta un archivo de subtítulos (.vtt)
              // para el vídeo local; requiere la transcripción real, que debe
              // aportar el cliente. Añadir <track kind="captions" src=...
              // srclang="es"> cuando exista y quitar el disable de abajo.
              // eslint-disable-next-line jsx-a11y/media-has-caption
              <video
                ref={videoRef}
                controls
                className="w-full h-full rounded-lg shadow-lg"
              >
                <source src={currentVideo.src} type="video/mp4" />
                Tu navegador no soporta la etiqueta de video.
              </video>
            )}
          </motion.div>

          {/* Navegación */}
          <button
            onClick={prev}
            aria-label="Video anterior"
            className="absolute top-1/2 left-1 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow hover:bg-white transition"
          >
            <ChevronLeft className="w-6 h-6 text-primary" />
          </button>

          <button
            onClick={next}
            aria-label="Siguiente video"
            className="absolute top-1/2 right-1 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow hover:bg-white transition"
          >
            <ChevronRight className="w-6 h-6 text-primary" />
          </button>
        </div>
      </div>
    </section>
  );
}
