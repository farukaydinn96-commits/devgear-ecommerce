import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../slices/cartSlice';

const CartScreen = ({ theme }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const totalItems = cartItems.reduce((acc, item) => acc + Number(item.qty), 0);
  const subtotal = cartItems.reduce((acc, item) => acc + Number(item.qty) * Number(item.price), 0);

  return (
    <div style={{ maxWidth: '1160px', margin: '0 auto', padding: '30px 16px' }}>
      <h1 style={{ fontSize: '28px', marginBottom: '24px', color: theme.textMain, fontWeight: '900' }}>Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div style={{ padding: '32px', backgroundColor: theme.bgCard, border: `1px solid ${theme.borderColor}`, borderRadius: '12px', color: theme.textMain }}>
          Your cart is currently empty. <Link to="/" style={{ color: '#2563eb', fontWeight: '700', marginLeft: '6px' }}>Explore Hardware Catalog →</Link>
        </div>
      ) : (
        <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
          <div style={{ flex: '2', minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {cartItems.map((item) => (
              <div key={item._id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', backgroundColor: theme.bgCard, border: `1px solid ${theme.borderColor}`, borderRadius: '12px', gap: '16px', flexWrap: 'wrap' }}>
                <img src={item.image} alt={item.name} style={{ width: '76px', height: '76px', objectFit: 'cover', borderRadius: '8px' }} />
                <div style={{ flex: '1', minWidth: '160px' }}>
                  <Link to={`/product/${item._id}`} style={{ textDecoration: 'none', color: theme.textMain, fontWeight: '700', fontSize: '16px' }}>{item.name}</Link>
                  <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: theme.textMuted }}>{item.brand} • {item.category}</p>
                </div>
                <div style={{ fontWeight: '800', fontSize: '16px', color: theme.textMain }}>${Number(item.price).toFixed(2)}</div>
                <select value={item.qty} onChange={(e) => dispatch(addToCart({ ...item, qty: Number(e.target.value) }))} style={{ padding: '8px 12px', borderRadius: '8px', border: `1px solid ${theme.borderColor}`, backgroundColor: theme.bgMain, color: theme.textMain, fontWeight: '700' }}>
                  {[...Array(Math.max(1, Math.min(10, item.countInStock || 10))).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>{x + 1}</option>
                  ))}
                </select>
                <button onClick={() => dispatch(removeFromCart(item._id))} style={{ padding: '8px 14px', backgroundColor: '#ef4444', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '700' }}>Remove</button>
              </div>
            ))}
          </div>
          <div style={{ flex: '1', minWidth: '280px' }}>
            <div style={{ backgroundColor: theme.bgCard, border: `1px solid ${theme.borderColor}`, padding: '24px', borderRadius: '12px' }}>
              <h2 style={{ margin: '0 0 16px 0', borderBottom: `1px solid ${theme.borderColor}`, paddingBottom: '14px', fontSize: '20px', color: theme.textMain }}>Order Summary ({totalItems} Items)</h2>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', color: theme.textMuted }}>
                <span>Shipping:</span>
                <span style={{ color: '#10b981', fontWeight: '700' }}>{subtotal > 100 ? 'FREE Express' : '$10.00'}</span>
              </div>
              <div style={{ fontSize: '24px', fontWeight: '900', marginBottom: '22px', color: theme.textMain, display: 'flex', justifyContent: 'space-between' }}>
                <span>Subtotal:</span><span>${subtotal.toFixed(2)}</span>
              </div>
              <button type="button" onClick={() => navigate('/login?redirect=/shipping')} style={{ width: '100%', padding: '15px', backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: '800', cursor: 'pointer' }}>
                Proceed to Checkout →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartScreen;
