const express = require('express');

const router = express.Router();

const { addToCart, updateCart, getUserCart } = require('../controllers/cartController');
const authUser = require('../middleware/auth');


router.get('/get' , getUserCart)
router.post('/add' , authUser, addToCart),
router.put('/update' , updateCart)

module.exports = router;