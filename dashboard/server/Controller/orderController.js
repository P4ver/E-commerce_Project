const pool = require('../db');


// POST /api/orders
const getOrders = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query('SELECT * FROM orders', (err, rows) => {
            connection.release();
            if (err) throw err;
            res.json(rows);
        });
    });
};

const createOrder = (req, res) => {
    const { total, status } = req.body;
    const query = 'INSERT INTO orders ( total, status) VALUES (?, ?)';

    pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query(query, [total, status], (err, result) => {
            connection.release();
            if (err) throw err;
            res.status(201).json({ id: result.insertId, total, status });
        });
    });
};

const deleteOrder = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM orders WHERE id = ?';

    pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query(query, [id], (err, result) => {
            connection.release();
            if (err) throw err;

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Order not found' });
            }

            res.status(200).json({ message: 'Order deleted successfully' });
        });
    });
};


const updateOrder = (req, res) => {
    const { id } = req.params;
    const { total, status } = req.body;
    const query = 'UPDATE orders SET total = ?, status = ? WHERE id = ?';

    pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query(query, [total, status, id], (err, result) => {
            connection.release();
            if (err) throw err;

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Order not found' });
            }

            res.status(200).json({ message: 'Order updated successfully' });
        });
    });
};

module.exports = {
    getOrders,
    createOrder,
    deleteOrder,
    updateOrder,
}