import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import MyOrdersScreen from './screens/MyOrdersScreen';
import AdminScreen from './screens/AdminScreen';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true');

  useEffect(() => {
    localStorage.setItem('darkMode', isDarkMode);
    document.body.style.backgroundColor = isDarkMode ? '#0f172a' : '#f5f7fa';
    document.body.style.color = isDarkMode ? '#f8fafc' : '#111827';
  }, [isDarkMode]);

  const theme = {
    bgMain: isDarkMode ? '#0f172a' : '#f5f7fa',
    bgCard: isDarkMode ? '#1e293b' : '#ffffff',
    textMain: isDarkMode ? '#f8fafc' : '#111827',
    textMuted: isDarkMode ? '#94a3b8' : '#6b7280',
    borderColor: isDarkMode ? '#334155' : '#e5e7eb',
    isDark: isDarkMode
  };

  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header theme={theme} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <main style={{ flex: '1', width: '100%', padding: '20px 1%' }}>
        <Routes>
          <Route path="/" element={<HomeScreen theme={theme} />} />
          <Route path="/search/:keyword" element={<HomeScreen theme={theme} />} />
          <Route path="/page/:pageNumber" element={<HomeScreen theme={theme} />} />
          <Route path="/search/:keyword/page/:pageNumber" element={<HomeScreen theme={theme} />} />
          <Route path="/category/:category" element={<HomeScreen theme={theme} />} />
          <Route path="/product/:id" element={<ProductScreen theme={theme} />} />
          <Route path="/cart" element={<CartScreen theme={theme} />} />
          <Route path="/login" element={<LoginScreen theme={theme} />} />
          <Route path="/shipping" element={<ShippingScreen theme={theme} />} />
          <Route path="/payment" element={<PaymentScreen theme={theme} />} />
          <Route path="/placeorder" element={<PlaceOrderScreen theme={theme} />} />
          <Route path="/order/:id" element={<OrderScreen theme={theme} />} />
          <Route path="/orders" element={<MyOrdersScreen theme={theme} />} />
          <Route path="/admin" element={<AdminScreen theme={theme} />} />
        </Routes>
      </main>
      <footer style={{ textAlign: 'center', padding: '28px', backgroundColor: theme.bgCard, color: theme.textMuted, borderTop: `1px solid ${theme.borderColor}`, marginTop: 'auto' }}>
        <p style={{ margin: 0, fontWeight: '600' }}>DevGear &copy; {new Date().getFullYear()} | Full Stack Developer Hardware Store (MERN + Redis + JWT)</p>
      </footer>
    </div>
  );
}

export default App;
