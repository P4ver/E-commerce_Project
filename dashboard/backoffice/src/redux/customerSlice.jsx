// src/redux/customerSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_LINK } from '../API_LINK';

// Async action to fetch customers
export const fetchCustomers = createAsyncThunk('customers/fetchAll', async (_, thunkAPI) => {
  try {
    const response = await axios.get(`${API_LINK}/customers`);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

// Async action to add a new customer
export const addCustomer = createAsyncThunk('customers/add', async (customerData, thunkAPI) => {
  try {
    const response = await axios.post(`${API_LINK}/customers`, customerData);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

// Async action to update a customer
export const updateCustomer = createAsyncThunk('customers/update', async ({ id, updatedData }, thunkAPI) => {
  try {
    const response = await axios.put(`${API_LINK}/customers/${id}`, updatedData);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

// Async action to delete a customer
export const deleteCustomer = createAsyncThunk('customers/delete', async (id, thunkAPI) => {
  try {
    const response = await axios.delete(`${API_LINK}/customers/${id}`);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

const customerSlice = createSlice({
  name: 'customers',
  initialState: {
    customers: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    resetCustomerState: (state) => {
      state.customers = [];
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch customers
      .addCase(fetchCustomers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.customers = action.payload;
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Add customer
      .addCase(addCustomer.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addCustomer.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.customers.push(action.payload); // Add the new customer to the list
      })
      .addCase(addCustomer.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Update customer
      .addCase(updateCustomer.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateCustomer.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.customers.findIndex(customer => customer.id === action.payload.id);
        if (index !== -1) {
          state.customers[index] = action.payload; // Update the customer in the list
        }
      })
      .addCase(updateCustomer.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Delete customer
      .addCase(deleteCustomer.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteCustomer.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.customers = state.customers.filter(customer => customer.id !== action.payload.id); // Remove the deleted customer
      })
      .addCase(deleteCustomer.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { resetCustomerState } = customerSlice.actions;
export default customerSlice.reducer;
