// src/redux/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_LINK } from '../API_LINK';

// Async action for user registration
export const registerUser = createAsyncThunk('auth/register', async (userData, thunkAPI) => {
  try {
    const response = await axios.post(`${API_LINK}/register`, userData);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

// Async action for user login
export const loginUser = createAsyncThunk('auth/login', async (userData, thunkAPI) => {
  try {
    const response = await axios.post(`${API_LINK}/login`, userData, { withCredentials: true });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

// Async action for user logout
export const logoutUser = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    const response = await axios.post('/api/logout', null, { withCredentials: true });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: false,
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    resetState: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      // Registration
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Login
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const { resetState } = authSlice.actions;
export default authSlice.reducer;

// src/redux/authSlice.js
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
// import { API_LINK } from '../API_LINK';
// // Async action for user registration


// // Async action for user login
// export const loginUser = createAsyncThunk('auth/login', async (userData, thunkAPI) => {
//   try {
//     const response = await axios.post(`${API_LINK}/login`, userData, { withCredentials: true });
//     return response.data;
//   } catch (error) {
//     return thunkAPI.rejectWithValue(error.response.data.message);
//   }
// });

// // Async action for user logout


// const authSlice = createSlice({
//   name: 'auth',
//   initialState: {
//     user: null,
//     isAuthenticated: false,
//     status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
//     error: null,
//   },
//   reducers: {
//     resetState: (state) => {
//       state.user = null;
//       state.isAuthenticated = false;
//       state.error = null;
//       state.status = 'idle';
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // Registration
//       // Login
//       .addCase(loginUser.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.isAuthenticated = true;
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload;
//       })
//       // Logout
//   },
// });

// export const { resetState } = authSlice.actions;
// export default authSlice.reducer;


