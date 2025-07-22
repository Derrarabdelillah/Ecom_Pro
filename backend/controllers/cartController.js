const User = require('../models/User');

// add to user cart
const addToCart = async (req, res) => {
    
    try {
        
        const user = await User.findById(req.userId);
        const { itemId, size } = req.body;

        // Validate required fields
        if (!itemId || !size) {
            return res.status(400).json({ 
                success: false, 
                message: "Item ID and size are required" 
            });
        }

        // If no cart exists, create one
        if ( !user.cartData ) {
            user.cartData = {};
        }

        // If Product not in cart, add it
        if (!user.cartData[itemId]) {
            user.cartData[itemId] = {};
        }
        
        // Initialize or increment quantity
        if ( !user.cartData[itemId][size] ) {
            user.cartData[itemId][size] = 1;
        } else {
            user.cartData[itemId][size] += 1;
        }

        user.markModified('cartData');

        // Save The cart on the DataBase
        await user.save();

        res.json({success: true, cart:user.cartData})

    } catch (error) {
        console.log('Add To Cart Error' + error);
        res.status(500).json({ success: false, message: "Error adding to cart" })
    }
    
}

// update user cart
const updateCart = async (req, res) => {
    
    
    
}

// get user cart
const getUserCart = async (req, res) => {
    
}

module.exports = {
    addToCart,
    updateCart,
    getUserCart
}