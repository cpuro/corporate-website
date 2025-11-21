import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import img1 from "../assets/images/hero-background-primary.webp";
import img2 from "../assets/images/hero-background-secondary.webp";
import img3 from "../assets/images/hero-background-tertiary.webp";
import TitlePrincipal from "../components/TitlePrincipal";
import Eye from '../assets/icons/eye.svg?react';
import Rocket from '../assets/icons/rocket.svg?react';

const images = [img1, img2, img3];

export default function VisionMision() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const variants = {
    initial: {
      rotateY: 90,
      opacity: 0,
      position: "absolute",
    },
    animate: {
      rotateY: 0,
      opacity: 1,
      position: "relative",
      transition: {
        duration: 3,
        ease: "easeInOut",
      },
    },
    exit: {
      rotateY: -90,
      opacity: 0,
      position: "absolute",
      transition: {
        duration:3,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section
      className="py-8 px-4 text-center relative"
      aria-labelledby="sección de información de visión y misión"
      role="article"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center w-full px-4 border-4 border-[#3E4095] relative z-10 max-w-6xl mx-auto bg-white p-4 rounded-md shadow-2xl">
        
        {/* Imagen circular con sombra inferior */}
        <div className="relative w-full h-[300px] md:h-[400px] lg:h-[450px]">
          {/* Imagen circular */}
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="relative w-full h-full flex items-center justify-center"
          >
            <img
              src={images[index]}
              alt="imagen circular"
              loading="lazy"
              decoding="async"
              fetchpriority="low"
              width="384"
              height="384"
              className="rounded-full w-64 h-64 sm:w-72 mt-6 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 object-cover mx-auto border-4 border-[#3E4095] transition-all duration-200 "
            />
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[70%] h-6 bg-black/60 rounded-full blur-md opacity-70" />
          </motion.div>
        </AnimatePresence>
        </div>

        {/* Texto */}
        <div className="text-black space-y-2 ">
          <div>
            <TitlePrincipal align="left" title="MISIÓN" Icon={Rocket} />
            <p className="bg-white mb-4 p-1 border-4 rounded-md border-[#3E4095] font-poppins text-base md:text-lg text-left md:text-justify">
              La Corporación Paso a Paso es una organización sin ánimo de lucro que tiene como misión la planeación, gestión y control de planes, programas y proyectos.
            </p>
          </div>
          <div>
            <TitlePrincipal align="left" title="VISIÓN" Icon={Eye} />
            <p className="bg-white p-1 border-4 rounded-md border-[#3E4095] font-poppins text-base md:text-lg text-left md:text-justify">
              La Corporación Paso a Paso será una organización líder con reconocimiento por la calidad, cumplimiento y confiabilidad en sus servicios prestados. Habrá contribuido al mejoramiento de la calidad de vida de las comunidades a nivel local, regional y nacional.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
