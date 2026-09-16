import { motion } from "framer-motion";

const TaxDocumentItem = ({ item }) => {
    return (
    <motion.li
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="p-4 sm:p-6 rounded-xl border-4 shadow-2xl border-primary bg-white"
    >
        <h3 className="text-lg sm:text-xl font-poppins text-black mb-2">
        {item.title}
        </h3>

        <a
        href={item.pdfUrl}
        download
        className="text-primary text-base sm:text-lg hover:underline"
        aria-label={`Descargar ${item.title}`}
        >
        {item.subtitle}
        </a>
    </motion.li>
    );
};

export default TaxDocumentItem;
