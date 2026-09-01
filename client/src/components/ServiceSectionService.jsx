import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { features } from "/src/data/featuresData.js";
import Briefcase  from '../assets/icons/briefcase.svg?react';
import TitlePrincipal from '../components/TitlePrincipal';

const featureVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};


export default function FeatureSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
// No cambies las importaciones, las dejamos igual

<section
  className="py-4 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden w-full"
  aria-label="Características o servicios destacados"
>
  <div className="relative z-10 max-w-7xl mx-auto bg-white border-4 p-4 sm:p-6 lg:p-8 rounded-xl shadow-2xl border-[#3E4095]">
    
    <TitlePrincipal
      title="NUESTROS SERVICIOS"
      Icon={Briefcase}
      align="left"
    />

    <motion.p
      ref={ref}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.3, duration: 0.6 }}
      className="text-base sm:text-lg text-left text-black mb-4 font-poppins p-4 sm:p-6 border-4 rounded-xl border-[#3E4095]"
    >
      Impulsamos el desarrollo territorial y sostenible a través de asesorías y consultorías técnicas y estratégicas en planes, programas y proyectos.
    </motion.p>

    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.3, duration: 0.6 }}
      className="w-full"
    >
      <div

        className="p-4 sm:p-6 grid gap-y-10 gap-x-6 sm:gap-x-8 md:grid-cols-2 lg:gap-x-12 max-w-full font-poppins"
      >
        {features.map((feature, idx) => {


          return (
            <motion.div
              key={feature.title}
              custom={idx}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={featureVariants}
              className="flex flex-col md:flex-row items-start gap-4 p-4 sm:p-6 rounded-xl border-4 shadow-2xl border-[#3E4095]"
            >
              <div className="w-full">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-semibold border-b-2 border-[#3E4095]">
                    {feature.title}
                  </h3>
                </div>
                <ul className="list-disc pl-4 sm:pl-6 space-y-1 text-black text-sm sm:text-base text-left">
                  {feature.points.map((point, i) => (
                    <li key={`${feature.title}-${i}`}>{point}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  </div>
</section>

  );
}
