import { motion } from "framer-motion";
import { memo } from "react";
import { textVariants } from "../data/anima/animations";


// ajusta el path según tu estructura real

const alignmentMap = {
  left: {
    container: "text-left items-start",
    justify: "justify-start",
  },
  center: {
    container: "text-center items-center",
    justify: "justify-center",
  },
  right: {
    container: "text-right items-end",
    justify: "justify-end",
  },
};

function TitlePrincipal({
  custom = 0,
  title = "BIENVENIDOS",
  content = null,
  Icon,
  iconClass = "text-[#3E4095] text-4xl",
  align = "center",
  showUnderline = true,
  contentPosition = "below", // "below" | "right"
  className = "",
  as: Heading = "h2",
}) {
  const { container, justify } = alignmentMap[align];

  const TitleBlock = (
    <div className={`flex ${justify} items-center gap-2 mb-2`}>
      {Icon && <Icon className={iconClass} aria-hidden />}
      <Heading
        className={`font-poppins text-3xl sm:text-2xl md:text-3xl lg:text-4xl text-black ${
          showUnderline ? "border-b-4 border-[#3E4095]" : ""
        }`}
      >
        {title}
      </Heading>
    </div>
  );

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={textVariants}
      custom={custom}
      className={`mb-8 flex flex-col ${container} ${className}`}
    >
      {contentPosition === "right" ? (
        <div className="flex gap-4 items-start">
          <div className="flex-shrink-0">{TitleBlock}</div>
          {content && (
            <div className="text-base text-gray-800 leading-relaxed">
              {content}
            </div>
          )}
        </div>
      ) : (
        <>
          {TitleBlock}
          {content && (
            <div className="text-base text-gray-800 leading-relaxed">
              {content}
            </div>
          )}
        </>
      )}
    </motion.div>
  );
}

export default memo(TitlePrincipal);
