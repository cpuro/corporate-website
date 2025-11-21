import TitlePrincipal from '../components/TitlePrincipal';
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import FileText from '../assets/icons/file-text.svg?react';

const ListTaxRegimen = ({ title, items }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section
      className="py-4 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden w-full"
      role="region"
      aria-label="Encuentranos"
    >
      {/* Contenido principal */}
      <div className="relative z-10 max-w-7xl mx-auto bg-white border-4 p-4 sm:p-6 lg:p-8 rounded-xl shadow-2xl border-[#3E4095]">
        
        {/* Título principal + icono */}
        <TitlePrincipal title="DOCUMENTOS RTE 2018-2025" Icon={FileText} />

        <ul
          ref={ref}
          className="space-y-6 max-w-4xl mx-auto px-2 sm:px-4"
        >
          {items.map((item, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
              className="p-4 sm:p-6 rounded-xl border-4 shadow-2xl border-[#3E4095] bg-white"
            >
              <h3 className="text-lg sm:text-xl font-poppins text-black mb-2">
                {item.title}
              </h3>
              <a
                href={item.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#3E4095] text-base sm:text-lg hover:underline"
              >
                {item.subtitle}
              </a>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ListTaxRegimen;
