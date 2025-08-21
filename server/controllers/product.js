const Product = require("../models/product");
const cloudinary = require("cloudinary");

// CREATE product
exports.createProduct = async (req, res) => {
    try {
        const {name,description,price,discountPrice,stock,category,brand,variants,isFeatured} = req.body;

        let images = [];
        if (req.files && req.files.length > 0) {
            images = req.files.map(file => ({
                public_id: file.filename || file.public_id || "",
                url: file.path || file.secure_url
            }));
        }

        const product = new Product({
            name,
            description,
            price,
            discountPrice,
            stock,
            category,
            brand,
            variants: variants ? JSON.parse(variants) : [], 
            isFeatured, 
            images
        });

        await product.save();
        res.status(201).json({ success: true, product });
    } catch (err) {
        console.error("CreateProduct Error:", err);
        res.status(500).json({ success: false, message: err.message });
    }
};


// READ all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json({ success: true, products });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// READ single product
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ success: false, message: "Product not found" });
        res.json({ success: true, product });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// UPDATE product
exports.updateProduct = async (req, res) => {
    try {
        const {
            name,
            description,
            price,
            discountPrice,
            stock,
            category,
            brand,
            variants,
            isFeatured,
            rating
        } = req.body;

        let product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        if (req.files && req.files.length > 0) {
            for (let img of product.images) {
                if (img.public_id) {
                    await cloudinary.uploader.destroy(img.public_id);
                }
            }
            const images = req.files.map(file => ({
                public_id: file.filename || file.public_id,
                url: file.path
            }));
            product.images = images;
        }

        if (name) product.name = name;
        if (description) product.description = description;
        if (price) product.price = price;
        if (discountPrice) product.discountPrice = discountPrice;
        if (stock) product.stock = stock;
        if (category) product.category = category;
        if (brand) product.brand = brand;

        if (variants) {
            try {
                product.variants = typeof variants === "string" ? JSON.parse(variants) : variants;
            } catch (e) {
                return res.status(400).json({ success: false, message: "Invalid variants format" });
            }
        }

        if (typeof isFeatured !== "undefined") {
            product.isFeatured = isFeatured === "true" || isFeatured === true;
        }

        if (rating) {
            const newRating = Number(rating);
            if (newRating < 1 || newRating > 5) {
                return res.status(400).json({ success: false, message: "Rating must be between 1 and 5" });
            }
            const totalRating = product.ratings.average * product.ratings.count;
            product.ratings.count += 1;
            product.ratings.average = (totalRating + newRating) / product.ratings.count;
        }

        await product.save();
        return res.json({ success: true, product });

    } catch (err) {
        console.error("UpdateProduct Error:", err);
        return res.status(500).json({ success: false, message: err.message });
    }
};



// DELETE product
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ success: false, message: "Product not found" });

        for (let img of product.images) {
            await cloudinary.uploader.destroy(img.public_id);
        }

        await product.deleteOne();
        res.json({ success: true, message: "Product deleted" });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
