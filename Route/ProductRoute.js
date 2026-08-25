const express = require('express');
const router = express.Router();
const productController = require('../Controllers/ProductController');
//import authenrication middleware
const { protect } = require ('../Middleware/Auth');


router.post('/createproduct', protect, productController.createProduct);
router.put('/updateproduct/:id', productController.updateProduct);
router.get('/getproduct/:id', productController.getAllProductById);
router.get('/getproducts', productController.getAllProducts);

module.exports = router;