// src/redux/orderItemsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_LINK } from '../API_LINK';

// Async action to add items to an order
export const addOrderItems = createAsyncThunk('orderItems/add', async ({ orderId, orderItems }, thunkAPI) => {
  try {
    const response = await axios.post(`${API_LINK}/orders/${orderId}/items`, { orderItems });
    return response.data; // Return the added order items
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

// Async action to update an order item
export const updateOrderItem = createAsyncThunk('orderItems/update', async ({ orderId, itemId, updatedData }, thunkAPI) => {
  try {
    const response = await axios.put(`${API_LINK}/orders/${orderId}/items/${itemId}`, updatedData);
    return response.data; // Return the updated order item
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

// Async action to delete an order item
export const deleteOrderItem = createAsyncThunk('orderItems/delete', async ({ orderId, itemId }, thunkAPI) => {
  try {
    const response = await axios.delete(`${API_LINK}/orders/${orderId}/items/${itemId}`);
    return response.data; // Return the deleted order item id
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

const orderItemsSlice = createSlice({
  name: 'orderItems',
  initialState: {
    orderItems: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    resetOrderItemsState: (state) => {
      state.orderItems = [];
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addOrderItems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addOrderItems.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.orderItems.push(...action.payload); // Add the new items to the list
      })
      .addCase(addOrderItems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(updateOrderItem.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateOrderItem.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.orderItems.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.orderItems[index] = action.payload; // Update the order item in the list
        }
      })
      .addCase(updateOrderItem.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(deleteOrderItem.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteOrderItem.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.orderItems = state.orderItems.filter(item => item.id !== action.payload.id); // Remove the deleted order item
      })
      .addCase(deleteOrderItem.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { resetOrderItemsState } = orderItemsSlice.actions;
export default orderItemsSlice.reducer;
