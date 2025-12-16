// src/data/anima/animations.js

export const textVariants = {
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

export const itemVariants = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: (i = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      delay: i * 0.05,
      ease: "easeOut",
    },
  }),
};
