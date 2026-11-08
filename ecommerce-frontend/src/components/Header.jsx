import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../slices/authSlice';
import SearchBox from './SearchBox'; // ARAMA ÇUBUĞUNU İÇERİ ALDIK

const Header = ({ theme, isDarkMode, setIsDarkMode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, [isDarkMode]);

  const logoutHandler = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <>
      <header style={{ backgroundColor: theme.bgCard, borderBottom: `1px solid ${theme.borderColor}`, padding: '15px 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 100, transition: 'all 0.3s ease' }}>
        
        {/* LOGO VE MENÜ BUTONU */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '25px', flex: '1' }}>
          <button onClick={() => setIsSidebarOpen(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '5px', padding: '5px' }}>
            <div style={{ width: '24px', height: '2px', backgroundColor: theme.textMain, borderRadius: '2px' }}></div>
            <div style={{ width: '24px', height: '2px', backgroundColor: theme.textMain, borderRadius: '2px' }}></div>
            <div style={{ width: '24px', height: '2px', backgroundColor: theme.textMain, borderRadius: '2px' }}></div>
          </button>
          <Link to="/" style={{ textDecoration: 'none', color: theme.textMain, fontSize: '26px', fontWeight: '900', letterSpacing: '-1px' }}>
            DevGear<span style={{ color: '#3b82f6' }}>.</span>
          </Link>
        </div>

        {/* ORTADAKİ ARAMA ÇUBUĞU (YENİ EKLENDİ) */}
        <SearchBox theme={theme} />

        {/* KULLANICI VE SEPET BUTONLARI */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '25px', flex: '1', justifyContent: 'flex-end' }}>
          <button onClick={() => setIsDarkMode(!isDarkMode)} style={{ background: 'none', border: 'none', fontSize: '22px', cursor: 'pointer', padding: '5px' }}>
            {isDarkMode ? '☀️' : '🌙'}
          </button>

          <Link to="/cart" style={{ textDecoration: 'none', color: theme.textMain, fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px' }}>
            🛒 Cart
            {cartItems.length > 0 && (
              <span style={{ backgroundColor: '#ef4444', color: 'white', borderRadius: '50%', padding: '2px 8px', fontSize: '12px', fontWeight: 'bold' }}>
                {cartItems.reduce((a, c) => a + c.qty, 0)}
              </span>
            )}
          </Link>

          {userInfo ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <span style={{ color: theme.textMain, fontWeight: '500', whiteSpace: 'nowrap' }}>Hello, {userInfo.name}</span>
              <button onClick={logoutHandler} style={{ backgroundColor: 'transparent', color: theme.textMain, border: `1px solid ${theme.borderColor}`, padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}>
                Sign Out
              </button>
            </div>
          ) : (
            <Link to="/login" style={{ textDecoration: 'none', color: theme.bgCard, backgroundColor: theme.textMain, padding: '10px 20px', borderRadius: '6px', fontWeight: '600' }}>
              Sign In
            </Link>
          )}
        </div>
      </header>

      {/* YAN MENÜ */}
      {isSidebarOpen && (
        <>
          <div onClick={() => setIsSidebarOpen(false)} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 999, backdropFilter: 'blur(4px)' }}></div>
          <div style={{ position: 'fixed', top: 0, left: 0, width: '320px', height: '100%', backgroundColor: theme.bgCard, zIndex: 1000, boxShadow: '4px 0 25px rgba(0,0,0,0.3)', padding: '30px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
              <h2 style={{ margin: 0, color: theme.textMain, fontSize: '24px', fontWeight: '800' }}>Menu</h2>
              <button onClick={() => setIsSidebarOpen(false)} style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: theme.textMuted }}>✕</button>
            </div>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {['All Products', 'Computers', 'Audio', 'Accessories', 'Monitors', 'Tablets', 'Wearables'].map(cat => (
                <Link key={cat} to={cat === 'All Products' ? '/' : `/category/${cat}`} onClick={() => setIsSidebarOpen(false)} style={{ textDecoration: 'none', color: theme.textMain, fontSize: '18px', fontWeight: '500', padding: '10px 0', borderBottom: `1px solid ${theme.borderColor}` }}>
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