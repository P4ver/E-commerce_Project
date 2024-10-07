const express = require('express');
const router = express.Router();
const { getCategories, getCategoryById, createCategory, updateCategory, deleteCategory, assignCategoryToProduct, getProductsByCategory } = require('../Controller/categoryController');

// GET all categories
router.get('/categories', getCategories);

// GET category by ID
router.get('/categories/:id', getCategoryById);

// POST create a new category
router.post('/categories', createCategory);

// PUT update an existing category
router.put('/categories/:id', updateCategory);

// DELETE delete a category by ID
router.delete('/categories/:id', deleteCategory);

// POST assign a category to a product
router.post('/categories/assign', assignCategoryToProduct);

router.get('/categories/:category_id/products', getProductsByCategory);

module.exports = router;
