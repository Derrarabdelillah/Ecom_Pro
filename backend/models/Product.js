const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// define the Shema
const ProductSchema = new Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
    },
    image: {
        type: Array,
    },
    category: {
        type: String,
    },
    subCategory: {
        type: String,
    },
    sizes: {
        type: Array,
    },
    bestseller: {
        type: Boolean
    },
    date: {
        type: Number,
    },
})

// define the model of the schema
const Product = mongoose.models.product || mongoose.model('Product', ProductSchema)

// export the model
module.exports = Product;