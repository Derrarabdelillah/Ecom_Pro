const User = require('../models/User');

// add to user cart
const addToCart = async (req, res) => {

    try {

        const user = await User.findById(req.userId);
        const { itemId, attributes } = req.body;

        // Validate required fields
        if (!itemId || !attributes) {
            return res.status(400).json({
                success: false,
                message: "Item ID and attributes are required"
            });
        }

        // If no cart exists, create one
        if (!user.cartData) {
            user.cartData = {};
        }

        // If Product not in cart, add it
        if (!user.cartData[itemId]) {
            user.cartData[itemId] = {};
        }

        // Initialize or increment quantity
        if (!user.cartData[itemId][attributes]) {
            user.cartData[itemId][attributes] = 1;
        } else {
            user.cartData[itemId][attributes] += 1;
        }

        user.markModified('cartData');

        // Save The cart on the DataBase
        await user.save();

        res.json({ success: true, cart: user.cartData })

    } catch (error) {
        console.log('Add To Cart Error' + error);
        res.status(500).json({ success: false, message: "Error adding to cart" })
    }

}

// update user cart
const updateCart = async (req, res) => {

    try {

        const user = await User.findById(req.userId);
        const { itemId, attributes, quantity } = req.body;

        // 1. Validate input
        if (!itemId || !attributes || quantity === undefined || quantity < 0) {
            return res.status(400).json({
                success: false,
                message: "Missing item ID, attributes, or invalid quantity"
            });
        }

        // 2. Find user with cartData initialized
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        user.cartData[itemId][attributes] = quantity


        user.markModified('cartData');
        // Save the updated product the DB
        await user.save();

        res.json({ success: true, cart: user.cartData, message: "Cart Updated" })

    } catch (error) {
        console.log('Update Cart Error ' + error);
        res.status(500).json({ success: false, message: "Error on updating the product" })
    }

}

// get user cart
const getUserCart = async (req, res) => {
    try {

        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
                code: "USER_NOT_FOUND"
            });
        }

        const cartData = await user.cartData;

        res.json({ success: true, cartData })

    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, message: "Cannot get the cart data" })
    }
}

module.exports = {
    addToCart,
    updateCart,
    getUserCart
}