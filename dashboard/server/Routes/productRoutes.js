const express = require('express');
const router = express.Router();
const productController = require('../Controller/productController');

// Get all products
router.get('/products', productController.getProducts);

// Get product by ID
router.get('/products/:id', productController.getProductById);

// Create a new product
router.post('/products', productController.createProduct);

// Update a product
router.put('/products/:id', productController.updateProduct);

// Delete a product
router.delete('/products/:id', productController.deleteProduct);

module.exports = router;
