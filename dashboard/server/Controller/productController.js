const pool = require('../db');

// Get all products
const getProducts = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query('SELECT * FROM products', (err, rows) => {
            connection.release();
            if (err) throw err;
            res.send(rows);
        });
    });
};

// Get product by ID
const getProductById = (req, res) => {
    const { id } = req.params;
    pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query('SELECT * FROM products WHERE id = ?', [id], (err, row) => {
            connection.release();
            if (err) throw err;
            res.send(row);
        });
    });
};

// Create a new product
const createProduct = (req, res) => {
    const { name, price, description } = req.body;
    pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query('INSERT INTO products (name, price, description) VALUES (?, ?, ?)', [name, price, description], (err, result) => {
            connection.release();
            if (err) throw err;
            res.send({ id: result.insertId, name, price, description });
        });
    });
};

// Update a product
const updateProduct = (req, res) => {
    const { id } = req.params;
    const { name, price, description } = req.body;
    pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query('UPDATE products SET name = ?, price = ?, description = ? WHERE id = ?', [name, price, description, id], (err, result) => {
            connection.release();
            if (err) throw err;
            res.send({ id, name, price, description });
        });
    });
};

// Delete a product
const deleteProduct = (req, res) => {
    const { id } = req.params;
    pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query('DELETE FROM products WHERE id = ?', [id], (err, result) => {
            connection.release();
            if (err) throw err;
            res.send({ message: `Product with ID ${id} deleted successfully` });
        });
    });
};

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};
