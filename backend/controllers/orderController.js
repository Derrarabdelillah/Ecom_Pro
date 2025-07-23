const Order = require('../models/Order');
const Product = require('../models/Product');
const { algerianWilayas } = require('../data/algeriaWilayas');

// Create New Order
const createOrder = async (req, res) => {
    try {

        const { products, deliveryInfos, customer } = req.body;

        if ( !products ) {
            res.status(404).json({success: false, message: "No Products Founded!"})
        }
        
        if ( !deliveryInfos ) {
            res.status(404).json({success: false, message: "No deliveryInfos Founded!"})
        }

        const orderData = {
            customer: customer,
            products,
            deliveryInfos, // This Contain All delivery infos, that will send from the front end
            date: new Date().toISOString().split('T')[0]
        }

        const newOrder = new Order(orderData);

        // save the order on DB
        await newOrder.save();

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