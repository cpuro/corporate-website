import { motion } from "framer-motion";
import img1 from '../assets/images/about-us-hero.webp';
import TitlePrincipal from '../components/TitlePrincipal';
import DoorOpen from '../assets/icons/door-open.svg?react';

const textVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.3,
      duration: 0.6,
      ease: "easeOut"
    }
  })
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.5,
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

const Welcome = () => {
  return (
    <section aria-labelledby="bienvenida-title"
      className="px-4 py-4 text-center relative overflow-hidden min-h-[300px]">
      <div className="relative z-10 max-w-6xl mx-auto bg-white p-4 shadow-2xl border-4 rounded-md border-primary">
        {/* Título principal + icono */}
        <TitlePrincipal title="BIENVENIDOS" Icon={DoorOpen}/>
        {/* Subtítulo */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="min-h-[80px] text-lg text-center text-black mb-12 max-w-3xl mx-auto font-poppins italic "
        >¡Bienvenido a nuestra página! Aquí encontrarás información relevante sobre nuestro compromiso con Barrancabermeja y la región. ¡Explora y conoce nuestra historia!
        </motion.p>

        {/* Contenido texto + imagen */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 items-center px-4 md:px-0">
          {/* Texto */}


          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={textVariants}
            custom={1}
            className="p-14 min-h-[300px]"
          >
            <h2 className="text-2xl font-semibold text-primary mb-4">
              ¿QUIÉNES SOMOS?
            </h2>
            <p className="text-black font-poppins text-left text-lg leading-relaxed max-w-prose mx-auto box-shadow backdrop-filter">
              
                Somos una organización comprometida con el desarrollo social y económico.
                Acompañamos a comunidades, entidades públicas y privadas en la planificación,
                ejecución y seguimiento de sus planes, programas y proyectos.
              
            </p>
          </motion.div>

          {/* Imagen */}
          <div className="w-full max-w-[1000px] aspect-[16/9] mx-auto rounded-lg border-4 border-primary shadow-lg overflow-hidden">
            <motion.img
              src={img1}
              alt="..."
              loading="lazy"
              width={1729}
              height={982}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={imageVariants}
              className="w-full max-w-[1000px] aspect-[16/9] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Welcome;
