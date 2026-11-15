import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Product from '../components/Product';
import { INITIAL_PRODUCTS, resolveProductData } from '../constants/initialProducts';
import { setCredentials } from '../slices/authSlice';
import { addToCart } from '../slices/cartSlice';

const CATEGORIES = ['All', 'Computers', 'Monitors', 'Audio', 'Accessories', 'Tablets', 'Wearables'];
const PAGE_SIZE = 8;
const CATALOG_STORAGE_KEY = 'devgear_products_en_v6';
const UI_STATE_KEY = 'devgear_catalog_ui_state_v6';

const loadSavedUiState = () => {
  try {
    const raw = sessionStorage.getItem(UI_STATE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { category: 'All', sortBy: 'featured', inStockOnly: false, page: 1 };
};

const HomeScreen = ({ theme }) => {
  const { category: urlCategory, keyword } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const productsRef = useRef(null);

  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const savedUi = loadSavedUiState();

  const [products, setProducts] = useState(() => {
    try {
      const cached = localStorage.getItem(CATALOG_STORAGE_KEY);
      return cached ? JSON.parse(cached) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  const [selectedCategory, setSelectedCategory] = useState(urlCategory || savedUi.category || 'All');
  const [sortBy, setSortBy] = useState(savedUi.sortBy || 'featured');
  const [inStockOnly, setInStockOnly] = useState(Boolean(savedUi.inStockOnly));
  const [currentPage, setCurrentPage] = useState(Number(savedUi.page) || 1);
  const [toast, setToast] = useState('');
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  useEffect(() => {
    if (urlCategory) {
      setSelectedCategory(urlCategory);
      setCurrentPage(1);
    }
  }, [urlCategory]);

  useEffect(() => {
    try {
      sessionStorage.setItem(
        UI_STATE_KEY,
        JSON.stringify({
          category: selectedCategory,
          sortBy,
          inStockOnly,
          page: currentPage
        })
      );
    } catch {}
  }, [selectedCategory, sortBy, inStockOnly, currentPage]);

  useEffect(() => {
    let active = true;
    axios
      .get('/api/products')
      .then(({ data }) => {
        if (!active) return;
        const rawList = Array.isArray(data) ? data : data.products || [];
        if (rawList.length > 0) {
          const synced = rawList.map((item, idx) => resolveProductData(item, idx));
          setProducts(synced);
          localStorage.setItem(CATALOG_STORAGE_KEY, JSON.stringify(synced));
        }
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  const showQuickToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2600);
  };

  const handleQuickAddProduct = (name) => {
    showQuickToast(`✓ "${name}" added to cart`);
  };

  const handleRecruiterDemoClick = () => {
    if (!userInfo) {
      const demoCustomer = {
        _id: 'demo-user-faruk',
        name: 'Faruk Aydin',
        email: 'faruk@devgear.com',
        isAdmin: false,
        isDemoAdmin: true,
        token: 'demo-jwt-recruiter-token'
      };
      dispatch(setCredentials(demoCustomer));
      showQuickToast('⚡ 1-Click Recruiter Session Activated (Faruk Aydin)');
    }
    setIsDemoModalOpen(true);
  };

  const handleSwitchDemoRole = () => {
    if (userInfo?.isAdmin) {
      const customer = {
        _id: 'demo-user-faruk',
        name: 'Faruk Aydin',
        email: 'faruk@devgear.com',
        isAdmin: false,
        isDemoAdmin: true,
        token: 'demo-jwt-customer-token'
      };
      dispatch(setCredentials(customer));
      showQuickToast('👤 Switched to Customer View (Faruk Aydin)');
    } else {
      const admin = {
        _id: 'demo-admin-faruk',
        name: 'Faruk Aydin (Sandbox Admin)',
        email: 'faruk@devgear.com',
        isAdmin: true,
        isSandbox: true,
        token: 'demo-jwt-admin-token'
      };
      dispatch(setCredentials(admin));
      showQuickToast('🛡️ Switched to Protected Sandbox Admin');
    }
  };

  const handleInstantCheckoutDemo = () => {
    if (cartItems.length === 0) {
      const demoItem = products[2] || INITIAL_PRODUCTS[2];
      dispatch(addToCart({ ...demoItem, qty: 1 }));
    }
    setIsDemoModalOpen(false);
    navigate('/shipping');
  };

  const scrollToProducts = () => productsRef.current?.scrollIntoView({ behavior: 'smooth' });

  let filteredProducts = [...products];
  if (selectedCategory && selectedCategory !== 'All') {
    filteredProducts = filteredProducts.filter(
      (p) => (p.category || '').toLowerCase() === selectedCategory.toLowerCase()
    );
  }
  if (keyword) {
    const q = keyword.toLowerCase();
    filteredProducts = filteredProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        (p.brand || '').toLowerCase().includes(q) ||
        (p.category || '').toLowerCase().includes(q)
    );
  }
  if (inStockOnly) filteredProducts = filteredProducts.filter((p) => (p.countInStock ?? 10) > 0);
  if (sortBy === 'price-asc') filteredProducts.sort((a, b) => Number(a.price) - Number(b.price));
  else if (sortBy === 'price-desc') filteredProducts.sort((a, b) => Number(b.price) - Number(a.price));
  else if (sortBy === 'rating') filteredProducts.sort((a, b) => Number(b.rating || 0) - Number(a.rating || 0));

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedProducts = filteredProducts.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  return (
    <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '0 12px' }}>
      {toast && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            backgroundColor: '#0f172a',
            color: '#fff',
            padding: '12px 20px',
            borderRadius: '10px',
            fontWeight: '700',
            fontSize: '13px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.25)',
            zIndex: 1100
          }}
        >
          {toast}
        </div>
      )}

      {isDemoModalOpen && (
        <div
          onClick={() => setIsDemoModalOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.72)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
            zIndex: 1050
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '480px',
              backgroundColor: theme.bgCard,
              border: `1px solid ${theme.borderColor}`,
              borderRadius: '16px',
              padding: '28px',
              boxShadow: '0 20px 45px rgba(0,0,0,0.3)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: '800',
                  textTransform: 'uppercase',
                  padding: '4px 10px',
                  borderRadius: '999px',
                  backgroundColor: 'rgba(37, 99, 235, 0.15)',
                  color: '#3b82f6'
                }}
              >
                ⚡ Interactive Recruiter Tour
              </span>
              <button
                type="button"
                onClick={() => setIsDemoModalOpen(false)}
                style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: theme.textMuted }}
              >
                ✕
              </button>
            </div>

            <h3 style={{ margin: '0 0 6px 0', fontSize: '22px', fontWeight: '900', color: theme.textMain }}>
              Recruiter Demo Sandbox
            </h3>
            <p style={{ margin: '0 0 18px 0', fontSize: '13px', color: theme.textMuted, lineHeight: '1.5' }}>
              Active Session: <strong style={{ color: theme.textMain }}>{userInfo?.name || 'Faruk Aydin'}</strong> (Isolated Sandbox — Production DB Protected)
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button
                type="button"
                onClick={() => {
                  setIsDemoModalOpen(false);
                  navigate('/admin');
                }}
                style={{
                  padding: '13px 16px',
                  borderRadius: '10px',
                  border: 'none',
                  backgroundColor: '#2563eb',
                  color: '#ffffff',
                  fontWeight: '800',
                  fontSize: '14px',
                  textAlign: 'left',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <span>⚡ Explore Admin Inventory Sandbox</span>
                <span>→</span>
              </button>

              <button
                type="button"
                onClick={handleInstantCheckoutDemo}
                style={{
                  padding: '13px 16px',
                  borderRadius: '10px',
                  border: `1px solid ${theme.borderColor}`,
                  backgroundColor: theme.bgMain,
                  color: theme.textMain,
                  fontWeight: '700',
                  fontSize: '14px',
                  textAlign: 'left',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <span>💳 Test Stripe Sandbox Checkout Flow</span>
                <span>→</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsDemoModalOpen(false);
                  navigate('/orders');
                }}
                style={{
                  padding: '13px 16px',
                  borderRadius: '10px',
                  border: `1px solid ${theme.borderColor}`,
                  backgroundColor: theme.bgMain,
                  color: theme.textMain,
                  fontWeight: '700',
                  fontSize: '14px',
                  textAlign: 'left',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <span>📦 Inspect Order History & Price Breakdown</span>
                <span>→</span>
              </button>

              <button
                type="button"
                onClick={handleSwitchDemoRole}
                style={{
                  padding: '11px 16px',
                  borderRadius: '10px',
                  border: `1px dashed ${theme.borderColor}`,
                  backgroundColor: 'transparent',
                  color: theme.textMuted,
                  fontWeight: '700',
                  fontSize: '13px',
                  cursor: 'pointer',
                  marginTop: '4px'
                }}
              >
                🔄 Switch Role ({userInfo?.isAdmin ? 'Switch to Customer View' : 'Switch to Sandbox Admin'})
              </button>
            </div>
          </div>
        </div>
      )}

      {!urlCategory && !keyword && (
        <div
          style={{
            width: '100%',
            minHeight: '350px',
            borderRadius: '16px',
            marginBottom: '32px',
            backgroundImage:
              'linear-gradient(135deg, rgba(15, 23, 42, 0.90) 0%, rgba(15, 23, 42, 0.74) 100%), url("https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1600&q=80")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '48px 24px',
            textAlign: 'center'
          }}
        >
          <span
            style={{
              backgroundColor: 'rgba(59, 130, 246, 0.2)',
              border: '1px solid rgba(96, 165, 250, 0.45)',
              color: '#93c5fd',
              fontSize: '12px',
              fontWeight: '700',
              padding: '5px 14px',
              borderRadius: '999px',
              marginBottom: '16px',
              textTransform: 'uppercase'
            }}
          >
            Developer Hardware Store
          </span>
          <h2 style={{ fontSize: '40px', color: '#ffffff', fontWeight: '900', margin: '0 0 14px 0', letterSpacing: '-1px' }}>
            Upgrade Your Engineering Workspace
          </h2>
          <p style={{ fontSize: '17px', maxWidth: '620px', margin: '0 0 28px 0', color: '#e2e8f0', lineHeight: '1.6' }}>
            High-performance laptops, 4K/5K monitors, mechanical keyboards, and studio audio engineered for software teams.
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button
              type="button"
              onClick={scrollToProducts}
              style={{
                padding: '14px 28px',
                backgroundColor: '#3b82f6',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                fontSize: '15px',
                fontWeight: '800',
                cursor: 'pointer'
              }}
            >
              Explore Collection
            </button>
            <button
              type="button"
              onClick={handleRecruiterDemoClick}
              style={{
                padding: '14px 24px',
                backgroundColor: 'rgba(255,255,255,0.14)',
                color: '#ffffff',
                border: '1px solid rgba(255,255,255,0.32)',
                borderRadius: '8px',
                fontSize: '15px',
                fontWeight: '700',
                cursor: 'pointer'
              }}
            >
              ⚡ 1-Click Recruiter Demo
            </button>
          </div>
        </div>
      )}

      <div
        ref={productsRef}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          marginBottom: '24px',
          padding: '18px',
          backgroundColor: theme.bgCard,
          border: `1px solid ${theme.borderColor}`,
          borderRadius: '12px'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <h1 style={{ fontSize: '22px', color: theme.textMain, fontWeight: '800', margin: 0 }}>
            {keyword
              ? `Search Results for "${keyword}"`
              : selectedCategory !== 'All'
              ? `${selectedCategory} (${filteredProducts.length})`
              : `Featured Hardware (${filteredProducts.length})`}
          </h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: theme.textMain, fontWeight: '600', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => {
                  setInStockOnly(e.target.checked);
                  setCurrentPage(1);
                }}
              />
              In Stock Only
            </label>
            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
                setCurrentPage(1);
              }}
              style={{
                padding: '8px 12px',
                borderRadius: '8px',
                border: `1px solid ${theme.borderColor}`,
                backgroundColor: theme.bgMain,
                color: theme.textMain,
                fontSize: '13px',
                fontWeight: '600'
              }}
            >
              <option value="featured">Sort: Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Customer Rating</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {CATEGORIES.map((cat) => {
            const active = selectedCategory.toLowerCase() === cat.toLowerCase();
            return (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat);
                  setCurrentPage(1);
                  if (urlCategory) navigate(cat === 'All' ? '/' : `/category/${cat}`);
                }}
                style={{
                  padding: '7px 14px',
                  borderRadius: '999px',
                  fontSize: '12px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  border: active ? '1px solid #2563eb' : `1px solid ${theme.borderColor}`,
                  backgroundColor: active ? '#2563eb' : theme.bgMain,
                  color: active ? '#ffffff' : theme.textMain
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '18px' }}>
        {paginatedProducts.map((product) => (
          <Product key={product._id} product={product} theme={theme} onQuickAdd={handleQuickAddProduct} />
        ))}
      </div>

      {totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginTop: '32px', paddingBottom: '12px' }}>
          <button
            type="button"
            disabled={safePage === 1}
            onClick={() => {
              setCurrentPage((p) => Math.max(1, p - 1));
              scrollToProducts();
            }}
            style={{
              padding: '8px 14px',
              borderRadius: '8px',
              border: `1px solid ${theme.borderColor}`,
              backgroundColor: theme.bgCard,
              color: theme.textMain,
              fontWeight: '700',
              cursor: safePage === 1 ? 'not-allowed' : 'pointer',
              opacity: safePage === 1 ? 0.5 : 1
            }}
          >
            ← Prev
          </button>
          {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((page) => (
            <button
              key={page}
              type="button"
              onClick={() => {
                setCurrentPage(page);
                scrollToProducts();
              }}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                border: page === safePage ? '1px solid #2563eb' : `1px solid ${theme.borderColor}`,
                backgroundColor: page === safePage ? '#2563eb' : theme.bgCard,
                color: page === safePage ? '#ffffff' : theme.textMain,
                fontWeight: '800',
                cursor: 'pointer'
              }}
            >
              {page}
            </button>
          ))}
          <button
            type="button"
            disabled={safePage === totalPages}
            onClick={() => {
              setCurrentPage((p) => Math.min(totalPages, p + 1));
              scrollToProducts();
            }}
            style={{
              padding: '8px 14px',
              borderRadius: '8px',
              border: `1px solid ${theme.borderColor}`,
              backgroundColor: theme.bgCard,
              color: theme.textMain,
              fontWeight: '700',
              cursor: safePage === totalPages ? 'not-allowed' : 'pointer',
              opacity: safePage === totalPages ? 0.5 : 1
            }}
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
};

export default HomeScreen;
