import { motion, AnimatePresence } from "framer-motion";
import ProductList from "../components/ProductList";
import ProductForm from "../components/ProductForm";
import { useProducts } from "../hooks/useProducts";
import { useState } from "react";
import  Button  from "../components/ui/Button"; 

export default function ProductPage() {
    const {
        products,
        loading,
        addOrUpdate,
        remove,
        startEdit,
        editingProduct,
        cancelEdit,
    } = useProducts();

    const [isFormOpen, setIsFormOpen] = useState(false);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    const handleFormClose = () => {
        cancelEdit();
        setIsFormOpen(false);
    };

    return (
        <motion.div
            className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 p-6"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    className="flex items-center justify-between mb-8"
                    variants={itemVariants}
                >
                    <div className="flex items-center gap-4">
                        <motion.div
                            className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center shadow-lg"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <span className="text-2xl text-white">🛒</span>
                        </motion.div>
                        <div>
                            <h1 className="text-4xl font-bold gradient-text text-shadow-lg">
                                Product Manager
                            </h1>
                            <p className="text-gray-600 mt-1">Manage your product inventory with ease</p>
                        </div>
                    </div>

                    {/* Open Form Button */}
                    <Button onClick={() => setIsFormOpen(true)}>
                        + Add Product
                    </Button>

                    <motion.div
                        className="glass-effect px-4 py-2 rounded-full"
                        whileHover={{ scale: 1.05 }}
                    >
                        <span className="text-sm font-semibold text-primary-700">
                            Total: {products?.length || 0}
                        </span>
                    </motion.div>
                </motion.div>

                {/* Product List */}
                <motion.div className="mt-8" variants={itemVariants}>
                    {loading ? (
                        <div className="text-center py-12">
                            <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur rounded-xl px-6 py-4 shadow-lg">
                                <div className="w-5 h-5 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
                                <p className="text-gray-600 font-medium">Loading products...</p>
                            </div>
                        </div>
                    ) : products?.length > 0 ? (
                        <ProductList
                            products={products}
                            onEdit={(p) => {
                                startEdit(p);
                                setIsFormOpen(true);
                            }}
                            onDelete={remove}
                        />
                    ) : (
                        <motion.div
                            className="text-center py-16 border-2 border-dashed border-primary-200 rounded-2xl bg-white/50 backdrop-blur-sm"
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="w-16 h-16 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">📦</span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-700 mb-2">
                                No products yet
                            </h3>
                            <p className="text-gray-500 mb-4">
                                Start by adding your first product
                            </p>
                        </motion.div>
                    )}
                </motion.div>
            </div>

            {/* Popup Modal for Form */}
            <AnimatePresence>
                {isFormOpen && (
                    <motion.div
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl h-[90vh] flex flex-col relative"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {/* Close Button */}
                            <button
                                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
                                onClick={handleFormClose}
                            >
                                ✖
                            </button>

                            {/* Scrollable Form */}
                            <div className="overflow-y-auto p-6">
                                <ProductForm
                                    onSubmit={async (data) => {
                                        await addOrUpdate(data);
                                        setIsFormOpen(false);
                                    }}
                                    editingProduct={editingProduct}
                                    onCancel={handleFormClose}
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </motion.div>
    );
}
