import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { addToCart } from '../slices/cartSlice';

const ProductScreen = ({ theme }) => {
  const { id: productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Kullanıcı giriş yapmış mı kontrol etmek için Redux'tan userInfo'yu çekiyoruz
  const { userInfo } = useSelector((state) => state.auth);

  const [product, setProduct] = useState({ reviews: [] });
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  
  // Profesyonel Büyüteç (Zoom) Efekti İçin
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  // Yorum Formu State'leri
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`/api/products/${productId}`);
        // Eğer backend'den reviews dizisi gelmezse hata almamak için boş dizi atıyoruz
        if (!data.reviews) data.reviews = []; 
        setProduct(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate('/cart');
  };

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePosition({ x, y });
  };

  // Yorum Gönderme Fonksiyonu (Şu anlık UI testi için, backend entegrasyonu eklenebilir)
  const submitReviewHandler = (e) => {
    e.preventDefault();
    alert(`Review Submitted! Rating: ${rating}, Comment: ${comment}`);
    // Burada backend'e axios.post(`/api/products/${productId}/reviews`, { rating, comment }) atılacak
    setRating(0);
    setComment('');
  };

  if (loading) return <h2 style={{ textAlign: 'center', marginTop: '50px', color: theme.textMain }}>Loading Product...</h2>;

  return (
    <div>
      <Link to="/" style={{ display: 'inline-block', marginBottom: '25px', padding: '10px 20px', backgroundColor: theme.bgCard, border: `1px solid ${theme.borderColor}`, color: theme.textMain, textDecoration: 'none', borderRadius: '8px', fontWeight: '600', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
        &larr; Go Back
      </Link>

      <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
        
        {/* MAGNIFIER (BÜYÜTEÇ) ALANI */}
        <div style={{ flex: '1 1 400px' }}>
          <div 
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => { setIsZoomed(false); setMousePosition({ x: 50, y: 50 }); }}
            onMouseMove={handleMouseMove}
            style={{ overflow: 'hidden', borderRadius: '12px', cursor: 'zoom-in', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', border: `1px solid ${theme.borderColor}`, position: 'relative' }}
          >
            <img 
              src={product.image} 
              alt={product.name} 
              style={{ 
                width: '100%', height: '500px', display: 'block', objectFit: 'cover',
                transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
                transform: isZoomed ? 'scale(2.5)' : 'scale(1)',
                transition: 'transform 0.3s ease-out'
              }} 
            />
          </div>
        </div>

        {/* ÜRÜN BİLGİLERİ */}
        <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <h2 style={{ fontSize: '32px', color: theme.textMain, margin: 0, fontWeight: '900', letterSpacing: '-0.5px' }}>{product.name}</h2>
          <p style={{ margin: 0, color: theme.textMuted, fontSize: '14px', textTransform: 'uppercase', fontWeight: '600' }}>
            Brand: <span style={{ color: theme.textMain }}>{product.brand}</span> | Category: <span style={{ color: theme.textMain }}>{product.category}</span>
          </p>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '5px' }}>
            <span style={{ color: '#f59e0b', fontSize: '18px' }}>{'⭐'.repeat(Math.round(product.rating || 0))}</span>
            <span style={{ color: theme.textMuted, fontSize: '14px', fontWeight: '500' }}>({product.numReviews} reviews)</span>
          </div>

          <div style={{ borderTop: `1px solid ${theme.borderColor}`, borderBottom: `1px solid ${theme.borderColor}`, padding: '20px 0', marginTop: '10px' }}>
            <h4 style={{ margin: '0 0 10px 0', color: theme.textMain, fontSize: '16px' }}>Product Description</h4>
            <p style={{ margin: 0, color: theme.textMuted, lineHeight: '1.7', fontSize: '15px' }}>{product.description}</p>
          </div>
        </div>

        {/* SEPETE EKLE KARTI */}
        <div style={{ flex: '1 1 300px' }}>
          <div style={{ backgroundColor: theme.bgCard, border: `1px solid ${theme.borderColor}`, borderRadius: '12px', padding: '30px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', alignItems: 'center' }}>
              <span style={{ color: theme.textMuted, fontSize: '16px', fontWeight: '600' }}>Price:</span>
              <span style={{ fontWeight: '900', color: theme.textMain, fontSize: '26px' }}>${product.price}</span>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', fontSize: '16px', borderTop: `1px solid ${theme.borderColor}`, paddingTop: '20px' }}>
              <span style={{ color: theme.textMuted, fontWeight: '600' }}>Status:</span>
              <span style={{ fontWeight: '800', color: product.countInStock > 0 ? '#10b981' : '#ef4444' }}>
                {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>

            {product.countInStock > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', borderTop: `1px solid ${theme.borderColor}`, paddingTop: '20px' }}>
                <span style={{ color: theme.textMuted, fontWeight: '600' }}>Quantity:</span>
                <select value={qty} onChange={(e) => setQty(Number(e.target.value))} style={{ padding: '10px 15px', borderRadius: '8px', border: `1px solid ${theme.borderColor}`, cursor: 'pointer', backgroundColor: theme.bgMain, color: theme.textMain, fontSize: '16px', fontWeight: 'bold' }}>
                  {[...Array(product.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>{x + 1}</option>
                  ))}
                </select>
              </div>
            )}

            <button
              onClick={addToCartHandler}
              disabled={product.countInStock === 0}
              style={{ width: '100%', padding: '16px', backgroundColor: product.countInStock === 0 ? theme.textMuted : theme.textMain, color: theme.bgCard, border: 'none', borderRadius: '8px', fontSize: '18px', fontWeight: '800', cursor: product.countInStock === 0 ? 'not-allowed' : 'pointer', transition: 'transform 0.1s' }}
              onMouseDown={(e) => e.target.style.transform = 'scale(0.98)'}
              onMouseUp={(e) => e.target.style.transform = 'scale(1)'}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            >
              {product.countInStock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>

      {/* --- YENİ EKLENEN KISIM: MÜŞTERİ YORUMLARI VE FORM --- */}
      <div style={{ marginTop: '60px', paddingTop: '40px', borderTop: `1px solid ${theme.borderColor}`, display: 'flex', flexWrap: 'wrap', gap: '40px' }}>
        
        {/* SOL TARAF: YORUMLARI LİSTELE */}
        <div style={{ flex: '1 1 400px' }}>
          <h3 style={{ fontSize: '24px', color: theme.textMain, fontWeight: '800', marginBottom: '25px' }}>Customer Reviews</h3>
          
          {product.reviews.length === 0 ? (
            <div style={{ padding: '20px', backgroundColor: theme.bgCard, borderRadius: '8px', border: `1px solid ${theme.borderColor}`, color: theme.textMuted }}>
              No reviews yet. Be the first to review this product!
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {product.reviews.map((review, index) => (
                <div key={index} style={{ padding: '20px', backgroundColor: theme.bgCard, borderRadius: '12px', border: `1px solid ${theme.borderColor}`, boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <strong style={{ color: theme.textMain, fontSize: '16px' }}>{review.name}</strong>
                    <span style={{ color: '#f59e0b' }}>{'⭐'.repeat(review.rating)}</span>
                  </div>
                  <p style={{ color: theme.textMuted, fontSize: '12px', marginBottom: '10px' }}>{review.createdAt ? review.createdAt.substring(0, 10) : 'Just now'}</p>
                  <p style={{ margin: 0, color: theme.textMain, lineHeight: '1.5' }}>{review.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* SAĞ TARAF: YORUM YAPMA FORMU */}
        <div style={{ flex: '1 1 400px' }}>
          <h3 style={{ fontSize: '24px', color: theme.textMain, fontWeight: '800', marginBottom: '25px' }}>Write a Review</h3>
          
          {userInfo ? (
            <form onSubmit={submitReviewHandler} style={{ backgroundColor: theme.bgCard, padding: '30px', borderRadius: '12px', border: `1px solid ${theme.borderColor}`, boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
              
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '10px', color: theme.textMain, fontWeight: '600' }}>Rating</label>
                <select 
                  value={rating} 
                  onChange={(e) => setRating(Number(e.target.value))}
                  required
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: `1px solid ${theme.borderColor}`, backgroundColor: theme.bgMain, color: theme.textMain, fontSize: '16px' }}
                >
                  <option value="">Select a rating...</option>
                  <option value="1">1 - Poor</option>
                  <option value="2">2 - Fair</option>
                  <option value="3">3 - Good</option>
                  <option value="4">4 - Very Good</option>
                  <option value="5">5 - Excellent</option>
                </select>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '10px', color: theme.textMain, fontWeight: '600' }}>Comment</label>
                <textarea 
                  rows="4" 
                  value={comment} 
                  onChange={(e) => setComment(e.target.value)}
                  required
                  placeholder="Share your thoughts about this product..."
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: `1px solid ${theme.borderColor}`, backgroundColor: theme.bgMain, color: theme.textMain, fontSize: '15px', resize: 'vertical' }}
                ></textarea>
              </div>

              <button 
                type="submit" 
                style={{ padding: '14px 24px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', width: '100%', transition: 'background-color 0.2s', boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)' }}
              >
                Submit Review
              </button>
            </form>
          ) : (
            <div style={{ padding: '25px', backgroundColor: theme.bgMain, borderRadius: '12px', border: `1px solid ${theme.borderColor}`, textAlign: 'center' }}>
              <p style={{ color: theme.textMain, fontSize: '16px', marginBottom: '15px' }}>You must be signed in to write a review.</p>
              <Link to="/login" style={{ display: 'inline-block', padding: '10px 20px', backgroundColor: theme.textMain, color: theme.bgCard, textDecoration: 'none', borderRadius: '6px', fontWeight: '600' }}>
                Sign In Now
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductScreen;