const express = require('express');

const router = express.Router();

const { addToCart, updateCart, getUserCart } = require('../controllers/cartController');


router.post('/add' , addToCart),
router.put('/update' , updateCart),
router.get('/get' , getUserCart),

module.exports = router;