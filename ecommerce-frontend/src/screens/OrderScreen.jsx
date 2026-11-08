import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const OrderScreen = () => {
  const { id: orderId } = useParams(); // URL'deki sipariş ID'sini yakalıyoruz
  
  const [order, setOrder] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        // Backend'deki getOrderById rotamıza istek atıyoruz
        const config = { headers: { 'Content-Type': 'application/json' } };
        const { data } = await axios.get(`/api/orders/${orderId}`, config);
        
        setOrder(data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Sipariş detayları çekilemedi');
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading) return <div style={{ padding: '40px', fontSize: '20px' }}>Sipariş yükleniyor...</div>;
  if (error) return <div style={{ padding: '40px', color: '#ff4d4f', fontWeight: 'bold' }}>{error}</div>;

  return (
    <div style={{ padding: '40px' }}>
      <h1 style={{ fontSize: '28px', marginBottom: '30px' }}>Sipariş Özeti: {order._id}</h1>

      <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
        
        {/* Sol Taraf: Teslimat, Ödeme ve Ürün Bilgileri */}
        <div style={{ flex: '2', minWidth: '300px' }}>
          
          <div style={{ marginBottom: '30px', paddingBottom: '20px', borderBottom: '1px solid #eee' }}>
            <h2 style={{ fontSize: '22px', marginBottom: '15px' }}>Teslimat Bilgileri</h2>
            <p style={{ marginBottom: '10px' }}><strong>İsim: </strong>{order.user.name}</p>
            <p style={{ marginBottom: '10px' }}><strong>E-Posta: </strong><a href={`mailto:${order.user.email}`} style={{ color: '#000' }}>{order.user.email}</a></p>
            <p style={{ marginBottom: '10px' }}><strong>Adres: </strong>{order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}</p>
            
            {order.isDelivered ? (
              <div style={{ padding: '12px', backgroundColor: '#d4edda', color: '#155724', borderRadius: '6px', marginTop: '15px', fontWeight: 'bold' }}>
                Teslim Edildi ({new Date(order.deliveredAt).toLocaleDateString()})
              </div>
            ) : (
              <div style={{ padding: '12px', backgroundColor: '#f8d7da', color: '#721c24', borderRadius: '6px', marginTop: '15px', fontWeight: 'bold' }}>
                Henüz Teslim Edilmedi
              </div>
            )}
          </div>

          <div style={{ marginBottom: '30px', paddingBottom: '20px', borderBottom: '1px solid #eee' }}>
            <h2 style={{ fontSize: '22px', marginBottom: '15px' }}>Ödeme Yöntemi</h2>
            <p style={{ marginBottom: '10px' }}><strong>Yöntem: </strong>{order.paymentMethod}</p>
            
            {order.isPaid ? (
              <div style={{ padding: '12px', backgroundColor: '#d4edda', color: '#155724', borderRadius: '6px', marginTop: '15px', fontWeight: 'bold' }}>
                Ödendi ({new Date(order.paidAt).toLocaleDateString()})
              </div>
            ) : (
              <div style={{ padding: '12px', backgroundColor: '#f8d7da', color: '#721c24', borderRadius: '6px', marginTop: '15px', fontWeight: 'bold' }}>
                Ödeme Bekleniyor
              </div>
            )}
          </div>

          <div>
            <h2 style={{ fontSize: '22px', marginBottom: '15px' }}>Sipariş Edilen Ürünler</h2>
            {order.orderItems.map((item, index) => (
              <div key={index} style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 0', borderBottom: '1px solid #eee' }}>
                <Link to={`/product/${item.product}`} style={{ textDecoration: 'none', color: '#000', fontWeight: 'bold' }}>
                  {item.name}
                </Link>
                <span>
                  {item.qty} x ${item.price} = <strong>${(item.qty * item.price).toFixed(2)}</strong>
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Sağ Taraf: Fiyat Özeti Kutusu */}
        <div style={{ flex: '1', minWidth: '250px' }}>
          <div style={{ border: '1px solid #ddd', padding: '25px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
            <h2 style={{ margin: '0 0 20px 0', borderBottom: '1px solid #eee', paddingBottom: '15px' }}>Sipariş Tutarı</h2>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', fontSize: '24px', fontWeight: 'bold' }}>
              <span>Toplam:</span> <span>${order.totalPrice}</span>
            </div>
            
            {/* Not: Gerçek bir projede buraya PayPal, Stripe veya İyzico ödeme butonu entegre edilir */}
            {!order.isPaid && (
              <button disabled style={{ width: '100%', padding: '15px', backgroundColor: '#ccc', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '16px', fontWeight: 'bold', cursor: 'not-allowed' }}>
                Ödeme Sistemi Bekleniyor
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default OrderScreen;