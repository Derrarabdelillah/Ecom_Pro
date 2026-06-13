const express = require('express');

const router = express.Router();

// Product Controller Functions
const {
    addProduct,
    allProducts,
    removeProduct,
    singleProduct,
    updateProduct
} = require('../controllers/productController');

const upload = require('../middleware/multer');
const { adminAuth } = require('../middleware/adminAuth');

router.post('/add', upload.fields([
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

router.get('/all', allProducts);
router.delete('/remove/:id', removeProduct);
router.get('/single/:id', singleProduct);
router.put('/update/:id', upload.fields([
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
]), updateProduct);


module.exports = router;