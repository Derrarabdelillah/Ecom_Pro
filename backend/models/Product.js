const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// define the Shema
const ProductSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: [String],  // Better way to define array of strings
        default: []
    },
    category: {
        type: String,
        required: true
    },
    subCategory: {
        type: String,
    },
    sizes: {
        type: [String],  // Proper array of strings
        default: []
    },
    bestseller: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,  // Better to use Date type instead of Number
        default: Date.now
    },
}, { timestamps: true });  // Adds createdAt and updatedAt automatically

// define the model of the schema
const Product = mongoose.models.product || mongoose.model('Product', ProductSchema)

// export the model
module.exports = Product;