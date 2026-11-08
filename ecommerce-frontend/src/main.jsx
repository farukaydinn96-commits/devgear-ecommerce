import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'; // YENİ EKLENDİ
import store from './store.js'; // YENİ EKLENDİ
import App from './App.jsx';
import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'https://devgear-api.onrender.com';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Tüm uygulamayı Redux Provider ile sarmalıyoruz */}
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);