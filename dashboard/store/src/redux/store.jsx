// src/redux/store.js
import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Default to localStorage
import productReducer from './productSile'; // Import the new product reducer
// import authReducer from './authSlice';
// import customerReducer from './customerSlice'
import categoryReducer from './categorySlice'
// import orderReducer from './orderSlice';
// import orderItemsReducer from './orderItemsSlice';
const persistConfig = {
  key: 'root',
  storage,
  // whitelist: ['auth', 'products'], // Add reducers you want to persist
};

const rootReducer = {
//   auth: authReducer,
  products: productReducer,
  categories: categoryReducer
//   customers: customerReducer, 
//   orders: orderReducer,
//   orderItems: orderItemsReducer,
};

const persistedReducer = persistReducer(persistConfig, combineReducers(rootReducer));

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
