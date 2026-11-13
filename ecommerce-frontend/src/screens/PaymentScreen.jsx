import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { savePaymentMethod } from '../slices/cartSlice';

const PaymentScreen = ({ theme }) => {
  const [paymentMethod, setPaymentMethod] = useState('Stripe (Test Mode)');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/placeorder');
  };

  return (
    <div style={{ maxWidth: '500px', margin: '40px auto', padding: '30px', backgroundColor: theme.bgCard, border: `1px solid ${theme.borderColor}`, borderRadius: '12px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '25px', fontSize: '26px', color: theme.textMain, fontWeight: '900' }}>Payment Method</h1>
      <form onSubmit={submitHandler} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {[
          { id: 'Stripe (Test Mode)', desc: 'Instant test card checkout (4242 •••• •••• 4242)' },
          { id: 'Credit Card (3D Secure)', desc: 'Visa, Mastercard, American Express' },
          { id: 'PayPal Express', desc: 'Pay with PayPal balance or linked bank' }
        ].map((opt) => (
          <label key={opt.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '14px', borderRadius: '10px', border: paymentMethod === opt.id ? '2px solid #2563eb' : `1px solid ${theme.borderColor}`, backgroundColor: theme.bgMain, cursor: 'pointer' }}>
            <input type="radio" name="paymentMethod" value={opt.id} checked={paymentMethod === opt.id} onChange={(e) => setPaymentMethod(e.target.value)} style={{ width: '18px', height: '18px', marginTop: '3px' }} />
            <div>
              <div style={{ fontWeight: '800', fontSize: '15px', color: theme.textMain }}>{opt.id}</div>
              <div style={{ fontSize: '12px', color: theme.textMuted, marginTop: '2px' }}>{opt.desc}</div>
            </div>
          </label>
        ))}
        <button type="submit" style={{ padding: '15px', backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: '800', cursor: 'pointer', marginTop: '10px' }}>
          Review Order →
        </button>
      </form>
    </div>
  );
};

export default PaymentScreen;
