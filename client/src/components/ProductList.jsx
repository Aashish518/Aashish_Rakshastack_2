import { motion } from "framer-motion";
import ProductCard from "./ProductCard";

export default function ProductList({ products, onEdit, onDelete }) {
    return (
        <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4"
            initial="hidden"
            animate="visible"
            variants={{
                hidden: { opacity: 0 },
                visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.15 },
                },
            }}
        >
            {products.map((p, index) => (
                <motion.div
                    key={p._id || index}  // ✅ fallback if _id is missing
                    variants={{
                        hidden: { opacity: 0, y: 20, scale: 0.95 },
                        visible: { opacity: 1, y: 0, scale: 1 },
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    whileHover={{ scale: 1.03 }}
                >
                    <ProductCard product={p} onEdit={onEdit} onDelete={onDelete} />
                </motion.div>
            ))}

        </motion.div>
    );
}
