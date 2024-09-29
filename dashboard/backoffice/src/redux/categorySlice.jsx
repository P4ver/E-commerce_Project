import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_LINK } from '../API_LINK';

// Async action to fetch categories
export const fetchCategories = createAsyncThunk('categories/fetchAll', async (_, thunkAPI) => {
  try {
    const response = await axios.get(`${API_LINK}/categories`);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

// Async action to add a new category
export const addCategory = createAsyncThunk('categories/add', async (categoryData, thunkAPI) => {
  try {
    const response = await axios.post(`${API_LINK}/categories`, categoryData);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

// Async action to update a category
export const updateCategory = createAsyncThunk('categories/update', async ({ id, updatedData }, thunkAPI) => {
  try {
    const response = await axios.put(`${API_LINK}/categories/${id}`, updatedData);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

// Async action to delete a category
export const deleteCategory = createAsyncThunk('categories/delete', async (id, thunkAPI) => {
  try {
    const response = await axios.delete(`${API_LINK}/categories/${id}`);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

// Async action to assign a category to a product
export const assignCategoryToProductThunk = createAsyncThunk('categories/assignToProduct', async ({ product_id, category_id }, thunkAPI) => {
    try {
      const response = await axios.post(`${API_LINK}/categories/assign`, { product_id, category_id });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  });

const categorySlice = createSlice({
  name: 'categories',
  initialState: {
    categories: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    resetCategoryState: (state) => {
      state.categories = [];
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch categories
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Add category
      .addCase(addCategory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories.push(action.payload); // Add the new category to the list
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Update category
      .addCase(updateCategory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.categories.findIndex(category => category.id === action.payload.id);
        if (index !== -1) {
          state.categories[index] = action.payload; // Update the category in the list
        }
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Delete category
      .addCase(deleteCategory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories = state.categories.filter(category => category.id !== action.payload.id); // Remove the deleted category
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Assign category to product
      .addCase(assignCategoryToProductThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(assignCategoryToProductThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // You can handle success messages or states here
      })
      .addCase(assignCategoryToProductThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });      
  },
});

export const { resetCategoryState } = categorySlice.actions;
export default categorySlice.reducer;
