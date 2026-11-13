import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export const DEFAULT_SAMPLE_ORDERS = [
  {
    _id: 'ORD-894215',
    createdAt: '2026-11-12T16:40:00.000Z',
    totalPrice: '228.85',
    itemsPrice: '199.00',
    shippingPrice: '0.00',
    taxPrice: '29.85',
    isPaid: false,
    isDelivered: false,
    paymentMethod: 'Stripe (Test Mode)',
    user: { name: 'Alex Rivera', email: 'customer@devgear.com' },
    shippingAddress: {
      address: '742 Evergreen Terrace, Suite 200',
      city: 'San Francisco',
      postalCode: '94107',
      country: 'United States'
    },
    orderItems: [
      {
        name: 'Keychron Q1 Pro Mechanical Keyboard',
        qty: 1,
        price: 199.00,
        image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&q=80',
        product: 'devgear-p3'
      }
    ]
  },
  {
    _id: 'ORD-894210',
    createdAt: '2026-11-08T14:20:00.000Z',
    totalPrice: '458.84',
    itemsPrice: '398.99',
    shippingPrice: '0.00',
    taxPrice: '59.85',
    isPaid: true,
    paidAt: '2026-11-08T14:21:00.000Z',
    isDelivered: true,
    deliveredAt: '2026-11-10T11:00:00.000Z',
    paymentMethod: 'Stripe (Test Mode)',
    user: { name: 'Alex Rivera', email: 'customer@devgear.com' },
    shippingAddress: {
      address: '742 Evergreen Terrace, Suite 200',
      city: 'San Francisco',
      postalCode: '94107',
      country: 'United States'
    },
    orderItems: [
      {
        name: 'Sony WH-1000XM5 Noise Cancelling',
        qty: 1,
        price: 398.99,
        image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800&q=80',
        product: 'devgear-p2'
      }
    ]
  }
];

export const getStoredOrders = () => {
  try {
    const raw = localStorage.getItem('devgear_orders_en_v2');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        const existingIds = new Set(parsed.map((o) => String(o._id)));
        const merged = [...parsed, ...DEFAULT_SAMPLE_ORDERS.filter((s) => !existingIds.has(String(s._id)))];
        return merged;
      }
    }
    localStorage.setItem('devgear_orders_en_v2', JSON.stringify(DEFAULT_SAMPLE_ORDERS));
  } catch {}
  return DEFAULT_SAMPLE_ORDERS;
};

const MyOrdersScreen = ({ theme }) => {
  const [orders, setOrders] = useState(() => getStoredOrders());

  useEffect(() => {
    const currentLocal = getStoredOrders();
    setOrders(currentLocal);

    axios.get('/api/orders/mine').then(({ data }) => {
      if (Array.isArray(data) && data.length > 0) {
        const localIds = new Set(currentLocal.map((o) => String(o._id)));
        const combined = [...currentLocal, ...data.filter((d) => !localIds.has(String(d._id)))];
        setOrders(combined);
      }
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
