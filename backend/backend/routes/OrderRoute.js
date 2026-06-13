const express = require('express');
const router = express.Router();

const { createOrder, updateStatus, getAdminOrders } = require("../controllers/orderController");
const { adminAuth } = require("../middleware/adminAuth");
const authUser = require("../middleware/auth");


// Public Route ( guest checkout )
router.post('/placeOrder', createOrder);;

// User Routes
// router.get('/myOrders', authUser, getUserOrders);

// Admin Routes
router.put('/:orderId/status', updateStatus);
router.get('/adminOrders', getAdminOrders)

module.exports = router;