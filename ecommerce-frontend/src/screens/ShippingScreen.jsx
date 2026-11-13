import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../slices/cartSlice';

const ShippingScreen = ({ theme }) => {
  const { shippingAddress } = useSelector((state) => state.cart);
  const [address, setAddress] = useState(shippingAddress?.address || '742 Evergreen Terrace, Suite 200');
  const [city, setCity] = useState(shippingAddress?.city || 'San Francisco');
  const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode || '94107');
  const [country, setCountry] = useState(shippingAddress?.country || 'United States');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate('/payment');
  };

  return (
    <div style={{ maxWidth: '500px', margin: '40px auto', padding: '30px', backgroundColor: theme.bgCard, border: `1px solid ${theme.borderColor}`, borderRadius: '12px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '25px', fontSize: '26px', color: theme.textMain, fontWeight: '900' }}>Shipping Address</h1>
      <form onSubmit={submitHandler} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '6px', fontWeight: '700', color: theme.textMain }}>Street Address</label>
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: `1px solid ${theme.borderColor}`, backgroundColor: theme.bgMain, color: theme.textMain, boxSizing: 'border-box' }} required />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '6px', fontWeight: '700', color: theme.textMain }}>City</label>
          <input type="text" value={city} onChange={(e) => setCity(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: `1px solid ${theme.borderColor}`, backgroundColor: theme.bgMain, color: theme.textMain, boxSizing: 'border-box' }} required />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '6px', fontWeight: '700', color: theme.textMain }}>Postal Code</label>
          <input type="text" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: `1px solid ${theme.borderColor}`, backgroundColor: theme.bgMain, color: theme.textMain, boxSizing: 'border-box' }} required />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '6px', fontWeight: '700', color: theme.textMain }}>Country</label>
          <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: `1px solid ${theme.borderColor}`, backgroundColor: theme.bgMain, color: theme.textMain, boxSizing: 'border-box' }} required />
        </div>
        <button type="submit" style={{ padding: '15px', backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: '800', cursor: 'pointer' }}>
          Continue to Payment →
        </button>
      </form>
    </div>
  );
};

export default ShippingScreen;
