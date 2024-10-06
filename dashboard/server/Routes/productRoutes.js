const express = require('express');
const router = express.Router();
// const productController = require('../Controller/productController');
const { getProducts, getProductById, createProduct, upload, updateProduct, deleteProduct} = require('../Controller/productController');
// Get all products
router.get('/products', getProducts);

// Get product by ID
router.get('/products/:id', getProductById);

// Create a new product
router.post('/products', upload.single('image'),createProduct);

// Update a product
router.put('/products/:id', updateProduct);

// Delete a product
router.delete('/products/:id', deleteProduct);

module.exports = router;
