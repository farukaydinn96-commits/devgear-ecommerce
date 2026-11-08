import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { clearCartItems } from '../slices/cartSlice';

const PlaceOrderScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [error, setError] = useState('');

  const cart = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  // Fiyat Hesaplamaları
  const addDecimals = (num) => (Math.round(num * 100) / 100).toFixed(2);
  const itemsPrice = addDecimals(cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0));
  const shippingPrice = addDecimals(itemsPrice > 100 ? 0 : 10); // 100$ üzerine kargo bedava
  const taxPrice = addDecimals(Number((0.15 * itemsPrice).toFixed(2))); // %15 Vergi
  const totalPrice = (Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice)).toFixed(2);

  useEffect(() => {
    // Güvenlik: Adres veya ödeme yöntemi yoksa önceki sayfalara geri yolla
    if (!cart.shippingAddress.address) {
      navigate('/shipping');
    } else if (!cart.paymentMethod) {
      navigate('/payment');
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  const placeOrderHandler = async () => {
    try {
      // Backend'e siparişi gönderiyoruz
      const config = {
        headers: {
          'Content-Type': 'application/json',
          // Backend'deki protect middleware'i token'ı HTTP-Only çerezden otomatik alacak
        },
      };

      const { data } = await axios.post('/api/orders', {
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      }, config);

      // Başarılı olursa sepeti temizle ve sipariş detay sayfasına yönlendir (o sayfayı sonra yapacağız)
      dispatch(clearCartItems());
      navigate(`/order/${data._id}`); 
      
    } catch (err) {
      setError(err.response?.data?.message || 'Sipariş oluşturulamadı');
    }
  };

  return (
    <div style={{ padding: '40px' }}>
      <h1 style={{ fontSize: '28px', marginBottom: '30px' }}>Sipariş Özeti</h1>

      {error && <div style={{ backgroundColor: '#ff4d4f', color: 'white', padding: '12px', borderRadius: '6px', marginBottom: '20px' }}>{error}</div>}

      <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
        
        {/* Sol Taraf: Adres, Ödeme ve Ürün Bilgileri */}
        <div style={{ flex: '2', minWidth: '300px' }}>
          <div style={{ marginBottom: '30px', paddingBottom: '20px', borderBottom: '1px solid #eee' }}>
            <h2 style={{ fontSize: '22px', marginBottom: '15px' }}>Teslimat</h2>
            <p><strong>Adres: </strong>{cart.shippingAddress.address}, {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}</p>
          </div>

          <div style={{ marginBottom: '30px', paddingBottom: '20px', borderBottom: '1px solid #eee' }}>
            <h2 style={{ fontSize: '22px', marginBottom: '15px' }}>Ödeme Yöntemi</h2>
            <p><strong>Yöntem: </strong>{cart.paymentMethod}</p>
          </div>

          <div>
            <h2 style={{ fontSize: '22px', marginBottom: '15px' }}>Sipariş Edilen Ürünler</h2>
            {cart.cartItems.length === 0 ? (
              <p>Sepetiniz boş.</p>
            ) : (
              <div>
                {cart.cartItems.map((item, index) => (
                  <div key={index} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #eee' }}>
                    <Link to={`/product/${item._id}`} style={{ textDecoration: 'none', color: '#000', fontWeight: 'bold' }}>
                      {item.name}
                    </Link>
                    <span>
                      {item.qty} x ${item.price} = <strong>${(item.qty * item.price).toFixed(2)}</strong>
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sağ Taraf: Fiyat Özeti Kutusu */}
        <div style={{ flex: '1', minWidth: '250px' }}>
          <div style={{ border: '1px solid #ddd', padding: '25px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
            <h2 style={{ margin: '0 0 20px 0', borderBottom: '1px solid #eee', paddingBottom: '15px' }}>Sipariş Toplamı</h2>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
              <span>Ürünler:</span> <span>${itemsPrice}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
              <span>Kargo:</span> <span>${shippingPrice}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', borderBottom: '1px solid #eee', paddingBottom: '15px' }}>
              <span>Vergi:</span> <span>${taxPrice}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '25px', fontSize: '20px', fontWeight: 'bold' }}>
              <span>Toplam:</span> <span>${totalPrice}</span>
            </div>
            
            <button 
              type="button"
              disabled={cart.cartItems === 0}
              onClick={placeOrderHandler}
              style={{ width: '100%', padding: '15px', backgroundColor: '#000', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}
            >
              Siparişi Onayla
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderScreen;
