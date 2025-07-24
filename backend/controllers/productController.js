const Product = require('../models/Product');

const cloudinary = require('cloudinary').v2

// Add Product Function
const addProduct = async (req, res) => {
    try {
        
        const name = req.body?.name;
        const description = req.body?.description;
        const price = req.body?.price;
        const category = req.body?.category;
        const subCategory = req.body?.subCategory;
        const sizes = req.body?.sizes;
        const bestseller = req.body?.bestseller;

        // images
        const image1 = req.files?.image1 && req.files.image1[0];
        const image2 = req.files?.image2 && req.files.image2[0];
        const image3 = req.files?.image3 && req.files.image3[0];
        const image4 = req.files?.image4 && req.files.image4[0];

        //
        const images = [image1, image2, image3, image4].filter( (img) => img !== undefined )

        let imagesUrl = await Promise.all(
            images.map( async (img) => {
                let response = await cloudinary.uploader.upload(img.path, {
                    resource_type: 'image',
                    format: 'avif',          // Force WebP conversion
                    quality: 'auto:good',    // Balances quality & file size
                    crop: 'limit'            // Prevents stretching
                });
                return response.secure_url;
            } )
        )
        
        const productData = {
            name,
            description,
            category,
            price,
            subCategory,
            bestseller: bestseller === "true" ? true : false,
            sizes,
            image: imagesUrl,
            date: Date.now()
        };

        const product = new Product(productData);
        await product.save();
        
        res.status(201).json({
            success: true,
            message: 'Product added successfully',
            product
        });

    } catch (error) {
        console.log(error);
    };
}

// All Products Function
const allProducts = async (req, res) => {
    const products = await Product.find();
    return res.json(products)
}

// Remove Product Function
const removeProduct = async (req, res) => {
    const product = await Product.findByIdAndDelete(req.params.productId);
    return res.status(200).json(product);
}

// Single Product info Function
const singleProduct = async (req, res) => {
    const product = await Product.findById(req.params.productId);
    return res.status(200).json(product)
};

module.exports = {
    addProduct,
    allProducts,
    removeProduct,
    singleProduct
};