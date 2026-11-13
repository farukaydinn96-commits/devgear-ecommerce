import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const SAMPLE_ORDERS = [
  {
    _id: 'ORD-894210',
    createdAt: '2026-11-08T14:20:00.000Z',
    totalPrice: '398.99',
    isPaid: true,
    paidAt: '2026-11-08T14:21:00.000Z',
    isDelivered: true,
    deliveredAt: '2026-11-10T11:00:00.000Z',
    paymentMethod: 'Stripe (Test Mode)',
    shippingAddress: { address: '742 Evergreen Terrace, Suite 200', city: 'San Francisco', postalCode: '94107', country: 'United States' },
    orderItems: [{ name: 'Sony WH-1000XM5 Noise Cancelling', qty: 1, price: 398.99, image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800&q=80', product: 'devgear-p2' }]
  }
];

const MyOrdersScreen = ({ theme }) => {
  const [orders, setOrders] = useState(() => {
    try {
      const local = JSON.parse(localStorage.getItem('devgear_orders_en_v2') || '[]');
      return local.length > 0 ? local : SAMPLE_ORDERS;
    } catch {
      return SAMPLE_ORDERS;
    }
  });

  useEffect(() => {
    axios.get('/api/orders/mine').then(({ data }) => {
      const local = JSON.parse(localStorage.getItem('devgear_orders_en_v2') || '[]');
      const combined = [...local, ...(Array.isArray(data) ? data : [])];
      if (combined.length > 0) setOrders(combined);
    }).catch(() => {});
  }, []);

  return (
    <div style={{ maxWidth: '1160px', margin: '0 auto', padding: '30px 16px' }}>
      <h1 style={{ fontSize: '28px', marginBottom: '24px', color: theme.textMain, fontWeight: '900' }}>Order History</h1>
      <div style={{ backgroundColor: theme.bgCard, border: `1px solid ${theme.borderColor}`, borderRadius: '12px', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${theme.borderColor}`, color: theme.textMuted }}>
              <th style={{ padding: '14px 18px' }}>ORDER ID</th>
              <th style={{ padding: '14px 18px' }}>DATE</th>
              <th style={{ padding: '14px 18px' }}>ITEMS</th>
              <th style={{ padding: '14px 18px' }}>TOTAL</th>
              <th style={{ padding: '14px 18px' }}>PAID</th>
              <th style={{ padding: '14px 18px' }}>DELIVERED</th>
              <th style={{ padding: '14px 18px' }}>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} style={{ borderBottom: `1px solid ${theme.borderColor}`, color: theme.textMain }}>
                <td style={{ padding: '14px 18px', fontWeight: '700' }}>{order._id}</td>
                <td style={{ padding: '14px 18px' }}>{String(order.createdAt).substring(0, 10)}</td>
                <td style={{ padding: '14px 18px' }}>{(order.orderItems || []).map((i) => i.name).join(', ')}</td>
                <td style={{ padding: '14px 18px', fontWeight: '800' }}>${order.totalPrice}</td>
                <td style={{ padding: '14px 18px' }}>
                  <span style={{ padding: '4px 10px', borderRadius: '999px', fontSize: '12px', fontWeight: '700', backgroundColor: order.isPaid ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)', color: order.isPaid ? '#10b981' : '#ef4444' }}>{order.isPaid ? 'Paid ✓' : 'Pending'}</span>
                </td>
                <td style={{ padding: '14px 18px' }}>
                  <span style={{ padding: '4px 10px', borderRadius: '999px', fontSize: '12px', fontWeight: '700', backgroundColor: order.isDelivered ? 'rgba(16,185,129,0.15)' : 'rgba(245,158,11,0.15)', color: order.isDelivered ? '#10b981' : '#f59e0b' }}>{order.isDelivered ? 'Delivered ✓' : 'In Transit'}</span>
                </td>
                <td style={{ padding: '14px 18px' }}>
                  <Link to={`/order/${order._id}`} style={{ padding: '6px 12px', backgroundColor: '#2563eb', color: '#fff', borderRadius: '6px', textDecoration: 'none', fontSize: '12px', fontWeight: '700' }}>Details</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrdersScreen;
