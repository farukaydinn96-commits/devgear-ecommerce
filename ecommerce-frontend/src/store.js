import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import authReducer from './slices/authSlice'; // YENİ EKLENDİ

const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer, // YENİ EKLENDİ
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;