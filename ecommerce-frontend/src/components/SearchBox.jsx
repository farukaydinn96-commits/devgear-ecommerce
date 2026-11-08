import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBox = ({ theme }) => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate('/');
    }
  };

  return (
    <form onSubmit={submitHandler} style={{ display: 'flex', alignItems: 'center', backgroundColor: theme.bgMain, borderRadius: '8px', padding: '5px 15px', border: `1px solid ${theme.borderColor}`, flex: '0 1 400px', margin: '0 20px', transition: 'all 0.3s ease' }}>
      <input
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        value={keyword}
        placeholder="Search products..."
        style={{ border: 'none', backgroundColor: 'transparent', color: theme.textMain, width: '100%', outline: 'none', padding: '8px 0', fontSize: '15px' }}
      />
      <button type="submit" style={{ background: 'none', border: 'none', cursor: 'pointer', color: theme.textMuted, fontSize: '18px', padding: '0', display: 'flex', alignItems: 'center' }}>
        🔍
      </button>
    </form>
  );
};

export default SearchBox;