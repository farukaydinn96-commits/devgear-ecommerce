import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../slices/cartSlice';

const Product = ({ product, theme, onQuickAdd }) => {
  const dispatch = useDispatch();
  const ratingValue = Number(product.rating || 4.8).toFixed(1);
  const reviewCount = Number(product.numReviews || (product.reviews ? product.reviews.length : 18));
  const inStock = (product.countInStock ?? 10) > 0;

  const handleQuickAdd = (e) => {
    e.preventDefault();
    if (!inStock) return;
    dispatch(addToCart({ ...product, qty: 1 }));
    if (onQuickAdd) onQuickAdd(product.name);
  };

  return (
    <div style={{ backgroundColor: theme.bgCard, borderRadius: '10px', border: `1px solid ${theme.borderColor}`, display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      <Link to={`/product/${product._id}`} style={{ display: 'block', position: 'relative', backgroundColor: '#0f172a' }}>
        <img src={product.image} alt={product.name} loading="lazy" style={{ width: '100%', height: '160px', objectFit: 'cover', display: 'block' }} />
        {!inStock && (
          <span style={{ position: 'absolute', top: '8px', right: '8px', backgroundColor: 'rgba(239, 68, 68, 0.92)', color: '#fff', fontSize: '10px', fontWeight: '700', padding: '3px 7px', borderRadius: '4px' }}>
            Out of Stock
          </span>
        )}
      </Link>

      <div style={{ padding: '14px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
          <span style={{ color: theme.textMuted, fontSize: '10px', fontWeight: '700', textTransform: 'uppercase' }}>{product.category}</span>
          <span style={{ color: theme.textMuted, fontSize: '10px', fontWeight: '600' }}>{product.brand}</span>
        </div>

        <Link to={`/product/${product._id}`} style={{ textDecoration: 'none', color: theme.textMain }}>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: '700', lineHeight: '1.35', minHeight: '38px' }}>{product.name}</h3>
        </Link>

        <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px' }}>
          <span style={{ color: '#f59e0b', fontWeight: '800' }}>★ {ratingValue}</span>
          <span style={{ color: theme.textMuted }}>({reviewCount} reviews)</span>
        </div>

        <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontSize: '16px', fontWeight: '900', color: theme.textMain }}>${Number(product.price).toFixed(2)}</span>
          <div style={{ display: 'flex', gap: '6px' }}>
            <button type="button" onClick={handleQuickAdd} disabled={!inStock} style={{ backgroundColor: inStock ? '#2563eb' : theme.borderColor, color: '#fff', border: 'none', padding: '6px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: '700', cursor: inStock ? 'pointer' : 'not-allowed' }}>
              + Cart
            </button>
            <Link to={`/product/${product._id}`} style={{ backgroundColor: theme.textMain, color: theme.bgCard, padding: '6px 10px', borderRadius: '6px', textDecoration: 'none', fontSize: '11px', fontWeight: '700' }}>
              Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
