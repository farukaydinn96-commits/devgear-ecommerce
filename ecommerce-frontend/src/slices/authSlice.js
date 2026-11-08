import { createSlice } from '@reduxjs/toolkit';

// Kullanıcı sayfayı yenilese bile oturumu açık kalsın diye localStorage'dan okuyoruz
const initialState = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Giriş yapıldığında bilgileri Redux'a ve tarayıcıya kaydet
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
    },
    // Çıkış yapıldığında bilgileri sil
    logout: (state) => {
      state.userInfo = null;
      localStorage.removeItem('userInfo');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;