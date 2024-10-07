const express = require('express');
const router = express.Router();
const { getOrders, createOrder, updateOrder, deleteOrder } = require('../Controller/orderController');

// GET all orders
router.get('/orders', getOrders);

// POST create a new order
router.post('/orders', createOrder);

// PUT update an order by ID
router.put('/orders/:id', updateOrder);

// DELETE an order by ID
router.delete('/orders/:id', deleteOrder);

module.exports = router;
