import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { clearCartItems } from '../slices/cartSlice';

const PlaceOrderScreen = ({ theme }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [submitting, setSubmitting] = useState(false);

  const cart = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const addDecimals = (num) => (Math.round(num * 100) / 100).toFixed(2);
  const itemsPrice = addDecimals(cart.cartItems.reduce((acc, item) => acc + Number(item.price) * Number(item.qty), 0));
  const shippingPrice = addDecimals(Number(itemsPrice) > 100 ? 0 : 10);
  const taxPrice = addDecimals(Number((0.15 * Number(itemsPrice)).toFixed(2)));
  const totalPrice = (Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice)).toFixed(2);

  useEffect(() => {
    if (!cart.shippingAddress?.address) navigate('/shipping');
    else if (!cart.paymentMethod) navigate('/payment');
  }, [cart.paymentMethod, cart.shippingAddress, navigate]);

  const saveLocalOrder = (orderObj) => {
    try {
      const existing = JSON.parse(localStorage.getItem('devgear_orders_en_v2') || '[]');
      localStorage.setItem('devgear_orders_en_v2', JSON.stringify([orderObj, ...existing]));
    } catch {}
  };

  const placeOrderHandler = async () => {
    setSubmitting(true);
    const payload = {
      orderItems: cart.cartItems.map((item) => ({ name: item.name, qty: item.qty, image: item.image, price: item.price, product: item._id })),
      shippingAddress: cart.shippingAddress,
      paymentMethod: cart.paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice
    };
    try {
      const { data } = await axios.post('/api/orders', payload, { timeout: 5000 });
      saveLocalOrder(data);
      dispatch(clearCartItems());
      navigate(`/order/${data._id}`);
    } catch {
      const localOrder = {
        _id: `ORD-${Date.now().toString().slice(-6)}`,
        user: { name: userInfo?.name || 'Alex Rivera', email: userInfo?.email || 'customer@devgear.com' },
        ...payload,
        isPaid: false,
        isDelivered: false,
        createdAt: new Date().toISOString()
      };
      saveLocalOrder(localOrder);
      dispatch(clearCartItems());
      navigate(`/order/${localOrder._id}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: '1160px', margin: '0 auto', padding: '30px 16px' }}>
      <h1 style={{ fontSize: '28px', marginBottom: '24px', color: theme.textMain, fontWeight: '900' }}>Review & Place Order</h1>
      <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
        <div style={{ flex: '2', minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div style={{ padding: '20px', backgroundColor: theme.bgCard, border: `1px solid ${theme.borderColor}`, borderRadius: '12px' }}>
            <h2 style={{ fontSize: '18px', margin: '0 0 10px 0', color: theme.textMain }}>Shipping Address</h2>
            <p style={{ margin: 0, color: theme.textMuted }}>{cart.shippingAddress.address}, {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}</p>
          </div>
          <div style={{ padding: '20px', backgroundColor: theme.bgCard, border: `1px solid ${theme.borderColor}`, borderRadius: '12px' }}>
            <h2 style={{ fontSize: '18px', margin: '0 0 10px 0', color: theme.textMain }}>Payment Method</h2>
            <p style={{ margin: 0, color: theme.textMuted }}>{cart.paymentMethod}</p>
          </div>
          <div style={{ padding: '20px', backgroundColor: theme.bgCard, border: `1px solid ${theme.borderColor}`, borderRadius: '12px' }}>
            <h2 style={{ fontSize: '18px', margin: '0 0 14px 0', color: theme.textMain }}>Order Items</h2>
            {cart.cartItems.map((item, index) => (
              <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: `1px solid ${theme.borderColor}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img src={item.image} alt={item.name} style={{ width: '48px', height: '48px', borderRadius: '6px', objectFit: 'cover' }} />
                  <Link to={`/product/${item._id}`} style={{ textDecoration: 'none', color: theme.textMain, fontWeight: '700' }}>{item.name}</Link>
                </div>
                <span style={{ color: theme.textMain }}>{item.qty} x ${item.price} = <strong>${(item.qty * item.price).toFixed(2)}</strong></span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ flex: '1', minWidth: '280px' }}>
          <div style={{ backgroundColor: theme.bgCard, border: `1px solid ${theme.borderColor}`, padding: '24px', borderRadius: '12px' }}>
            <h2 style={{ margin: '0 0 18px 0', borderBottom: `1px solid ${theme.borderColor}`, paddingBottom: '12px', fontSize: '20px', color: theme.textMain }}>Order Summary</h2>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', color: theme.textMuted }}><span>Items:</span><span>${itemsPrice}</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', color: theme.textMuted }}><span>Shipping:</span><span>${shippingPrice}</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', borderBottom: `1px solid ${theme.borderColor}`, paddingBottom: '14px', color: theme.textMuted }}><span>Tax (15%):</span><span>${taxPrice}</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '22px', fontSize: '22px', fontWeight: '900', color: theme.textMain }}><span>Total:</span><span>${totalPrice}</span></div>
            <button type="button" disabled={cart.cartItems.length === 0 || submitting} onClick={placeOrderHandler} style={{ width: '100%', padding: '15px', backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: '800', cursor: 'pointer' }}>
              {submitting ? 'Creating Order...' : 'Confirm & Create Order →'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderScreen;
