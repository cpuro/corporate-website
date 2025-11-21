import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import ChevronLeft from '../assets/icons/chevron-left.svg?react';
import ChevronRight from '../assets/icons/chevron-right.svg?react';

import img1 from "../assets/images/hero-background-primary.webp";
import img2 from "../assets/images/services-background.webp";
import img3 from "../assets/images/hero-background-secondary.webp";
import img4 from "../assets/images/hero-background-quaternary.webp";
import img5 from "../assets/images/hero-background-tertiary.webp";

const slides = [
  { image: img1, title: "CORPORACION PASO A PASO", link: "/nosotros" },
  { image: img2, title: "SERVICIOS", link: "/servicios" },
  { image: img3, title: "DOCUMENTACION LEGAL", link: "/regimen-tributario-especial" },
  { image: img4, title: "PROYECTOS", link: "/proyectos" },
  { image: img5, title: "CONTÁCTANOS", link: "/contacto" },
];

const ArrowButton = ({ onClick, direction }) => (
  <button
    onClick={onClick}
    aria-label={direction === "left" ? "Slide anterior" : "Slide siguiente"}
    className={`absolute top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-[#F16139] text-gray-800 hover:text-white p-3 rounded-full shadow-lg transition z-30 ${
      direction === "left" ? "left-4" : "right-4"
    }`}
    role="button"
    tabIndex={0}
  >
    {direction === "left" ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
  </button>
);

const Dots = ({ count, activeIndex, onChange }) => (
  <div className="absolute bottom-6 w-full flex justify-center space-x-2 z-30">
    {Array.from({ length: count }).map((_, idx) => (
      <button
        key={idx}
        onClick={() => onChange(idx)}
        aria-label={`Ir al slide ${idx + 1}`}
        className={`w-3 h-3 rounded-full transition ${
          activeIndex === idx ? "bg-[#F16139]" : "bg-gray-300"
        }`}
        role="button"
        tabIndex={0}
      />
    ))}
  </div>
);

const HeroSection = ({ customTitle, customSubtitle, customImage, isStatic = false }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedImage, setLoadedImage] = useState(customImage || img1);

  useEffect(() => {
    if (isStatic) {
      setLoadedImage(customImage || img1);
      return;
    }
    setLoadedImage(slides[currentIndex].image);
  }, [currentIndex, isStatic, customImage]);

  useEffect(() => {
    if (isStatic) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex, isStatic]);

  const currentSlide = slides[currentIndex];
  const title = isStatic ? customTitle : currentSlide.title;
  const link = isStatic ? "#" : currentSlide.link;
  const displayImage = isStatic ? (customImage || img1) : loadedImage;

  return (
    <section className="relative w-full h-[60vh] font-poppins font-bold overflow-hidden">
      <div className="w-full h-full">
        <AnimatePresence mode="wait">
          {currentIndex === 0 && !isStatic ? (
            <img
              key="static-lcp"
              src={img1}
              alt="CORPORACION PASO A PASO"
              width="1280"
              height="720"
              loading="eager"
              decoding="async"
              fetchpriority="high"
              className="w-full h-full object-cover object-center"
            />
          ) : (
            <motion.img
              key={displayImage}
              src={displayImage}
              alt={title}
              width="1280"
              height="720"
              loading={isStatic ? "eager" : "lazy"}
              decoding="async"
              fetchpriority={isStatic ? "high" : "low"}
              className="w-full h-full object-cover object-center"
            />
          )}
        </AnimatePresence>

        <div className="absolute inset-0 bg-black/40 z-10" />

        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center text-white px-6"
        >
          <h1 className="text-[40px] md:text-[60px] mb-4">{title}</h1>

          {isStatic && customSubtitle && (
            <p className="text-lg md:text-xl mb-6 max-w-2xl font-semibold">{customSubtitle}</p>
          )}

          {!isStatic && (
            <>
              <p className="text-lg md:text-xl mb-6 max-w-2xl font-semibold">
                Impulsamos el crecimiento con soluciones modernas y compromiso social.
              </p>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Link
                  to={link}
                  className="px-6 py-3 text-white font-extralight border border-white bg-[#3E4095] font-poppins rounded-lg hover:bg-[#F16139] transition"
                >
                  Saber Más
                </Link>
              </motion.div>
            </>
          )}
        </motion.div>

        {!isStatic && (
          <>
            <ArrowButton
              onClick={() => setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length)}
              direction="left"
            />
            <ArrowButton
              onClick={() => setCurrentIndex((prev) => (prev + 1) % slides.length)}
              direction="right"
            />
            <Dots count={slides.length} activeIndex={currentIndex} onChange={setCurrentIndex} />
          </>
        )}
      </div>
    </section>
  );
};

export default HeroSection;
