const express = require("express");
const router = express.Router();
const upload = require("../utils/cloudinary.js");
const { createProduct, deleteProduct, getAllProducts, getProductById, updateProduct } = require("../controllers/product.js");



// CREATE 
router.post("/product", upload.array("images"), createProduct);

// READ ALL
router.get("/product", getAllProducts);

// READ ONE
router.get("/product/:id", getProductById);

// UPDATE
router.put("/product/:id", upload.array("images"), updateProduct);

// DELETE
router.delete("/product/:id", deleteProduct);



module.exports = router;