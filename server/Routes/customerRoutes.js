const express = require('express');
const router = express.Router();
const { getCustomers, getCustomerById, getCustomerOrders, createCustomer, updateCustomer, deleteCustomer } = require('../Controller/customerController');

// GET all customers
router.get('/customers', getCustomers);

// GET customer by ID
router.get('/customers/:id', getCustomerById);

// GET customer orders by customer ID
router.get('/customers/:id/orders', getCustomerOrders);

// POST create a new customer
router.post('/customers', createCustomer);

// PUT update customer information
router.put('/customers/:id', updateCustomer);

// DELETE delete a customer
router.delete('/customers/:id', deleteCustomer);

module.exports = router;
