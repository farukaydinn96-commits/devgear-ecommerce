import { Link } from 'react-router-dom';

const Product = ({ product, theme }) => {
  return (
    <div className="product-card" style={{ backgroundColor: theme.bgCard, borderRadius: '8px', border: `1px solid ${theme.borderColor}`, display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Link to={`/product/${product._id}`} className="product-img-wrapper" style={{ display: 'block', borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }}>
        <img src={product.image} alt={product.name} className="product-img" style={{ width: '100%', height: '140px', objectFit: 'cover' }} />
      </Link>

      <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <p style={{ color: theme.textMuted, fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '4px' }}>
          {product.category}
        </p>

        <Link to={`/product/${product._id}`} style={{ textDecoration: 'none', color: theme.textMain }}>
          <h3 style={{ margin: '0 0 6px 0', fontSize: '13px', fontWeight: '600', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: '1.4' }}>
            {product.name}
          </h3>
        </Link>

        <div style={{ marginBottom: '10px', color: theme.textMuted, fontSize: '10px' }}>
          <span style={{ color: '#f59e0b' }}>{'⭐'.repeat(Math.round(product.rating || 0))}</span> 
          <span style={{ marginLeft: '4px' }}>({product.numReviews || 0} reviews)</span>
        </div>

        <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '5px' }}>
          <span style={{ fontSize: '15px', fontWeight: '800', color: theme.textMain }}>
            ${product.price}
          </span>
          <Link to={`/product/${product._id}`} style={{ backgroundColor: theme.textMain, color: theme.bgCard, padding: '6px 10px', borderRadius: '4px', textDecoration: 'none', fontSize: '11px', fontWeight: '600' }}>
            View
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Product;