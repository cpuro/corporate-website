import { motion } from "framer-motion";

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

const SectionDivider = ({ custom = 1 }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={textVariants}
    custom={custom}
  >
    <div className="px-16">
      <div className="h-[4px] bg-[#3E4095] my-8" />
    </div>
  </motion.div>
);

export default SectionDivider;
