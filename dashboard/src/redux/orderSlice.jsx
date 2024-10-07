// src/redux/orderSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_LINK } from '../API_LINK';

// Async action to fetch all orders
export const fetchOrders = createAsyncThunk('orders/fetchAll', async (_, thunkAPI) => {
  try {
    const response = await axios.get(`${API_LINK}/orders`);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

// Async action to create a new order
export const createOrder = createAsyncThunk('orders/create', async (orderData, thunkAPI) => {
  try {
    const response = await axios.post(`${API_LINK}/orders`, orderData);
    return response.data; // Return the created order
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

// Async action to update an order
export const updateOrder = createAsyncThunk('orders/update', async ({ id, updatedData }, thunkAPI) => {
  try {
    const response = await axios.put(`${API_LINK}/orders/${id}`, updatedData);
    return response.data; // Return the updated order
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

// Async action to delete an order
export const deleteOrder = createAsyncThunk('orders/delete', async (id, thunkAPI) => {
  try {
    const response = await axios.delete(`${API_LINK}/orders/${id}`);
    return response.data; // Return the deleted order id
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

const orderSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    resetOrderState: (state) => {
      state.orders = [];
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(createOrder.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.orders.push(action.payload); // Add the new order to the list
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(updateOrder.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.orders.findIndex(order => order.id === action.payload.id);
        if (index !== -1) {
          state.orders[index] = action.payload; // Update the order in the list
        }
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(deleteOrder.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.orders = state.orders.filter(order => order.id !== action.payload.id); // Remove the deleted order
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { resetOrderState } = orderSlice.actions;
export default orderSlice.reducer;
