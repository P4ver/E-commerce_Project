// src/redux/productSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_LINK } from '../API_LINK';

// Async action to fetch products
export const fetchProducts = createAsyncThunk('products/fetchAll', async (_, thunkAPI) => {
  try {
    const response = await axios.get(`${API_LINK}/products`);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

// Async action to add a new product
export const addProduct = createAsyncThunk('products/add', async (productData, thunkAPI) => {
  try {
    const response = await axios.post(`${API_LINK}/products`, productData);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

// Async action to update a product
export const updateProduct = createAsyncThunk('products/update', async ({ id, updatedData }, thunkAPI) => {
  try {
    const response = await axios.put(`${API_LINK}/products/${id}`, updatedData,{
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

// Async action to delete a product
export const deleteProduct = createAsyncThunk('products/delete', async (id, thunkAPI) => {
  try {
    const response = await axios.delete(`${API_LINK}/products/${id}`);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

// Async action to fetch products by category
export const getProductsByCategory = createAsyncThunk('products/fetchByCategory', async (categoryId, thunkAPI) => {
  try {
    const response = await axios.get(`${API_LINK}/categories/${categoryId}/products`);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    resetProductState: (state) => {
      state.products = [];
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch products
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Add product
      .addCase(addProduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products.push(action.payload); // Add the new product to the list
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Update product
      .addCase(updateProduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.products.findIndex(product => product.id === action.payload.id);
        if (index !== -1) {
          state.products[index] = action.payload; // Update the product in the list
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Delete product
      .addCase(deleteProduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = state.products.filter(product => product.id !== action.payload.id); // Remove the deleted product
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Get products by category
      .addCase(getProductsByCategory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getProductsByCategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload; // Set the products filtered by category
      })
      .addCase(getProductsByCategory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { resetProductState } = productSlice.actions;
export default productSlice.reducer;
