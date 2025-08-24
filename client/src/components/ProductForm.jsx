import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Input from "./ui/Input";
import TextArea from "./ui/TextAreacom";
import Button from "./ui/Button";

export default function ProductForm({ onSubmit, editingProduct, onCancel }) {
    const [form, setForm] = useState({
        name: "",
        description: "",
        price: "",
        discountPrice: "",
        stock: "",
        category: "",
        brand: "",
        isFeatured: false,
        variants: [{ color: "", size: "", stock: 0, price: 0 }],
        images: []
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (editingProduct) {
            setForm(editingProduct);
        }
    }, [editingProduct]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({ ...form, [name]: type === "checkbox" ? checked : value });
    };

    const handleVariantChange = (index, field, value) => {
        const updated = [...form.variants];
        updated[index][field] = value;
        setForm({ ...form, variants: updated });
    };

    const addVariant = () => {
        setForm({
            ...form,
            variants: [...form.variants, { color: "", size: "", stock: 0, price: 0 }]
        });
    };

    const removeVariant = (index) => {
        const updated = form.variants.filter((_, i) => i !== index);
        setForm({ ...form, variants: updated });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const formData = new FormData();

            // Append normal fields
            Object.keys(form).forEach((key) => {
                if (key === "variants") {
                    formData.append("variants", JSON.stringify(form.variants));
                } else if (key === "images") {
                    form.images.forEach((file) => formData.append("images", file));
                } else {
                    formData.append(key, form[key]);
                }
            });

            await onSubmit(formData);

            if (!editingProduct) {
                setForm({
                    name: "",
                    description: "",
                    price: "",
                    discountPrice: "",
                    stock: "",
                    category: "",
                    brand: "",
                    isFeatured: false,
                    variants: [{ color: "", size: "", stock: 0, price: 0 }],
                    images: []
                });
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6 p-6 border rounded-lg bg-white max-h-[80vh] overflow-y-auto"
        >
            {/* Header */}
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">
                    {editingProduct ? "Edit Product" : "Add New Product"}
                </h2>
                {editingProduct && (
                    <Button type="button" onClick={onCancel} disabled={isSubmitting}>
                        ❌ Cancel
                    </Button>
                )}
            </div>

            {/* Inputs */}
            <Input label="Name" name="name" value={form.name} onChange={handleChange} required />
            <TextArea label="Description" name="description" value={form.description} onChange={handleChange} required />
            <Input label="Price" type="number" name="price" value={form.price} onChange={handleChange} required />
            <Input label="Discount Price" type="number" name="discountPrice" value={form.discountPrice} onChange={handleChange} />
            <Input label="Stock" type="number" name="stock" value={form.stock} onChange={handleChange} required />
            <Input label="Category" name="category" value={form.category} onChange={handleChange} required />
            <Input label="Brand" name="brand" value={form.brand} onChange={handleChange} />

            {/* Featured */}
            <label className="flex items-center gap-2">
                <input type="checkbox" name="isFeatured" checked={form.isFeatured} onChange={handleChange} />
                Featured Product
            </label>

            {/* Variants */}
            <div>
                <h3 className="font-semibold mb-2">Variants</h3>
                {form.variants.map((variant, i) => (
                    <div key={i} className="grid grid-cols-5 gap-2 items-center mb-2">
                        <Input placeholder="Color" value={variant.color} onChange={(e) => handleVariantChange(i, "color", e.target.value)} />
                        <Input placeholder="Size" value={variant.size} onChange={(e) => handleVariantChange(i, "size", e.target.value)} />
                        <Input type="number" placeholder="Stock" value={variant.stock} onChange={(e) => handleVariantChange(i, "stock", e.target.value)} />
                        <Input type="number" placeholder="Price" value={variant.price} onChange={(e) => handleVariantChange(i, "price", e.target.value)} />
                        <Button type="button" onClick={() => removeVariant(i)}>Remove</Button>
                    </div>
                ))}
                <Button type="button" onClick={addVariant}>+ Add Variant</Button>
            </div>

            {/* Images Upload */}
            <div>
                <label className="block mb-1">Upload Images</label>
                <input
                    type="file"
                    multiple
                    onChange={(e) => setForm({ ...form, images: [...e.target.files] })}
                />
            </div>

            {/* Submit */}
            <div className="flex justify-end">
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Saving..." : editingProduct ? "Update" : "Add"}
                </Button>
            </div>
        </motion.form>
    );
}
