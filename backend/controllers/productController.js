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
        const bestseller = req.body?.bestseller;
        const stock = req.body?.stock;
        const attributes = req.body?.attributes ? JSON.parse(req.body.attributes) : [];

        // images
        const image1 = req.files?.image1 && req.files.image1[0];
        const image2 = req.files?.image2 && req.files.image2[0];
        const image3 = req.files?.image3 && req.files.image3[0];
        const image4 = req.files?.image4 && req.files.image4[0];

        //
        const images = [image1, image2, image3, image4].filter((img) => img !== undefined)

        let imagesUrl = await Promise.all(
            images.map(async (img) => {
                let response = await cloudinary.uploader.upload(img.path, {
                    resource_type: 'image',
                    format: 'avif',          // Force avif conversion
                    quality: 'auto:good',    // Balances quality & file size
                    crop: 'limit'            // Prevents stretching
                });
                return response.secure_url;
            })
        )

        const productData = {
            name,
            description,
            stock,
            category,
            price,
            subCategory,
            bestseller: bestseller === "true" ? true : false,
            attributes,
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
        res.status(400).json({message: error.message})
    };
}

// All Products Function
const allProducts = async (req, res) => {
    const products = await Product.find();
    return res.json(products)
}

// Remove Product Function
const removeProduct = async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    return res.status(200).json({ success: true, product });
}

// Single Product info Function
const singleProduct = async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    return res.status(200).json({ success: true, product });
};

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }


        const name = req.body?.name;
        const description = req.body?.description;
        const price = req.body?.price;
        const category = req.body?.category;
        const subCategory = req.body?.subCategory;
        const bestseller = req.body?.bestseller;
        const stock = req.body?.stock;
        const attributes = req.body?.attributes ? JSON.parse(req.body.attributes) : [];

        // Get existing Images
        let existingImages = product.image || [];

        // images
        const image1 = req.files?.image1 && req.files.image1[0];
        const image2 = req.files?.image2 && req.files.image2[0];
        const image3 = req.files?.image3 && req.files.image3[0];
        const image4 = req.files?.image4 && req.files.image4[0];
        const newImages = [image1, image2, image3, image4].filter((img) => img !== undefined);

        let newImagesUrls = [];
        if (newImages.length > 0) {
            newImagesUrls = await Promise.all(
                newImages.map(async (img) => {
                    // upload images on cloudinary
                    let response = await cloudinary.uploader.upload(img.path, {
                        resource_type: 'image',
                        format: 'avif',          // Force avif conversion
                        quality: 'auto:good',    // Balances quality & file size
                        crop: 'limit'            // Prevents stretching
                    });
                    return response.secure_url;
                })
            );
        }

        // Combine existing and new images (replace at corresponding positions)
        const updatedImages = [...existingImages];
        if (image1) updatedImages[0] = newImagesUrls[0];
        if (image2) updatedImages[1] = newImagesUrls[1];
        if (image3) updatedImages[2] = newImagesUrls[2];
        if (image4) updatedImages[3] = newImagesUrls[3];

        const updatedProduct = {
            name,
            description,
            stock,
            category,
            price,
            subCategory,
            bestseller: bestseller === "true" ? true : false,
            attributes,
            image: updatedImages.filter((img) => img !== undefined),
            date: Date.now()
        };

        const updatedProductF = await Product.findByIdAndUpdate(id, updatedProduct, { new: true });

        return res.status(200).json({
            success: true,
            message: 'Product updated successfully',
            product: updatedProductF
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Server Error' });
    }
}

module.exports = {
    addProduct,
    allProducts,
    removeProduct,
    singleProduct,
    updateProduct
};