import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { addToCart } from '../slices/cartSlice';
import { INITIAL_PRODUCTS, resolveProductData } from '../constants/initialProducts';

const CATALOG_STORAGE_KEY = 'devgear_products_en_v7';

const findCachedProduct = (productId) => {
  try {
    const cached = JSON.parse(localStorage.getItem(CATALOG_STORAGE_KEY) || '[]');
    const found = cached.find((p) => String(p._id) === String(productId));
    if (found) return resolveProductData(found);
  } catch {}
  return INITIAL_PRODUCTS.find((p) => String(p._id) === String(productId)) || INITIAL_PRODUCTS[0];
};

const signInBtnStyle = {
  display: 'inline-block',
  padding: '10px 20px',
  backgroundColor: '#2563eb',
  color: '#ffffff',
  textDecoration: 'none',
  borderRadius: '8px',
  fontWeight: '700'
};

const ProductScreen = ({ theme }) => {
  const { id: productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  const [product, setProduct] = useState(() => findCachedProduct(productId));
  const [qty, setQty] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [reviewNotice, setReviewNotice] = useState('');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setProduct(findCachedProduct(productId));
    axios
      .get(`/api/products/${productId}`)
      .then(({ data }) => {
        if (data) {
          setProduct(resolveProductData(data));
        }
      })
      .catch(() => {});
  }, [productId]);

  const handleBackToCatalog = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePosition({ x, y });
  };

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate('/cart');
  };

  const submitReviewHandler = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    const newReview = {
      name: userInfo?.name ? userInfo.name.replace(' (Sandbox Admin)', '').replace(' (Admin)', '') : 'Faruk Aydin',
      rating: Number(rating),
      comment: comment.trim(),
      createdAt: new Date().toISOString().substring(0, 10)
    };
    const nextReviews = [newReview, ...(product.reviews || [])];
    const avg = nextReviews.reduce((acc, r) => acc + Number(r.rating || 5), 0) / nextReviews.length;
    const updatedProduct = {
      ...product,
      reviews: nextReviews,
      numReviews: nextReviews.length,
      rating: Number(avg.toFixed(1))
    };
    setProduct(updatedProduct);

    try {
      const cached = JSON.parse(localStorage.getItem(CATALOG_STORAGE_KEY) || '[]');
      if (cached.length > 0) {
        localStorage.setItem(
          CATALOG_STORAGE_KEY,
          JSON.stringify(cached.map((p) => (String(p._id) === String(product._id) ? updatedProduct : p)))
        );
      }
    } catch {}

    setComment('');
    setReviewNotice('✓ Your review has been published and review count updated!');
    setTimeout(() => setReviewNotice(''), 3500);
    try {
      await axios.post(`/api/products/${productId}/reviews`, {
        rating: Number(rating),
        comment: newReview.comment
      });
    } catch {}
  };

  const reviewsList = Array.isArray(product.reviews) ? product.reviews : [];
  const exactReviewCount = reviewsList.length;
  const computedRating =
    exactReviewCount > 0
      ? (reviewsList.reduce((acc, r) => acc + Number(r.rating || 5), 0) / exactReviewCount).toFixed(1)
      : Number(product.rating || 4.9).toFixed(1);

  return (
    <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '10px 16px' }}>
      <button
        type="button"
        onClick={handleBackToCatalog}
        style={{
          display: 'inline-block',
          marginBottom: '25px',
          padding: '10px 20px',
          backgroundColor: theme.bgCard,
          border: `1px solid ${theme.borderColor}`,
          color: theme.textMain,
          borderRadius: '8px',
          fontWeight: '700',
          fontSize: '14px',
          cursor: 'pointer'
        }}
      >
        &larr; Back to Catalog
      </button>

      <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
        <div style={{ flex: '1 1 380px' }}>
          <div
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => {
              setIsZoomed(false);
              setMousePosition({ x: 50, y: 50 });
            }}
            onMouseMove={handleMouseMove}
            style={{
              overflow: 'hidden',
              borderRadius: '12px',
              cursor: 'zoom-in',
              border: `1px solid ${theme.borderColor}`,
              position: 'relative',
              backgroundColor: '#0f172a',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{
                width: '100%',
                height: '440px',
                display: 'block',
                objectFit: 'cover',
                transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
                transform: isZoomed ? 'scale(2.25)' : 'scale(1)',
                transition: isZoomed ? 'transform 0.08s ease-out' : 'transform 0.28s ease-out'
              }}
            />
            {!isZoomed && (
              <span
                style={{
                  position: 'absolute',
                  bottom: '12px',
                  right: '12px',
                  backgroundColor: 'rgba(15, 23, 42, 0.78)',
                  color: '#fff',
                  fontSize: '11px',
                  fontWeight: '700',
                  padding: '5px 10px',
                  borderRadius: '6px',
                  pointerEvents: 'none'
                }}
              >
                🔍 Hover to Zoom
              </span>
            )}
          </div>
        </div>

        <div style={{ flex: '1 1 320px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <h2 style={{ fontSize: '30px', color: theme.textMain, margin: 0, fontWeight: '900' }}>{product.name}</h2>
          <p style={{ margin: 0, color: theme.textMuted, fontSize: '13px', textTransform: 'uppercase', fontWeight: '700' }}>
            Brand: <span style={{ color: theme.textMain }}>{product.brand}</span> | Category:{' '}
            <span style={{ color: theme.textMain }}>{product.category}</span>
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ color: '#f59e0b', fontSize: '18px', fontWeight: '800' }}>
              {'★'.repeat(Math.round(Number(computedRating)))} {computedRating}
            </span>
            <span style={{ color: theme.textMuted, fontSize: '14px', fontWeight: '600' }}>
              ({exactReviewCount} sample {exactReviewCount === 1 ? 'review' : 'reviews'})
            </span>
          </div>
          <div style={{ borderTop: `1px solid ${theme.borderColor}`, borderBottom: `1px solid ${theme.borderColor}`, padding: '20px 0' }}>
            <h4 style={{ margin: '0 0 10px 0', color: theme.textMain, fontSize: '16px' }}>Hardware Overview</h4>
            <p style={{ margin: 0, color: theme.textMuted, lineHeight: '1.7', fontSize: '15px' }}>{product.description}</p>
          </div>
        </div>

        <div style={{ flex: '1 1 280px' }}>
          <div style={{ backgroundColor: theme.bgCard, border: `1px solid ${theme.borderColor}`, borderRadius: '12px', padding: '28px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '18px', alignItems: 'center' }}>
              <span style={{ color: theme.textMuted, fontWeight: '600' }}>Price:</span>
              <span style={{ fontWeight: '900', color: theme.textMain, fontSize: '26px' }}>${Number(product.price).toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '18px', borderTop: `1px solid ${theme.borderColor}`, paddingTop: '18px' }}>
              <span style={{ color: theme.textMuted, fontWeight: '600' }}>Status:</span>
              <span style={{ fontWeight: '800', color: product.countInStock > 0 ? '#10b981' : '#ef4444' }}>
                {product.countInStock > 0 ? `In Stock (${product.countInStock} units)` : 'Out of Stock'}
              </span>
            </div>
            {product.countInStock > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '22px', borderTop: `1px solid ${theme.borderColor}`, paddingTop: '18px' }}>
                <span style={{ color: theme.textMuted, fontWeight: '600' }}>Quantity:</span>
                <select
                  value={qty}
                  onChange={(e) => setQty(Number(e.target.value))}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '8px',
                    border: `1px solid ${theme.borderColor}`,
                    backgroundColor: theme.bgMain,
                    color: theme.textMain,
                    fontWeight: '700'
                  }}
                >
                  {[...Array(Math.min(10, product.countInStock)).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <button
              onClick={addToCartHandler}
              disabled={product.countInStock === 0}
              style={{
                width: '100%',
                padding: '15px',
                backgroundColor: product.countInStock === 0 ? theme.textMuted : '#2563eb',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '800',
                cursor: product.countInStock === 0 ? 'not-allowed' : 'pointer'
              }}
            >
              {product.countInStock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '50px', paddingTop: '36px', borderTop: `1px solid ${theme.borderColor}`, display: 'flex', flexWrap: 'wrap', gap: '36px' }}>
        <div style={{ flex: '1 1 400px' }}>
          <h3 style={{ fontSize: '22px', color: theme.textMain, fontWeight: '800', marginBottom: '20px' }}>
            Customer Reviews ({exactReviewCount})
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {reviewsList.map((review, index) => (
              <div key={index} style={{ padding: '18px', backgroundColor: theme.bgCard, borderRadius: '12px', border: `1px solid ${theme.borderColor}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <strong style={{ color: theme.textMain, fontSize: '15px' }}>{review.name}</strong>
                  <span style={{ color: '#f59e0b', fontWeight: '800' }}>{'★'.repeat(Number(review.rating || 5))}</span>
                </div>
                <p style={{ color: theme.textMuted, fontSize: '12px', margin: '0 0 8px 0' }}>
                  {review.createdAt ? String(review.createdAt).substring(0, 10) : 'Sample Review'}
                </p>
                <p style={{ margin: 0, color: theme.textMain, lineHeight: '1.5', fontSize: '14px' }}>{review.comment}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ flex: '1 1 380px' }}>
          <h3 style={{ fontSize: '22px', color: theme.textMain, fontWeight: '800', marginBottom: '20px' }}>Write a Customer Review</h3>
          {reviewNotice && (
            <div style={{ padding: '12px 16px', backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#10b981', borderRadius: '8px', marginBottom: '16px', fontWeight: '700' }}>
              {reviewNotice}
            </div>
          )}
          {userInfo ? (
            <form onSubmit={submitReviewHandler} style={{ backgroundColor: theme.bgCard, padding: '24px', borderRadius: '12px', border: `1px solid ${theme.borderColor}` }}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: theme.textMain, fontWeight: '600' }}>Rating</label>
                <select
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: `1px solid ${theme.borderColor}`, backgroundColor: theme.bgMain, color: theme.textMain }}
                >
                  <option value="5">5 - Excellent</option>
                  <option value="4">4 - Very Good</option>
                  <option value="3">3 - Good</option>
                  <option value="2">2 - Fair</option>
                  <option value="1">1 - Poor</option>
                </select>
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: theme.textMain, fontWeight: '600' }}>Your Review</label>
                <textarea
                  rows="4"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                  placeholder="Share your experience with this hardware..."
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: `1px solid ${theme.borderColor}`, backgroundColor: theme.bgMain, color: theme.textMain, boxSizing: 'border-box' }}
                />
              </div>
              <button
                type="submit"
                style={{ padding: '12px 20px', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '700', cursor: 'pointer', width: '100%' }}
              >
                Submit Review
              </button>
            </form>
          ) : (
            <div style={{ padding: '24px', backgroundColor: theme.bgCard, borderRadius: '12px', border: `1px solid ${theme.borderColor}`, textAlign: 'center' }}>
              <p style={{ color: theme.textMain, marginBottom: '14px' }}>Sign in (or use 1-Click Demo Login) to post a review.</p>
              <Link to="/login" style={signInBtnStyle}>Sign In / Demo Login</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductScreen;
