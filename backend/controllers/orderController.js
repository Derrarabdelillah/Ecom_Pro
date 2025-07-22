const Order = require('../models/Order');
const Product = require('../models/Product');
const { algerianWilayas } = require('../data/algeriaWilayas');

// Create New Order
const createOrder = async (req, res) => {
    try {
        
        const { products, delivery, guestInfo } = req.body;

        // 1. Calculate Total
        let productsTotal = 0;
        const orderProducts = [];

        for ( const item of products ) {
            const product = await Product.findById(item.productId);

            if ( !product ) {
                throw new Error(`Product ${item.productId} not found`);
            }
            productsTotal += ( product.price * item.quantity ) ;

            orderProducts.push({
                productId: item.productId,
                size: item.size,
                quantity: item.quantity,
                price: product.price
            })
        }

    } catch (error) {
        console.log(error);
    };
};

// Get User Orders
const getUserOrders = async (req, res) => {
    try {
        
    } catch (error) {
        console.log(error);
    };
};

// Admin: Update Status
const updateStatus  = async (req, res) => {
    try {
        
    } catch (error) {
        console.log(error);
    };
};

module.exports = {
    createOrder,
    getUserOrders,
    updateStatus
}