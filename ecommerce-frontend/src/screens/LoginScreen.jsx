import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setCredentials } from '../slices/authSlice';

const LoginScreen = ({ theme }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirect = new URLSearchParams(search).get('redirect') || '/';
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) navigate(redirect);
  }, [navigate, userInfo, redirect]);

  const performAuth = async (targetEmail, targetPassword, demoFallbackUser = null) => {
    setLoading(true);
    setError('');
    try {
      const endpoint = isRegister && !demoFallbackUser ? '/api/users/register' : '/api/users/login';
      const payload = isRegister && !demoFallbackUser ? { name, email: targetEmail, password: targetPassword } : { email: targetEmail, password: targetPassword };
      const { data } = await axios.post(endpoint, payload, { timeout: 5000 });
      dispatch(setCredentials(data));
      navigate(redirect);
    } catch (err) {
      if (demoFallbackUser) {
        dispatch(setCredentials(demoFallbackUser));
        navigate(redirect);
        return;
      }
      setError(err.response?.data?.message || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = (role) => {
    if (role === 'admin') {
      performAuth('admin@devgear.com', '123456', { _id: 'demo-admin-id', name: 'Faruk Aydin (Admin)', email: 'admin@devgear.com', isAdmin: true, token: 'demo-jwt-admin-token' });
    } else {
      performAuth('musteri@devgear.com', '123456', { _id: 'demo-customer-id', name: 'Alex Rivera', email: 'customer@devgear.com', isAdmin: false, token: 'demo-jwt-customer-token' });
    }
  };

  return (
    <div style={{ maxWidth: '440px', margin: '48px auto', padding: '32px', backgroundColor: theme.bgCard, border: `1px solid ${theme.borderColor}`, borderRadius: '14px' }}>
      <h1 style={{ textAlign: 'center', margin: '0 0 8px 0', color: theme.textMain, fontSize: '26px', fontWeight: '900' }}>
        {isRegister ? 'Create Account' : 'Sign In to DevGear'}
      </h1>
      <p style={{ textAlign: 'center', margin: '0 0 20px 0', color: theme.textMuted, fontSize: '13px' }}>JWT Session & Role-Based Access Control</p>

      <div style={{ padding: '14px', borderRadius: '10px', backgroundColor: theme.bgMain, border: `1px solid ${theme.borderColor}`, marginBottom: '20px' }}>
        <p style={{ margin: '0 0 10px 0', fontSize: '12px', fontWeight: '700', color: theme.textMuted, textTransform: 'uppercase' }}>⚡ Instant Recruiter / Demo Access (1-Click):</p>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button type="button" onClick={() => handleDemoLogin('customer')} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #2563eb', backgroundColor: '#2563eb', color: '#fff', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}>
            👤 Demo Customer
          </button>
          <button type="button" onClick={() => handleDemoLogin('admin')} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: `1px solid ${theme.borderColor}`, backgroundColor: theme.bgCard, color: theme.textMain, fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}>
            🛡️ Demo Admin
          </button>
        </div>
      </div>

      {error && <div style={{ backgroundColor: '#ef4444', color: 'white', padding: '12px', borderRadius: '8px', marginBottom: '18px', textAlign: 'center', fontSize: '14px', fontWeight: '600' }}>{error}</div>}

      <form onSubmit={(e) => { e.preventDefault(); performAuth(email, password); }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {isRegister && (
          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '700', fontSize: '13px', color: theme.textMain }}>Full Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Alex Rivera" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: `1px solid ${theme.borderColor}`, backgroundColor: theme.bgMain, color: theme.textMain, boxSizing: 'border-box' }} required />
          </div>
        )}
        <div>
          <label style={{ display: 'block', marginBottom: '6px', fontWeight: '700', fontSize: '13px', color: theme.textMain }}>Email Address</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="customer@devgear.com" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: `1px solid ${theme.borderColor}`, backgroundColor: theme.bgMain, color: theme.textMain, boxSizing: 'border-box' }} required />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '6px', fontWeight: '700', fontSize: '13px', color: theme.textMain }}>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: `1px solid ${theme.borderColor}`, backgroundColor: theme.bgMain, color: theme.textMain, boxSizing: 'border-box' }} required />
        </div>
        <button type="submit" disabled={loading} style={{ padding: '14px', backgroundColor: theme.textMain, color: theme.bgCard, border: 'none', borderRadius: '8px', fontSize: '15px', fontWeight: '800', cursor: 'pointer' }}>
          {loading ? 'Authenticating...' : isRegister ? 'Register & Continue' : 'Sign In'}
        </button>
      </form>

      <div style={{ textAlign: 'center', marginTop: '18px', fontSize: '13px', color: theme.textMuted }}>
        {isRegister ? 'Already have an account?' : 'New customer?'}{' '}
        <button type="button" onClick={() => setIsRegister(!isRegister)} style={{ background: 'none', border: 'none', color: '#2563eb', fontWeight: '700', cursor: 'pointer', textDecoration: 'underline' }}>
          {isRegister ? 'Sign In' : 'Create an Account'}
        </button>
      </div>
    </div>
  );
};

export default LoginScreen;
