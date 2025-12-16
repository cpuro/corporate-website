import { motion } from 'framer-motion';
import TitlePrincipal from '../components/TitlePrincipal';

const imageAnimation = {
  initial: { opacity: 0, scale: 0.95 },
  whileInView: { opacity: 1, scale: 1 },
  transition: (index) => ({
    delay: 0.2 + index * 0.2,
    duration: 0.5,
  }),
  viewport: { once: true },
};

const InfoSection = ({ Icon, title, text, images = [] }) => {
  const safeTitle =
    typeof title === "string" ? title : "info";

  const titleId = `info-section-${safeTitle
    .replace(/\s+/g, "-")
    .toLowerCase()}`;

  return (
    <section
      className="py-8 px-4 text-center relative"
      aria-labelledby={titleId}
    >
      <div className="relative z-10 max-w-6xl mx-auto bg-white p-4 border-4 rounded-md shadow-2xl border-[#3E4095]">
        <TitlePrincipal
          title={title}
          Icon={Icon}
          align="left"
          id={titleId}
        />

        <p className="bg-white p-4 border-4 rounded-md border-[#3E4095] font-poppins mb-6 text-base md:text-lg text-black text-left md:text-justify">
          {text}
        </p>

        {images.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {images.map((src, index) => (
              <motion.img
                key={src}
                src={src}
                alt={`${safeTitle} - imagen ${index + 1}`}
                className="rounded-xl shadow-2xl border-4 border-[#3E4095]"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: 0.2 + index * 0.2,
                  duration: 0.5,
                }}
                viewport={{ once: true }}
                loading="lazy"
                decoding="async"
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};


export default InfoSection;
