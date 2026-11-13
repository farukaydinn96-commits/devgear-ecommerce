import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

const OrderScreen = ({ theme }) => {
  const { id: orderId } = useParams();
  const { userInfo } = useSelector((state) => state.auth);
  const [order, setOrder] = useState(null);
  const [paying, setPaying] = useState(false);

  useEffect(() => {
    try {
      const localOrders = JSON.parse(localStorage.getItem('devgear_orders_en_v2') || '[]');
      const foundLocal = localOrders.find((o) => String(o._id) === String(orderId));
      if (foundLocal) setOrder(foundLocal);
    } catch {}
    axios.get(`/api/orders/${orderId}`).then(({ data }) => setOrder(data)).catch(() => {});
  }, [orderId]);

  const updateLocalOrder = (updated) => {
    setOrder(updated);
    try {
      const localOrders = JSON.parse(localStorage.getItem('devgear_orders_en_v2') || '[]');
      localStorage.setItem('devgear_orders_en_v2', JSON.stringify(localOrders.map((o) => (String(o._id) === String(updated._id) ? updated : o))));
    } catch {}
  };

  const handleStripeTestPay = async () => {
    if (!order) return;
    setPaying(true);
    const paidOrder = {
      ...order,
      isPaid: true,
      paidAt: new Date().toISOString(),
      paymentResult: { id: `pi_stripe_${Date.now()}`, status: 'COMPLETED', email_address: order.user?.email || userInfo?.email || 'customer@devgear.com' }
    };
    try {
      const { data } = await axios.put(`/api/orders/${order._id}/pay`, paidOrder.paymentResult);
      updateLocalOrder(data);
    } catch {
      updateLocalOrder(paidOrder);
    } finally {
      setPaying(false);
    }
  };

  const handleDeliverOrder = async () => {
    if (!order) return;
    const deliveredOrder = { ...order, isDelivered: true, deliveredAt: new Date().toISOString() };
    try {
      const { data } = await axios.put(`/api/orders/${order._id}/deliver`);
      updateLocalOrder(data);
    } catch {
      updateLocalOrder(deliveredOrder);
    }
  };

  if (!order) {
    return (
      <div style={{ maxWidth: '800px', margin: '40px auto', padding: '30px', color: theme.textMain }}>
        <h2>Order not found.</h2>
        <Link to="/orders" style={{ color: '#2563eb', fontWeight: '700' }}>View All Orders →</Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1160px', margin: '0 auto', padding: '30px 16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '26px', margin: 0, color: theme.textMain, fontWeight: '900' }}>Order #{order._id}</h1>
        <Link to="/orders" style={{ color: '#2563eb', fontWeight: '700', textDecoration: 'none' }}>📦 View Order History →</Link>
      </div>

      <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
        <div style={{ flex: '2', minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div style={{ padding: '20px', backgroundColor: theme.bgCard, border: `1px solid ${theme.borderColor}`, borderRadius: '12px' }}>
            <h2 style={{ fontSize: '18px', margin: '0 0 12px 0', color: theme.textMain }}>Shipping Details</h2>
            <p style={{ margin: '0 0 6px 0', color: theme.textMuted }}><strong>Recipient: </strong>{order.user?.name || userInfo?.name || 'Alex Rivera'} ({order.user?.email || userInfo?.email || 'customer@devgear.com'})</p>
            <p style={{ margin: '0 0 14px 0', color: theme.textMuted }}><strong>Address: </strong>{order.shippingAddress?.address}, {order.shippingAddress?.city}, {order.shippingAddress?.postalCode}, {order.shippingAddress?.country}</p>
            {order.isDelivered ? (
              <div style={{ padding: '10px 14px', backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#10b981', borderRadius: '8px', fontWeight: '700' }}>✓ Delivered on {new Date(order.deliveredAt).toLocaleDateString()}</div>
            ) : (
              <div style={{ padding: '10px 14px', backgroundColor: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b', borderRadius: '8px', fontWeight: '700' }}>🚚 Preparing for Dispatch</div>
            )}
          </div>

          <div style={{ padding: '20px', backgroundColor: theme.bgCard, border: `1px solid ${theme.borderColor}`, borderRadius: '12px' }}>
            <h2 style={{ fontSize: '18px', margin: '0 0 12px 0', color: theme.textMain }}>Payment Status</h2>
            <p style={{ margin: '0 0 12px 0', color: theme.textMuted }}><strong>Method: </strong>{order.paymentMethod}</p>
            {order.isPaid ? (
              <div style={{ padding: '10px 14px', backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#10b981', borderRadius: '8px', fontWeight: '700' }}>✓ Paid via Stripe Test Gateway ({new Date(order.paidAt).toLocaleTimeString()})</div>
            ) : (
              <div style={{ padding: '10px 14px', backgroundColor: 'rgba(239, 68, 68, 0.15)', color: '#ef4444', borderRadius: '8px', fontWeight: '700' }}>⏳ Awaiting Payment Confirmation</div>
            )}
          </div>

          <div style={{ padding: '20px', backgroundColor: theme.bgCard, border: `1px solid ${theme.borderColor}`, borderRadius: '12px' }}>
            <h2 style={{ fontSize: '18px', margin: '0 0 12px 0', color: theme.textMain }}>Ordered Hardware</h2>
            {(order.orderItems || []).map((item, index) => (
              <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: `1px solid ${theme.borderColor}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img src={item.image} alt={item.name} style={{ width: '48px', height: '48px', borderRadius: '6px', objectFit: 'cover' }} />
                  <Link to={`/product/${item.product}`} style={{ textDecoration: 'none', color: theme.textMain, fontWeight: '700' }}>{item.name}</Link>
                </div>
                <span style={{ color: theme.textMain }}>{item.qty} x ${item.price} = <strong>${(item.qty * item.price).toFixed(2)}</strong></span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ flex: '1', minWidth: '300px' }}>
          <div style={{ backgroundColor: theme.bgCard, border: `1px solid ${theme.borderColor}`, padding: '24px', borderRadius: '12px' }}>
            <h2 style={{ margin: '0 0 18px 0', borderBottom: `1px solid ${theme.borderColor}`, paddingBottom: '12px', fontSize: '20px', color: theme.textMain }}>Payment Summary</h2>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', fontSize: '24px', fontWeight: '900', color: theme.textMain }}><span>Total:</span><span>${order.totalPrice}</span></div>
            {!order.isPaid && (
              <div style={{ padding: '16px', borderRadius: '10px', backgroundColor: theme.bgMain, border: `1px solid ${theme.borderColor}`, marginBottom: '14px' }}>
                <div style={{ fontSize: '12px', fontWeight: '800', color: '#3b82f6', marginBottom: '8px', textTransform: 'uppercase' }}>💳 Stripe Sandbox Card (Pre-filled)</div>
                <div style={{ fontSize: '13px', fontFamily: 'monospace', color: theme.textMain, marginBottom: '4px' }}>Card: 4242 •••• •••• 4242</div>
                <div style={{ fontSize: '12px', fontFamily: 'monospace', color: theme.textMuted, marginBottom: '14px' }}>Exp: 12/28 | CVC: 424</div>
                <button type="button" onClick={handleStripeTestPay} disabled={paying} style={{ width: '100%', padding: '14px', backgroundColor: '#10b981', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '15px', fontWeight: '800', cursor: 'pointer' }}>
                  {paying ? 'Processing Stripe Payment...' : `Pay $${order.totalPrice} Now (Test Mode)`}
                </button>
              </div>
            )}
            {order.isPaid && !order.isDelivered && (
              <button type="button" onClick={handleDeliverOrder} style={{ width: '100%', padding: '12px', backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '700', cursor: 'pointer' }}>
                ✓ Mark as Delivered (Admin / Demo)
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderScreen;
