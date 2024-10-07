import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../redux/orderSlice'; // Adjust the path as necessary

const Orders = () => {
  const dispatch = useDispatch();
  const [customerId, setCustomerId] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [status, setStatus] = useState('pending'); // Default status

  const orderStatus = useSelector((state) => state.orders.status); // Access order status from Redux store
  const orderError = useSelector((state) => state.orders.error); // Access any error from Redux store

  const handleAddOrder = (e) => {
    e.preventDefault(); // Prevent default form submission
    // Dispatch create order action with customer ID, total amount, and status
    dispatch(createOrder({ customer_id: customerId, total_amount: totalAmount, status }));

    // Resetting input fields
    setCustomerId('');
    setTotalAmount('');
    setStatus('pending'); // Reset status to default
  };

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">Create New Order</h2>
      {orderError && <p className="text-red-500">{orderError}</p>} {/* Show error message if exists */}
      <form onSubmit={handleAddOrder} className="flex flex-col">
        <div className="mb-2">
          <label htmlFor="customerId" className="block">Customer ID:</label>
          <input
            type="text"
            id="customerId"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            required
            className="border border-gray-300 p-2 rounded"
          />
        </div>
        <div className="mb-2">
          <label htmlFor="totalAmount" className="block">Total Amount:</label>
          <input
            type="number"
            id="totalAmount"
            value={totalAmount}
            onChange={(e) => setTotalAmount(e.target.value)}
            required
            className="border border-gray-300 p-2 rounded"
          />
        </div>
        <div className="mb-2">
          <label htmlFor="status" className="block">Status:</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border border-gray-300 p-2 rounded"
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="canceled">Canceled</option>
          </select>
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Create Order
        </button>
      </form>
      {orderStatus === 'loading' && <p className="text-blue-500">Creating order...</p>} {/* Show loading state */}
    </div>
  );
};

export default Orders;
