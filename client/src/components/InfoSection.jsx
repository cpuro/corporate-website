import { motion } from 'framer-motion';
import TitlePrincipal from '../components/TitlePrincipal';  

const InfoSection = ({ icon, title, text, images = [] }) => (
    <section
      className="py-8 px-4 text-center relative"
      aria-labelledby="seccion de informacion"
      role="article"
    >
      <div className="relative z-10 max-w-6xl mx-auto bg-white p-4 border-4 rounded-md  shadow-2xl border-[#3E4095]  ">
        {/* Título principal + icono */}
        <TitlePrincipal title={title} Icon={icon} align='left' />
        {/* Contenido texto + imagen */}

        <p className="bg-white p-4 border-4 rounded-md  border-[#3E4095] font-poppins mb-6 text-base md:text-lg text-black text-left md:text-justify">
          {text}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
          {images.map((src, index) => (
            <motion.img
              key={index}
              src={src}
              alt={`${title} - imagen ${index + 1}`}
              className="rounded-xl shadow-2xl border-4 border-[#3E4095]"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + index * 0.2, duration: 0.5 }}
              viewport={{ once: true }}
              loading="lazy"
            />
          ))}
        </div>
    </div>
  </section>
);

export default InfoSection;
