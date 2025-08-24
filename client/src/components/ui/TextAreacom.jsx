import { motion } from "framer-motion";

const TextArea = ({ label, name, value, onChange, placeholder }) => {
    return (
        <motion.div
            className="flex flex-col space-y-1"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            {label && (
                <label className="text-sm font-medium text-gray-700">{label}</label>
            )}

            <textarea
                className="p-2 border rounded-lg transition-all duration-300 
                   focus:outline-none focus:ring-2 focus:ring-purple-400 
                   focus:border-purple-500 hover:border-pink-400 
                   shadow-sm resize-none"
                name={name}
                rows={4}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />
        </motion.div>
    );
};

export default TextArea;
