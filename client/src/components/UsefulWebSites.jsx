import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Globe from '../assets/icons/globe.svg?react';
import TitlePrincipal from '../components/TitlePrincipal';

// Imágenes de íconos
import logodnp from "/src/assets/icons/dnp.png";
import logoambiente from "/src/assets/icons/ambiente.png";
import logoagricultura from "/src/assets/icons/agricultura.png";
import logocomercio from "/src/assets/icons/comercio.png";
import logoantioquia from "/src/assets/icons/gobernacion-antioquia.png";
import logosantander from "/src/assets/icons/gobernacion-santander.png";
import logofontur from "/src/assets/icons/fontur.png";
import logounicooperativa from "/src/assets/icons/ucc.png";
import logouandes from "/src/assets/icons/u-andes.png";
import logoalcaldiayondo from "/src/assets/icons/alcaldia-yondo.png";
import logoalcaldiabarrancabermeja from "/src/assets/icons/alcaldia-barrancabermeja.png";
import logomintic from "/src/assets/icons/mintic.png";
;

// Datos de las webs de interés
const featuresData = [
  { title: "Departamento Nacional de Planeación", link: "https://www.dnp.gov.co/", icon: logodnp },
  { title: "MinAmbiente", link: "https://www.minambiente.gov.co/", icon: logoambiente },
  { title: "MinAgricultura", link: "https://www.minagricultura.gov.co/", icon: logoagricultura },
  { title: "MinComercio", link: "https://www.mincit.gov.co/", icon: logocomercio },
  { title: "MinTIC", link: "https://www.mintic.gov.co/", icon: logomintic },
  { title: "Gobernación de Antioquia", link: "https://antioquia.gov.co/", icon: logoantioquia },
  { title: "Gobernación de Santander", link: "https://santander.gov.co/", icon: logosantander },
  { title: "Universidad Cooperativa de Colombia", link: "https://www.ucc.edu.co", icon: logounicooperativa },
  { title: "Universidad de los Andes", link: "https://www.uniandes.edu.co/", icon: logouandes },
  { title: "Alcaldía de Yondó", link: "https://www.yondo-antioquia.gov.co/", icon: logoalcaldiayondo },
  { title: "Alcaldía  de Barrancabermeja", link: "https://www.barrancabermeja.gov.co/", icon: logoalcaldiabarrancabermeja },
  { title: "Fontur", link: "https://fontur.com.co/", icon: logofontur },

];

// Variantes de animación
const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: (i) => ({
    opacity: 1,
    scale: 0.8,
    transition: { duration: 0.5, delay: i * 0.05 },
  }),
};

function UsefulWebSites() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section
      className="py-4 px-4 text-center relative overflow-hidden"
      role="region"
      aria-label="Paginas de intereres"
    >

        {/* Contenido */}
          <div className="bg-white p-4 rounded-xl shadow-2xl border-4 border-[#3E4095] relative z-10 max-w-6xl mx-auto">
          <motion.section
            ref={ref}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="py-4 px-6 md:px-12"
          >
        {/* Título principal + icono */}
        <TitlePrincipal title="WEBS DE INTERES" Icon={Globe}/>
                {/* Subtítulo */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-lg text-center text-black mb-12 max-w-3xl mx-auto font-poppins italic "
        >¡Algunas paginas que podrian interesarte...!.
        </motion.p>

        
            {/* Lista de sitios */}
            <ul className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-8">
              {featuresData.map((item, index) => (
                <motion.li
                  key={item.title}
                  variants={itemVariants}
                  custom={index}
                  className="list-none"
                >
                  <motion.a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Ir al sitio web de ${item.title}`}
                    className="group w-full h-40 bg-white px-4 py-3 rounded-xl shadow-lg hover:shadow-2xl hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:scale-105 flex flex-col justify-between items-center border-4 border-[#3E4095]"
                  >
                    <div className="flex-grow flex items-center justify-center">
                      <img
                        src={item.icon}
                        alt={`Logo de ${item.title}`}
                        className="max-h-16 object-contain transition-transform duration-300 ease-in-out group-hover:scale-110"
                        loading="lazy"
                      />
                    </div>
                    <h3 className="text-sm text-center text-black group-hover:text-[#3E4095] font-poppins transition-colors duration-300 mt-2 leading-tight line-clamp-2">
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

export default UsefulWebSites;
