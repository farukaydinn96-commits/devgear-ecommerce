import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Product from '../components/Product';

const HomeScreen = ({ theme }) => {
  const { category, keyword, pageNumber } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const productsRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('/api/products');
        setProducts(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  const scrollToProducts = () => {
    productsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  if (loading) return <h2 style={{ textAlign: 'center', marginTop: '50px', color: theme.textMain }}>Loading...</h2>;

  // Güçlü Filtreleme: Arama kelimesi veya kategoriye göre ürünleri süz
  let filteredProducts = products;
  
  if (category) {
    filteredProducts = filteredProducts.filter((p) => p.category.toLowerCase() === category.toLowerCase());
  }
  
  if (keyword) {
    filteredProducts = filteredProducts.filter((p) => p.name.toLowerCase().includes(keyword.toLowerCase()));
  }

  // Gece/Gündüz Moduna Göre Temiz ve Minimalist Arka Plan Renk Filtresi
  const heroGradient = theme.isDark 
    ? 'linear-gradient(rgba(15, 23, 42, 0.75), rgba(15, 23, 42, 0.9))'
    : 'linear-gradient(rgba(248, 250, 252, 0.6), rgba(241, 245, 249, 0.8))';

  return (
    <div>
      {/* SADECE ANA SAYFADA (ARAMA VE KATEGORİ HARİÇ) GÖRÜNECEK MİNİMALİST VİTRİN */}
      {!category && !keyword && (
        <div style={{
          width: '100%', minHeight: '350px', borderRadius: '16px', marginBottom: '35px',
          // Şık, açık gri tonlu minimalist bir Apple çalışma alanı görseli
          backgroundImage: `${heroGradient}, url("https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=1600&q=80")`,
          backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', flexDirection: 'column',
          justifyContent: 'center', alignItems: 'center', padding: '50px', textAlign: 'center', boxShadow: '0 10px 30px -10px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ fontSize: '42px', color: theme.textMain, fontWeight: '900', margin: '0 0 15px 0', letterSpacing: '-1px' }}>
            Upgrade Your Workspace
          </h2>
          <p style={{ fontSize: '18px', maxWidth: '600px', margin: '0 0 30px 0', color: theme.textMain, opacity: 0.8, lineHeight: '1.6', fontWeight: '500' }}>
            Discover the premium gear favored by top developers. Elevate your code, elevate your comfort.
          </p>
          <button 
            onClick={scrollToProducts} 
            onMouseDown={(e) => e.target.style.transform = 'scale(0.95)'}
            onMouseUp={(e) => e.target.style.transform = 'scale(1)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            style={{ 
              padding: '16px 32px', 
              backgroundColor: theme.textMain, 
              color: theme.bgCard, 
              border: 'none', 
              borderRadius: '8px', 
              fontSize: '18px', 
              fontWeight: 'bold', 
              cursor: 'pointer', 
              transition: 'transform 0.1s, box-shadow 0.2s', 
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)' 
            }}
          >
            Explore Collection
          </button>
        </div>
      )}

      {/* ÜRÜN LİSTESİ BAŞLIĞI */}
      <div ref={productsRef} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingTop: '20px' }}>
        <h1 style={{ fontSize: '24px', color: theme.textMain, fontWeight: '800', margin: '0 0 0 10px' }}>
          {category ? `${category} Products` : keyword ? `Search Results for "${keyword}"` : 'Latest Arrivals'}
        </h1>
      </div>
      
      {filteredProducts.length === 0 ? (
        <h3 style={{ padding: '0 10px', color: theme.textMuted }}>No products found.</h3>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '15px', padding: '0 10px' }}>
          {filteredProducts.map((product) => (
            <Product key={product._id} product={product} theme={theme} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomeScreen;