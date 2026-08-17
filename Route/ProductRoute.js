const express = require('express');
const router = express.Router();
const productController = require('../Controllers/ProductController');

router.post('/createproduct', productController.createProduct);
router.put('/updateproduct/:id', productController.updateProduct);

module.exports = router;