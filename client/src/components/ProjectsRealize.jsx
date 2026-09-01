import { motion } from "framer-motion";
import img1 from "../assets/images/projects-completed-2.webp";
import img2 from "../assets/images/projects-completed-1.webp";
import img3 from "../assets/images/projects-completed-3.webp";
import img4 from "../assets/images/projects-completed-4.webp"; 
import TitlePrincipal from '../components/TitlePrincipal';

import BookmarkCheck  from '../assets/icons/bookmark-check.svg?react';
import Share2 from '../assets/icons/share-2.svg?react';

const textVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.3,
      ease: "easeOut",
    },
  }),
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.3,
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const proyectsRealized = [
  'Asesoría técnica en la formulación del Plan de Desarrollo del municipio de San Pablo -Bolívar 2024-2027.',
  'Consultoría para la formulación e implementación del proyecto “Vibremos En Comuna”, bajo el programa de apoyo a la capacidad organizativa y comunitaria del plan de manejo ambiental de la Central Térmica Meriléctrica de Barrancabermeja Celsia S.A, para fortalecer la capacidad organizativa y de autogestión de las Organizaciones Sociales y Juntas de Acción Comunal del área de influencia directa.',
  'Fortalecimiento de capacidades en comunidades vulnerables ubicadas cerca de la Ciénaga San Silvestre en Barrancabermeja, dentro del marco de la construcción de un Proyecto Ciudadano de Educación Ambiental (PROCEDA).',
  'Asesoría y acompañamiento metodológico para la formulación del plan de desarrollo vigencia 2016-2019 del Municipio de Yondó.',
  'Actualización del plan de desarrollo turístico del Municipio de Yondó-Antioquia – vigencia 2015.',
  'Diagnóstico de problemáticas y deficiencias ambientales y capacitación en cultura ciudadana en los barrios del Área de Influencia de la central térmica Meriléctrica – Celsia Barrancabermeja.',
  'Estudio de impacto de la gestión social de la planta Meriléctrica, en su zona de influencia - Barrancabermeja',
  'Desarrollo de proyectos de la cadena agroalimentaria y de los sectores internacionalización, productividad y competitividad del eje económico del plan de desarrollo de Yondó (Antioquia) vigencia 2008-2011.',
];


export default function ProjectsRealize() {
  return (
    <section
      className="py-4 px-4 text-center relative overflow-hidden"
      aria-label="Sección de proyectos realizados"
    >
      <div className="relative z-10 max-w-6xl mx-auto bg-white p-4 border-4 rounded-xl shadow-2xl border-[#3E4095]">
       {/* Título principal + icono */}
      <TitlePrincipal title="PROYECTOS REALIZADOS" Icon={Share2} align="left"/>
        {/* Contenido */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start px-4">
          {/* Lista de proyectos */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={textVariants}
            custom={1}
            className="p-4  rounded-xl bg-white border-4 border-[#3E4095] "
          >
            <ul className="grid grid-cols-1 gap-6 text-black leading-relaxed text-left">
              {proyectsRealized.map((item, index) => (
                <motion.li
                  key={index}
                  custom={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={textVariants}
                  className="flex items-start gap-3"
                >
                  <BookmarkCheck className="text-[#3E4095] mt-1 flex-shrink-0 w-5 h-5" />
                  <span className="text-base font-poppins">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Imágenes animadas */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={imageVariants}
            className="w-full flex flex-col items-center gap-6"
          >
            {[img1, img2, img3, img4].map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Proyecto ${idx + 1}`}
                loading="lazy"
                decoding="async"
                fetchPriority="low"
                width="400"
                height="300"
                className="w-full h-auto max-w-md rounded-xl border-4 border-[#3E4095] shadow-2xl"
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
