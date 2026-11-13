import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../slices/authSlice';
import SearchBox from './SearchBox';

const Header = ({ theme, isDarkMode, setIsDarkMode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const logoutHandler = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <>
      <header style={{ backgroundColor: theme.bgCard, borderBottom: `1px solid ${theme.borderColor}`, padding: '14px 4%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 100, gap: '16px', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <button onClick={() => setIsSidebarOpen(true)} aria-label="Menu" style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '5px', padding: '5px' }}>
            <div style={{ width: '22px', height: '2px', backgroundColor: theme.textMain }} />
            <div style={{ width: '22px', height: '2px', backgroundColor: theme.textMain }} />
            <div style={{ width: '22px', height: '2px', backgroundColor: theme.textMain }} />
          </button>
          <Link to="/" style={{ textDecoration: 'none', color: theme.textMain, fontSize: '26px', fontWeight: '900', letterSpacing: '-1px' }}>
            DevGear<span style={{ color: '#3b82f6' }}>.</span>
          </Link>
        </div>

        <SearchBox theme={theme} />

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
          <button onClick={() => setIsDarkMode(!isDarkMode)} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}>
            {isDarkMode ? '☀️' : '🌙'}
          </button>
          <Link to="/orders" style={{ textDecoration: 'none', color: theme.textMain, fontSize: '14px', fontWeight: '600' }}>📦 Orders</Link>
          <Link to="/admin" style={{ textDecoration: 'none', color: '#3b82f6', fontSize: '14px', fontWeight: '700' }}>⚡ Admin</Link>
          <Link to="/cart" style={{ textDecoration: 'none', color: theme.textMain, fontWeight: '700', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            🛒 Cart
            {cartItems.length > 0 && (
              <span style={{ backgroundColor: '#2563eb', color: 'white', borderRadius: '999px', padding: '2px 8px', fontSize: '12px', fontWeight: '800' }}>
                {cartItems.reduce((a, c) => a + Number(c.qty), 0)}
              </span>
            )}
          </Link>
          {userInfo ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ color: theme.textMain, fontSize: '13px', fontWeight: '600' }}>👤 {userInfo.name}</span>
              <button onClick={logoutHandler} style={{ backgroundColor: 'transparent', color: theme.textMain, border: `1px solid ${theme.borderColor}`, padding: '7px 13px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: '600' }}>
                Sign Out
              </button>
            </div>
          ) : (
            <Link to="/login" style={{ textDecoration: 'none', color: theme.bgCard, backgroundColor: theme.textMain, padding: '8px 16px', borderRadius: '6px', fontSize: '13px', fontWeight: '700' }}>
              Sign In
            </Link>
          )}
        </div>
      </header>

      {isSidebarOpen && (
        <>
          <div onClick={() => setIsSidebarOpen(false)} style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 999 }} />
          <div style={{ position: 'fixed', top: 0, left: 0, width: '300px', height: '100%', backgroundColor: theme.bgCard, zIndex: 1000, padding: '28px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
              <h2 style={{ margin: 0, color: theme.textMain, fontSize: '22px', fontWeight: '800' }}>Categories</h2>
              <button onClick={() => setIsSidebarOpen(false)} style={{ background: 'none', border: 'none', fontSize: '22px', cursor: 'pointer', color: theme.textMuted }}>✕</button>
            </div>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {['All Products', 'Computers', 'Monitors', 'Audio', 'Accessories', 'Tablets', 'Wearables'].map((cat) => (
                <Link key={cat} to={cat === 'All Products' ? '/' : `/category/${cat}`} onClick={() => setIsSidebarOpen(false)} style={{ textDecoration: 'none', color: theme.textMain, fontSize: '16px', fontWeight: '600', padding: '10px 0', borderBottom: `1px solid ${theme.borderColor}` }}>
                  {cat}
                </Link>
              ))}
            </nav>
          </div>
        </>
      )}
    </>
  );
};

export default Header;
