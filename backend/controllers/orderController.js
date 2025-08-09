const Order = require('../models/Order');


// Create New Order
const createOrder = async (req, res) => {
    try {

        const { products, deliveryInfos, customer, userId } = req.body;

        if (!products) {
            res.status(404).json({ success: false, message: "No Products Founded!" })
        }

        if (!deliveryInfos) {
            res.status(404).json({ success: false, message: "No deliveryInfos Founded!" })
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
        res.json({ success: true, orderData })
    } catch (error) {
        console.log(error);
    };
};

// // Get User Orders
// const getUserOrders = async (req, res) => {

// };

// Admin: Update Status
const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const { orderId } = req.params;

        // Validate input
        if (!orderId || !status) {
            return res.status(400).json({
                success: false,
                message: "Order ID and status are required"
            });
        }

        const updatedOrder = await Order.findByIdAndUpdate(orderId, {
            status: status,
            updatedAt: new Date()
        });

        // save to the data base
        await updatedOrder.save();

        res.json({ success: true, message: "Order status updated successfully", updatedOrder })

    } catch (error) {
        console.error("Error updating order status:", error);
        res.status(500).json({
            success: false,
            message: "Failed to update order status",
            error: error.message
        });
    }
};

const getAdminOrders = async (req, res) => {
    const orders = await Order.find();
    res.status(200).json({ success: true, orders })
};

module.exports = {
    createOrder,
    // getUserOrders,
    updateStatus,
    getAdminOrders
}