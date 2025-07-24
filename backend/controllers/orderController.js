const Order = require('../models/Order');
const Product = require('../models/Product');
const { algerianWilayas } = require('../data/algeriaWilayas');

// Create New Order
const createOrder = async (req, res) => {
    try {

        const { products, deliveryInfos, customer, userId } = req.body;

        if ( !products ) {
            res.status(404).json({success: false, message: "No Products Founded!"})
        }
        
        if ( !deliveryInfos ) {
            res.status(404).json({success: false, message: "No deliveryInfos Founded!"})
        }

        const orderData = {
            customer: customer,
            userId: userId,
            products,
            deliveryInfos, // This Contain All delivery infos, that will send from the front end
            paymentMethod: 'Cash On Delivery',
            date: new Date().toISOString().split('T')[0]
        }

        const newOrder = new Order(orderData);

        // save the order on DB
        await newOrder.save();
        res.json({success: true ,orderData})
    } catch (error) {
        console.log(error);
    };
};

// Get User Orders
const getUserOrders = async (req, res) => {

};

// Admin: Update Status
const updateStatus  = async (req, res) => {

};

const getAdminOrders = async (req, res) => {
    const orders = await Order.find();
    res.status(200).json({success: true, orders})
};

module.exports = {
    createOrder,
    getUserOrders,
    updateStatus,
    getAdminOrders
}