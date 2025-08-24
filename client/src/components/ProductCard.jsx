import Card from "./ui/Card";
import Button from "./ui/Button";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Edit, Trash2, Eye, ShoppingCart } from "lucide-react";

export default function ProductCard({ product, onEdit, onDelete }) {
    const discount = product.discountPrice > 0 && product.discountPrice < product.price;
    const isOutOfStock = product.stock <= 0;
    const isLowStock = product.stock > 0 && product.stock <= 10;

    const cardVariants = {
        hidden: { opacity: 0, scale: 0.9, y: 20 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        },
        hover: {
            scale: 1.03,
            y: -5,
            transition: {
                duration: 0.3,
                ease: "easeOut"
            }
        },
        tap: {
            scale: 0.97
        }
    };

    const imageVariants = {
        hover: {
            scale: 1.1,
            transition: {
                duration: 0.4,
                ease: "easeOut"
            }
        }
    };

    return (
        <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            whileTap="tap"
            className="group"
        >
            <Card>
                {/* Image Container */}
                <motion.div
                    className="relative w-full h-48 mb-4 overflow-hidden rounded-xl"
                    variants={imageVariants}
                >
                    <motion.img
                        src={product?.images?.[0]?.url || "https://via.placeholder.com/150"}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.4 }}
                    />

                    {/* Overlay on hover */}
                    <motion.div
                        className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                    >
                        <div className="flex gap-3">
                            <motion.button
                                className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <Eye size={16} className="text-white" />
                            </motion.button>
                            <motion.button
                                className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <ShoppingCart size={16} className="text-white" />
                            </motion.button>
                        </div>
                    </motion.div>

                    {/* Category Tag */}
                    <motion.span
                        className="absolute top-3 left-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-xs px-3 py-1 rounded-full shadow-lg uppercase tracking-wide font-semibold"
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        {product.category}
                    </motion.span>

                    {/* Featured Tag */}
                    {product.isFeatured && (
                        <motion.span
                            className="absolute top-3 right-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs px-3 py-1 rounded-full shadow-lg font-semibold"
                            initial={{ scale: 0.8, rotate: -5 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ delay: 0.3 }}
                            whileHover={{ rotate: 5 }}
                        >
                            ⭐ Featured
                        </motion.span>
                    )}

                    {/* Discount Badge */}
                    {discount && (
                        <motion.span
                            className="absolute bottom-3 left-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs px-3 py-1 rounded-full shadow-lg font-bold"
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            🔥 {Math.round((1 - product.discountPrice / product.price) * 100)}% OFF
                        </motion.span>
                    )}
                </motion.div>

                {/* Content */}
                <div className="flex-1 space-y-3">
                    {/* Title */}
                    <motion.h2
                        className="text-lg font-bold gradient-text line-clamp-1 text-shadow"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        {product.name}
                    </motion.h2>

                    {/* Brand */}
                    {product.brand && (
                        <motion.p
                            className="text-xs text-gray-500 italic"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            Brand: {product.brand}
                        </motion.p>
                    )}

                    {/* Description */}
                    <motion.p
                        className="text-sm text-gray-600 line-clamp-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        {product.description}
                    </motion.p>

                    {/* Price */}
                    <motion.div
                        className="flex items-center gap-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        <p className="font-bold text-xl text-green-600">
                            ₹{discount ? product.discountPrice : product.price}
                        </p>
                        {discount && (
                            <span className="text-gray-400 line-through text-sm">₹{product.price}</span>
                        )}
                    </motion.div>

                    {/* Stock Status */}
                    <motion.div
                        className="flex items-center gap-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        <AnimatePresence mode="wait">
                            {isOutOfStock ? (
                                <motion.span
                                    key="out-of-stock"
                                    className="text-xs font-semibold text-red-500 bg-red-50 px-2 py-1 rounded-full"
                                    initial={{ scale: 0.8 }}
                                    animate={{ scale: 1 }}
                                    exit={{ scale: 0.8 }}
                                >
                                    ❌ Out of Stock
                                </motion.span>
                            ) : isLowStock ? (
                                <motion.span
                                    key="low-stock"
                                    className="text-xs font-semibold text-orange-500 bg-orange-50 px-2 py-1 rounded-full"
                                    initial={{ scale: 0.8 }}
                                    animate={{ scale: 1 }}
                                    exit={{ scale: 0.8 }}
                                >
                                    ⚡ Low Stock: {product.stock}
                                </motion.span>
                            ) : (
                                <motion.span
                                    key="in-stock"
                                    className="text-xs font-semibold text-green-500 bg-green-50 px-2 py-1 rounded-full"
                                    initial={{ scale: 0.8 }}
                                    animate={{ scale: 1 }}
                                    exit={{ scale: 0.8 }}
                                >
                                    ✅ In Stock: {product.stock}
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </motion.div>

                    {/* Ratings */}
                    {product.ratings && (
                        <motion.div
                            className="flex items-center gap-1"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                        >
                            {Array.from({ length: 5 }, (_, i) => (
                                <Star
                                    key={i}
                                    size={14}
                                    className={i < product.ratings.average ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                                />
                            ))}
                            <span className="text-xs text-gray-500 ml-1">({product.ratings.count})</span>
                        </motion.div>
                    )}

                    {/* Variants */}
                    {product.variants?.length > 0 && (
                        <motion.div
                            className="mb-3"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.7 }}
                        >
                            <p className="text-xs font-semibold text-gray-700 mb-2">Variants:</p>
                            <div className="flex flex-wrap gap-2">
                                {product.variants.slice(0, 3).map((v, idx) => (
                                    <motion.span
                                        key={idx}
                                        className="px-2 py-1 border border-gray-200 rounded-lg text-xs bg-white/50 backdrop-blur-sm text-gray-700 shadow-sm"
                                        whileHover={{ scale: 1.05 }}
                                    >
                                        {v.color} {v.size && `- ${v.size}`}
                                    </motion.span>
                                ))}
                                {product.variants.length > 3 && (
                                    <span className="px-2 py-1 text-xs text-gray-500">
                                        +{product.variants.length - 3} more
                                    </span>
                                )}
                            </div>
                        </motion.div>
                    )}
                </div>

                {/* Action Buttons */}
                <motion.div
                    className="flex justify-between mt-4 pt-4 border-t border-gray-100"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                >
                    <Button
                        size="sm"
                        onClick={() => onEdit(product)}
                        className="flex items-center gap-2"
                    >
                        <Edit size={14} />
                        Edit
                    </Button>
                    <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => onDelete(product._id)}
                        className="flex items-center gap-2"
                    >
                        <Trash2 size={14} />
                        Delete
                    </Button>
                </motion.div>
            </Card>
        </motion.div>
    );
}
