import { motion } from "framer-motion";

export default function Card({ children }) {
    return (
        <motion.div
            className="p-5 rounded-2xl shadow-lg bg-white hover:shadow-2xl 
                       transition-all duration-300 cursor-pointer flex flex-col h-full"
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
        >
            {children}
        </motion.div>
    );
}
