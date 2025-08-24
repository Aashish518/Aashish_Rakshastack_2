import { motion } from "framer-motion";

export default function Button({
    children,
    onClick,
    type = "button",
    variant = "primary",
}) {
    const baseStyle =
        "px-4 py-2 rounded-lg font-semibold transition-all duration-300 shadow-md focus:outline-none";
    const styles = {
        primary:
            "bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700",
        secondary:
            "bg-gradient-to-r from-gray-200 to-gray-300 text-gray-800 hover:from-gray-300 hover:to-gray-400",
        destructive:
            "bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700",
    };

    return (
        <motion.button
            type={type}
            onClick={onClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`${baseStyle} ${styles[variant]}`}
        >
            {children}
        </motion.button>
    );
}
