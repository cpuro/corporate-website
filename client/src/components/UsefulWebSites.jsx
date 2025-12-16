import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Globe from '../assets/icons/globe.svg?react';
import TitlePrincipal from '../components/TitlePrincipal';
import UsefulSiteCard from "./UsefulSiteCard";
import { usefulWebsitesData } from "@/data/usefulWebsitesData";
import { itemVariants } from "../data/anima/animations";



function UsefulWebSites() {
  return (
    <section
      className="py-4 px-4 text-center relative overflow-hidden"
      role="region"
      aria-label="Páginas de interés"
    >
      <div className="bg-white p-4 rounded-xl shadow-2xl border-4 border-[#3E4095] relative z-10 max-w-6xl mx-auto">
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="py-4 px-6 md:px-12"
        >
          <TitlePrincipal title="WEBS DE INTERÉS" Icon={Globe} />

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-lg text-center text-black mb-12 max-w-3xl mx-auto font-poppins italic"
          >
            ¡Algunas páginas que podrían interesarte!
          </motion.p>

          <ul className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-8">
            {usefulWebsitesData.map((item, index) => (
              <UsefulSiteCard
                key={item.title}
                {...item}
                index={index}
                variants={itemVariants}
              />
            ))}
          </ul>
        </motion.section>
      </div>
    </section>
  );
}

export default UsefulWebSites;
