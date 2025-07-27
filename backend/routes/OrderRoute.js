const express = require('express');
const router = express.Router();

const { createOrder, getUserOrders, updateStatus, getAdminOrders } = require("../controllers/orderController");


// Public Route ( guest checkout )
router.post('/placeOrder', createOrder);;

// User Routes
router.get('/myOrders', getUserOrders);

// Admin Routes
router.put('/:orderId/status', updateStatus);
router.get('/adminOrders', getAdminOrders)

module.exports = router;