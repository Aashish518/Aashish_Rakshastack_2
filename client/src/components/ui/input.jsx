import { motion } from "framer-motion";

export default function Input({
    label,
    name,
    type = "text",
    value,
    onChange,
    placeholder,
}) {
    return (
        <motion.div
            className="flex flex-col space-y-1"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            {label && <label className="text-sm font-medium text-gray-700">{label}</label>}

            <input
                className="p-2 border rounded-lg transition-all duration-300 focus:outline-none 
                   focus:ring-2 focus:ring-blue-400 focus:border-blue-500 
                   hover:border-indigo-400 shadow-sm"
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />
        </motion.div>
    );
}
