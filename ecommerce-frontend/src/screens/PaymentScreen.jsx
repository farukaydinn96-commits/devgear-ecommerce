import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { savePaymentMethod } from '../slices/cartSlice';

const PaymentScreen = () => {
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    // Bir sonraki ve son aşama olan "Siparişi Tamamla" sayfasına geç
    navigate('/placeorder'); 
  };

  return (
    <div style={{ maxWidth: '500px', margin: '40px auto', padding: '30px', border: '1px solid #ddd', borderRadius: '12px', boxShadow: '0 8px 24px rgba(0,0,0,0.05)' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '25px', fontSize: '28px' }}>Ödeme Yöntemi</h1>
      
      <form onSubmit={submitHandler} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '18px', cursor: 'pointer' }}>
            <input 
              type="radio" 
              name="paymentMethod" 
              value="Credit Card"
              checked={paymentMethod === 'Credit Card'}
              onChange={(e) => setPaymentMethod(e.target.value)}
              style={{ width: '20px', height: '20px' }}
            />
            Kredi Kartı
          </label>
        </div>

        <div>
          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '18px', cursor: 'pointer' }}>
            <input 
              type="radio" 
              name="paymentMethod" 
              value="PayPal"
              checked={paymentMethod === 'PayPal'}
              onChange={(e) => setPaymentMethod(e.target.value)}
              style={{ width: '20px', height: '20px' }}
            />
            PayPal
          </label>
        </div>

        <button 
          type="submit"
          style={{ padding: '15px', backgroundColor: '#000', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', marginTop: '20px' }}
        >
          Devam Et
        </button>
      </form>
    </div>
  );
};

export default PaymentScreen;