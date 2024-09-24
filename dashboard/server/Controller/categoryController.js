const pool = require('../db');

// Get all categories
const getCategories = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query('SELECT * FROM categories', (err, rows) => {
            connection.release();
            if (err) throw err;
            res.json(rows);
        });
    });
};

// Get category by ID
const getCategoryById = (req, res) => {
    const { id } = req.params;
    pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query('SELECT * FROM categories WHERE id = ?', [id], (err, row) => {
            connection.release();
            if (err) throw err;
            res.json(row);
        });
    });
};

// Create a new category
const createCategory = (req, res) => {
    const { name, description } = req.body;
    pool.getConnection((err, connection) => {
        if (err) throw err;
        const query = 'INSERT INTO categories (name, description) VALUES (?, ?)';
        connection.query(query, [name, description], (err, result) => {
            connection.release();
            if (err) throw err;
            res.status(201).json({ id: result.insertId, name, description });
        });
    });
};

// Update a category
const updateCategory = (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    pool.getConnection((err, connection) => {
        if (err) throw err;
        const query = 'UPDATE categories SET name = ?, description = ? WHERE id = ?';
        connection.query(query, [name, description, id], (err, result) => {
            connection.release();
            if (err) throw err;
            res.status(200).json({ message: 'Category updated successfully' });
        });
    });
};

// Delete a category
const deleteCategory = (req, res) => {
    const { id } = req.params;
    pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query('DELETE FROM categories WHERE id = ?', [id], (err, result) => {
            connection.release();
            if (err) throw err;
            res.status(200).json({ message: 'Category deleted successfully' });
        });
    });
};

// Assign a category to a product
const assignCategoryToProduct = (req, res) => {
    const { product_id, category_id } = req.body;
    pool.getConnection((err, connection) => {
        if (err) throw err;
        const query = 'INSERT INTO product_categories (product_id, category_id) VALUES (?, ?)';
        connection.query(query, [product_id, category_id], (err, result) => {
            connection.release();
            if (err) throw err;
            res.status(201).json({ message: 'Product assigned to category' });
        });
    });
};

module.exports = {
    getCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
    assignCategoryToProduct,
};
