const pool = require('../db');

const getOrderItems = (req, res) => {
    const { order_id } = req.params;
    const query = `SELECT * FROM order_items WHERE order_id = ${order_id}`;

    pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query(query, (err, rows) => {
            connection.release();
            if (err) throw err;
            res.json(rows);
        });
    });
};

// const createOrderItem = (req, res) => {
//     const { order_id, product_id, quantity, price } = req.body;
//     const query = `INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (${order_id}, ${product_id}, ${quantity}, ${price})`;

//     pool.getConnection((err, connection) => {
//         if (err) throw err;
//         connection.query(query, (err, result) => {
//             connection.release();
//             if (err) throw err;
//             res.status(201).json({ message: 'Order item created successfully', orderItemId: result.insertId });
//         });
//     });
// };
const createOrderItems = (req, res) => {
    const { order_id } = req.params;
    const orderItems = req.body.orderItems;

    const query = 'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ?';

    const values = orderItems.map(item => [order_id, item.product_id, item.quantity, item.price]);

    pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query(query, [values], (err, result) => {
            connection.release();
            if (err) throw err;
            res.status(201).json({ message: 'Order items created successfully' });
        });
    });
};

const updateOrderItem = (req, res) => {
    const { order_item_id } = req.params;
    const { product_id, quantity, price } = req.body;
    const query = `UPDATE order_items SET product_id = ${product_id}, quantity = ${quantity}, price = ${price} WHERE order_item_id = ${order_item_id}`;

    pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query(query, (err, result) => {
            connection.release();
            if (err) throw err;

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Order item not found' });
            }

            res.status(200).json({ message: 'Order item updated successfully' });
        });
    });
};

const deleteOrderItem = (req, res) => {
    const { order_item_id } = req.params;
    const query = `DELETE FROM order_items WHERE order_item_id = ${order_item_id}`;

    pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query(query, (err, result) => {
            connection.release();
            if (err) throw err;

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Order item not found' });
            }

            res.status(200).json({ message: 'Order item deleted successfully' });
        });
    });
};

module.exports = {
    getOrderItems,
    createOrderItems,
    updateOrderItem,
    deleteOrderItem,
};
