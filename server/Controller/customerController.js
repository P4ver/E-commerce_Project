const pool = require('../db');

// Get all customers
const getCustomers = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query('SELECT * FROM customers', (err, rows) => {
            connection.release();
            if (err) throw err;
            res.json(rows);
        });
    });
};

// Get customer by ID
const getCustomerById = (req, res) => {
    const { id } = req.params;
    pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query('SELECT * FROM customers WHERE id = ?', [id], (err, row) => {
            connection.release();
            if (err) throw err;
            res.json(row);
        });
    });
};

// Get orders by customer ID
const getCustomerOrders = (req, res) => {
    const { id } = req.params;
    pool.getConnection((err, connection) => {
        if (err) throw err;
        const query = 'SELECT * FROM orders WHERE customer_id = ?';
        connection.query(query, [id], (err, rows) => {
            connection.release();
            if (err) throw err;
            res.json(rows);
        });
    });
};

// Create a new customer
const createCustomer = (req, res) => {
    const { name, email, phone, address } = req.body;
    pool.getConnection((err, connection) => {
        if (err) throw err;
        const query = 'INSERT INTO customers (name, email, phone, address) VALUES (?, ?, ?, ?)';
        connection.query(query, [name, email, phone, address], (err, result) => {
            connection.release();
            if (err) throw err;
            res.status(201).json({ id: result.insertId, name, email, phone, address });
        });
    });
};

// Update customer information
const updateCustomer = (req, res) => {
    const { id } = req.params;
    const { name, email, phone, address } = req.body;
    pool.getConnection((err, connection) => {
        if (err) throw err;
        const query = 'UPDATE customers SET name = ?, email = ?, phone = ?, address = ? WHERE id = ?';
        connection.query(query, [name, email, phone, address, id], (err, result) => {
            connection.release();
            if (err) throw err;
            res.status(200).json({ message: 'Customer updated successfully' });
        });
    });
};

// Delete a customer
const deleteCustomer = (req, res) => {
    const { id } = req.params;
    pool.getConnection((err, connection) => {
        if (err) throw err;
        const query = 'DELETE FROM customers WHERE id = ?';
        connection.query(query, [id], (err, result) => {
            connection.release();
            if (err) throw err;
            res.status(200).json({ message: 'Customer deleted successfully' });
        });
    });
};



module.exports = {
    getCustomers,
    getCustomerById,
    getCustomerOrders,
    createCustomer,
    updateCustomer,
    deleteCustomer,
};
