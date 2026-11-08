import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../slices/cartSlice';

const ShippingScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress?.address || '');
  const [city, setCity] = useState(shippingAddress?.city || '');
  const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode || '');
  const [country, setCountry] = useState(shippingAddress?.country || '');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault(); // Sayfanın yenilenmesini engeller
    
    // 1. Adresi Redux'a kaydet
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    
    // 2. Ödeme sayfasına yönlendir
    navigate('/payment');
  };

  return (
    <div style={{ maxWidth: '500px', margin: '40px auto', padding: '30px', border: '1px solid #ddd', borderRadius: '12px', boxShadow: '0 8px 24px rgba(0,0,0,0.05)' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '25px', fontSize: '28px' }}>Teslimat Adresi</h1>
      
      <form onSubmit={submitHandler} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Açık Adres</label>
          <input 
            type="text" 
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box' }}
            required
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Şehir</label>
          <input 
            type="text" 
            value={city}
            onChange={(e) => setCity(e.target.value)}
            style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box' }}
            required
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Posta Kodu</label>
          <input 
            type="text" 
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box' }}
            required
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Ülke</label>
          <input 
            type="text" 
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box' }}
            required
          />
        </div>

        <button 
          type="submit"
          style={{ padding: '15px', backgroundColor: '#000', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }}
        >
          Devam Et
        </button>
      </form>
    </div>
  );
};

export default ShippingScreen;