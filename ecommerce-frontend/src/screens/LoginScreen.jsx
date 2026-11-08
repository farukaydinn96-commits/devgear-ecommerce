import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setCredentials } from '../slices/authSlice';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { search } = useLocation(); // YENİ: URL'deki parametreleri okumak için

  // URL'de "redirect=/shipping" varsa onu al, yoksa ana sayfaya (/) git
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    // Kullanıcı zaten giriş yapmışsa, gitmek istediği yere (örneğin /shipping) yönlendir
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const config = { headers: { 'Content-Type': 'application/json' } };
      const { data } = await axios.post('/api/users/login', { email, password }, config);
      
      dispatch(setCredentials(data));
      navigate(redirect); // Başarılı girişte de hedefe yönlendir
    } catch (err) {
      setError(err.response?.data?.message || 'Giriş yapılamadı');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '60px auto', padding: '30px', border: '1px solid #ddd', borderRadius: '12px', boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '25px' }}>Giriş Yap</h1>
      
      {error && <div style={{ backgroundColor: '#ff4d4f', color: 'white', padding: '12px', borderRadius: '6px', marginBottom: '20px', textAlign: 'center' }}>{error}</div>}

      <form onSubmit={submitHandler} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>E-Posta Adresi</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box', fontSize: '16px' }}
            required
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Şifre</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box', fontSize: '16px' }}
            required
          />
        </div>

        <button 
          type="submit"
          style={{ padding: '15px', backgroundColor: '#000', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }}
        >
          Giriş Yap
        </button>
      </form>
    </div>
  );
};

export default LoginScreen;