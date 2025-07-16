const express = require('express');

const router = express.Router();

// Product Controller Functions
const { 
    addProduct, 
    allProducts, 
    removeProduct, 
    singleProduct 
} = require('../controllers/productController');

const upload = require('../middleware/multer');
const adminAuth = require('../middleware/adminAuth');

router.post('/add', adminAuth, upload.fields([
    {
        name: 'image1', 
        maxCount: 1
    },
    {
        name: 'image2', 
        maxCount: 2
    },
    {
        name: 'image3', 
        maxCount: 3
    },
    {
        name: 'image4', 
        maxCount: 4
    },
]), addProduct);

router.get('/all', adminAuth, allProducts);
router.delete('/remove/:productId', adminAuth, removeProduct);
router.get('/single/:productId', adminAuth, singleProduct);

module.exports = router;