// src/redux/store.js
import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Default to localStorage
import authReducer from './authSlice';
import productReducer from './productSile'; // Import the new product reducer
import customerReducer from './customerSlice'
const persistConfig = {
  key: 'root',
  storage,
  // whitelist: ['auth', 'products'], // Add reducers you want to persist
};

const rootReducer = {
  auth: authReducer,
  products: productReducer,
  customers: customerReducer, 
};

const persistedReducer = persistReducer(persistConfig, combineReducers(rootReducer));

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
