const express = require('express');
const router = express.Router();

const { createOrder, getUserOrders, updateStatus } = require("../controllers/orderController");
const { adminAuth } = require("../middleware/adminAuth");
const { authOptional } = require("../middleware/authOptional");

// Public Route ( guest checkout )
router.post('/', createOrder);;

// User Routes
router.get('/myOrders', authOptional, getUserOrders);

//// Admin Routes
// Update Status
router.put('/:id/status', adminAuth, updateStatus);

module.exports = router;