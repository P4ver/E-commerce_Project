const express = require('express');
const router = express.Router();
const { getOrderItems, updateOrderItem, deleteOrderItem, createOrderItems } = require('../Controller/orderItemsController');

// Route to get all order items by order ID
router.get('/orders/:order_id/items', getOrderItems);

// Route to create a new order item for a specific order
router.post('/orders/:order_id/items', createOrderItems);

// Route to update an existing order item
router.put('/order_items/:order_item_id', updateOrderItem);

// Route to delete an order item by its ID
router.delete('/order_items/:order_item_id', deleteOrderItem);

module.exports = router;
