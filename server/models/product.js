const mongoose = require("mongoose");
const { Schema } = mongoose;



const imageSchema = new Schema({
    public_id: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    }
});

const productSchema = new Schema({
    name: {
        type: String,
        required:true,
        trim: true,
        maxlength: 100
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    discountPrice: {
        type: Number,
        default: 0
    },
    stock: {
        type: Number,
        required: true,
        default: 0
    },
    category: {
        type: String,
        required: true,
        index: true
    },
    brand: {
        type: String
    },
    images: [imageSchema], 
    ratings: {
        average: {
            type: Number,
            default: 0,
            min: 0,
            max: 5
        },
        count: {
            type: Number,
            default: 0
        }
    },
    variants: [
        {
            color: String,
            size: String,
            stock: { type: Number, default: 0 },
            price: Number
        }
    ],
    isFeatured: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});



module.exports = mongoose.model("Product", productSchema);