const express = require('express');
const router = express.Router();

const { createOrder, getUserOrders, updateStatus } = require("../controllers/orderController");
const { adminAuth } = require("../middleware/adminAuth");
const authUser = require("../middleware/auth");

// Public Route ( guest checkout )
router.post('/placeOrder', createOrder);;

// User Routes
router.get('/myOrders', getUserOrders);

//// Admin Routes
// Update Status
router.put('/:id/status', adminAuth, updateStatus);

module.exports = router;