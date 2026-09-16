import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import FileCheck  from '../assets/icons/file-check.svg?react';
import Briefcase  from '../assets/icons/briefcase.svg?react';
import TitlePrincipal from '../components/TitlePrincipal';

const services = [
  'Planes de ordenamiento territorial',
  'Planes de desarrollo territorial',
  'Planes de desarrollo turístico',
  'Planes y estrategias para el desarrollo económico y empresarial',
  'Formulación y evaluación de proyectos productivos de inversión social',
  'Puesta en marcha de proyectos productivos y de inversión social',
  'Proyectos y estrategias para la sostenibilidad ambiental',
  'Consultoría en diseño centrado en el humano',
  'Fortalecimiento de capacidades de organizaciones sociales, comunales y empresariales',
  'Capacitación',
];



const textVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: 'easeOut',
    },
  }),
};

const Services = () => {
  return (
    <section
      className="py-4 px-4 text-center relative overflow-hidden"
      aria-label="Servicios ofrecidos por la Corporación"
    >
      {/* Contenido principal */}
      <div className="bg-white p-6 rounded-xl shadow-2xl border-4 border-primary  relative z-10 max-w-6xl mx-auto">
        {/* Título principal + icono */}
       <TitlePrincipal title="NUESTROS SERVICIOS" Icon={Briefcase}/>
        {/* Subtítulo */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-lg text-center text-black mb-12 max-w-3xl mx-auto font-poppins italic "
        >
         ¡Impulsamos el desarrollo territorial y sostenible a través de asesorías y consultorías técnicas y estratégicas en planes, programas y proyectos!.
        </motion.p>

        {/* Lista de servicios */}
        <ul className="grid grid-cols-1 bg-white p-4 md:grid-cols-2 gap-8 text-black mb-8 leading-relaxed text-left ">
          {services.map((item, index) => (
            <motion.li
              key={index}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={textVariants}
              className="flex items-start gap-3 "
            >
              <FileCheck className="text-primary  mt-1 flex-shrink-0 w-6 h-6" />
              <span className="text-lg font-poppins">{item}.</span>
            </motion.li>
          ))}
        </ul>

        {/* Botones */}
        {/* Botones responsivos */}
        <div className="flex flex-col sm:flex-row justify-center items-center flex-wrap gap-4 mt-4">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to={"/documents/portafolio.pdf"}
              download="portafolio-corporacion.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-4 py-2 text-sm sm:text-base text-white border border-white bg-primary font-poppins rounded-lg hover:bg-[#F16139] transition text-center"
            >
              Descargar Portafolio
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to={"/contacto"}
              className="w-full sm:w-auto px-4 py-2 text-sm sm:text-base text-white border border-white bg-primary font-poppins rounded-lg hover:bg-[#F16139] transition text-center"
            >
              Contactar Servicios
            </Link>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default Services;
