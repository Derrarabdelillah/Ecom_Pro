const express = require('express');

const router = express.Router();

const { addToCart, updateCart, getUserCart } = require('../controllers/cartController');
const authUser = require('../middleware/auth');


router.get('/get', authUser, getUserCart)
router.post('/add', authUser, addToCart),
router.put('/update', authUser, updateCart)
// router.delete('/remove', authUser, removeFromCart)

module.exports = router;