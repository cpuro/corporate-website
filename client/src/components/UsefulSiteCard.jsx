import { motion } from "framer-motion";

function UsefulSiteCard({ title, link, icon, index, variants }) {
    return (
    <motion.li variants={variants} custom={index} className="list-none">
        <motion.a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Ir al sitio web de ${title}`}
        title={title}
        className="group w-full h-40 bg-white px-4 py-3 rounded-xl shadow-lg hover:shadow-2xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 flex flex-col justify-between items-center border-4 border-primary"
        >
        <div className="flex-grow flex items-center justify-center">
            <img
            src={icon}
            alt={`Logo de ${title}`}
            className="max-h-16 object-contain transition-transform duration-300 group-hover:scale-110"
            loading="lazy"
            />
        </div>
        <h3 className="text-sm text-center text-black group-hover:text-primary font-poppins transition-colors duration-300 mt-2 leading-tight line-clamp-2">
            {title}
        </h3>
        </motion.a>
    </motion.li>
    );
}

export default UsefulSiteCard;
