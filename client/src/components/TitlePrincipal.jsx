import { motion } from "framer-motion";

const textVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.3,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

export default function TitlePrincipal({
  custom = 0,
  title = "BIENVENIDOS",
  content = <></>,
  Icon = null,
  iconClass = "text-[#3E4095] text-4xl",
  align = "center", // left, center, right
  showUnderline = true,
  contentPosition = "below", // "below" or "right"
  className = "",
}) {
  const alignment = {
    left: "text-left items-start",
    center: "text-center items-center",
    right: "text-right items-end",
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={textVariants}
      custom={custom}
      className={`mb-8 ${alignment[align]} ${className} flex flex-col`}
    >
      <div
        className={`flex ${align === "center" ? "justify-center" : align === "right" ? "justify-end" : "justify-start"} items-center gap-2 mb-2`}
      >
        {Icon && <Icon className={iconClass} />}
        <h2
          className={`font-poppins text-3xl sm:text-2xl md:text-3xl lg:text-4xl text-black ${
            showUnderline ? "border-b-4 border-[#3E4095]" : ""
          }`}
        >
          {title}
        </h2>
      </div>

      {content && contentPosition === "below" && (
        <div className="text-base text-gray-800 leading-relaxed">{content}</div>
      )}

      {content && contentPosition === "right" && (
        <div className="flex gap-4">
          <div className="flex-shrink-0">
            {Icon && <Icon className={iconClass} />}
            <h2
              className={`font-poppins text-3xl sm:text-2xl md:text-3xl lg:text-4xl text-black ${
                showUnderline ? "border-b-4 border-[#3E4095]" : ""
              }`}
            >
              {title}
            </h2>
          </div>
          <div className="text-base text-gray-800 leading-relaxed">{content}</div>
        </div>
      )}
    </motion.div>
  );
}
