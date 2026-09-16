import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

import Handshake  from '../assets/icons/handshake.svg?react';
import TitlePrincipal from '../components/TitlePrincipal';

// Imágenes de íconos
import logo_alcaldia_yondo from "/src/assets/icons/alcaldia-yondo.png";
import logo_alcaldia_san_pablo from "/src/assets/icons/alcaldia-san-pablo.svg";
import logo_fundacion_bolivar_davivienda from "/src/assets/icons/fundacion-bolivar-davivienda.png";
import logo_celsia from "/src/assets/icons/celsia.png";

// Datos de las webs de interés
const featuresData = [
  { title: "Alcaldia de Yondo", link: "https://www.yondo-antioquia.gov.co/", icon: logo_alcaldia_yondo },
  { title: "Alcaldia de San Pablo", link: "http://www.sanpablo-bolivar.gov.co/", icon: logo_alcaldia_san_pablo },
  { title: "Fundacion Bolivar Davivienda ", link: "https://www.fundacionbolivardavivienda.org/", icon: logo_fundacion_bolivar_davivienda },
  { title: "Celsia", link: "https://www.celsia.com/es/", icon: logo_celsia },

];

// Variantes de animación
const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, delay: i * 0.05 },
  }),
};

function StrategicAllies() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section
      className="px-4 py-4 text-center relative overflow-hidden"
      aria-label="Aliados estratégicos y enlaces de interés"
    >
      {/* Fondo que ocupa todo el ancho */}
        {/* Contenido */}
          <div className="bg-white p-4 rounded-xl shadow-2xl border-4 border-primary relative z-10 max-w-6xl mx-auto">
          <motion.section
            ref={ref}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="py-4 px-6 md:px-12"
          >
        {/* Título principal + icono */}
       <TitlePrincipal title="ALIADOS ESTRATÉGICOS" Icon={Handshake}/>
        {/*Contenido */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-lg text-center text-black mb-12 max-w-3xl mx-auto font-poppins italic "
        >
        ¡Estas son algunas de las instituciones que han confiado en nuestro trabajo técnico y social en el territorio!.
        </motion.p>


            {/* Lista de sitios */}
            <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-4 gap-4">
              {featuresData.map((item, index) => (
                <motion.li
                  key={item.title}
                  variants={itemVariants}
                  custom={index}
                  className="list-none "
                >
                  <motion.a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Ir al sitio web de ${item.title}`}
                    className="group w-full h-40 bg-white px-4 py-3 rounded-xl shadow-lg hover:shadow-2xl hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:scale-105 flex flex-col justify-between items-center border-4 border-primary"
                  >
                    <div className="flex-grow flex items-center justify-center">
                      <img
                        src={item.icon}
                        alt={`Logo de ${item.title}`}
                        className="max-h-16 object-contain transition-transform duration-300 ease-in-out group-hover:scale-110"
                        loading="lazy"
                      />
                    </div>
                    <h3 className="text-sm text-center text-black group-hover:text-primary  font-poppins transition-colors duration-300 mt-2 leading-tight line-clamp-2">
                      {item.title}
                    </h3>
                  </motion.a>
                </motion.li>
              ))}
            </ul>
        </motion.section>
        </div>
      </section>
  );
}

export default StrategicAllies;
