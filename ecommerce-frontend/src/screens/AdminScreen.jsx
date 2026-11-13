import { useState } from 'react';
import { useSelector } from 'react-redux';
import { INITIAL_PRODUCTS } from '../constants/initialProducts';

export default function AdminScreen({ theme }) {
  const { userInfo } = useSelector((state) => state.auth || {});
  const [products, setProducts] = useState(() => {
    try {
      const cached = JSON.parse(localStorage.getItem('devgear_products_en_v3') || '[]');
      return cached.length > 0 ? cached : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });
  const [statusMsg, setStatusMsg] = useState('');
  const [newProduct, setNewProduct] = useState({
    name: '', brand: 'Apple', price: '', category: 'Accessories', countInStock: 15,
    image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&q=80',
    description: 'Professional developer hardware.'
  });

  const notify = (msg) => { setStatusMsg(msg); setTimeout(() => setStatusMsg(''), 3000); };

  const syncCatalog = (updated) => {
    setProducts(updated);
    try { localStorage.setItem('devgear_products_en_v3', JSON.stringify(updated)); } catch {}
  };

  const handleStockChange = (id, delta) => {
    syncCatalog(products.map((p) => p._id === id ? { ...p, countInStock: Math.max(0, Number(p.countInStock || 0) + delta) } : p));
    notify('✓ Inventory stock updated');
  };

  const handleCreateProduct = (e) => {
    e.preventDefault();
    const created = {
      ...newProduct, _id: `devgear-${Date.now()}`, price: Number(newProduct.price), countInStock: Number(newProduct.countInStock),
      rating: 5.0, numReviews: 1, reviews: [{ name: 'Verified Engineer', rating: 5, comment: 'Initial hardware batch verified.', createdAt: '2026-11-12' }]
    };
    syncCatalog([created, ...products]);
    setNewProduct({ ...newProduct, name: '', price: '' });
    notify(`✓ "${created.name}" added to live catalog!`);
  };

  const totalInventoryValue = products.reduce((acc, p) => acc + Number(p.price || 0) * Number(p.countInStock || 0), 0);
  const lowStockCount = products.filter((p) => Number(p.countInStock || 0) <= 5).length;

  return (
    <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '24px 16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '28px', margin: 0, color: theme.textMain, fontWeight: '900' }}>Admin Inventory & Catalog Control</h1>
          <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: theme.textMuted }}>
            {userInfo?.isAdmin ? `Authenticated Admin: ${userInfo.name}` : 'Interactive Recruiter Sandbox Mode — Changes sync with storefront'}
          </p>
        </div>
        {statusMsg && <div style={{ padding: '10px 16px', backgroundColor: '#10b981', color: '#fff', borderRadius: '8px', fontWeight: '700', fontSize: '13px' }}>{statusMsg}</div>}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '28px' }}>
        <div style={{ padding: '20px', backgroundColor: theme.bgCard, border: `1px solid ${theme.borderColor}`, borderRadius: '12px' }}>
          <div style={{ fontSize: '12px', color: theme.textMuted, fontWeight: '700' }}>TOTAL SKUs</div>
          <div style={{ fontSize: '28px', fontWeight: '900', color: theme.textMain, marginTop: '6px' }}>{products.length}</div>
        </div>
        <div style={{ padding: '20px', backgroundColor: theme.bgCard, border: `1px solid ${theme.borderColor}`, borderRadius: '12px' }}>
          <div style={{ fontSize: '12px', color: theme.textMuted, fontWeight: '700' }}>INVENTORY VALUE</div>
          <div style={{ fontSize: '28px', fontWeight: '900', color: '#2563eb', marginTop: '6px' }}>${Math.round(totalInventoryValue).toLocaleString()}</div>
        </div>
        <div style={{ padding: '20px', backgroundColor: theme.bgCard, border: `1px solid ${theme.borderColor}`, borderRadius: '12px' }}>
          <div style={{ fontSize: '12px', color: theme.textMuted, fontWeight: '700' }}>LOW STOCK ALERTS</div>
          <div style={{ fontSize: '28px', fontWeight: '900', color: '#f59e0b', marginTop: '6px' }}>{lowStockCount} Items</div>
        </div>
      </div>

      <form onSubmit={handleCreateProduct} style={{ padding: '22px', backgroundColor: theme.bgCard, border: `1px solid ${theme.borderColor}`, borderRadius: '12px', marginBottom: '28px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', alignItems: 'end' }}>
        <div>
          <label style={{ fontSize: '12px', fontWeight: '700', color: theme.textMain, display: 'block', marginBottom: '4px' }}>Hardware Name</label>
          <input required type="text" placeholder="e.g. Keychron Q3 Pro" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: `1px solid ${theme.borderColor}`, backgroundColor: theme.bgMain, color: theme.textMain, boxSizing: 'border-box' }} />
        </div>
        <div>
          <label style={{ fontSize: '12px', fontWeight: '700', color: theme.textMain, display: 'block', marginBottom: '4px' }}>Category</label>
          <select value={newProduct.category} onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: `1px solid ${theme.borderColor}`, backgroundColor: theme.bgMain, color: theme.textMain }}>
            <option value="Computers">Computers</option>
            <option value="Monitors">Monitors</option>
            <option value="Audio">Audio</option>
            <option value="Accessories">Accessories</option>
            <option value="Tablets">Tablets</option>
            <option value="Wearables">Wearables</option>
          </select>
        </div>
        <div>
          <label style={{ fontSize: '12px', fontWeight: '700', color: theme.textMain, display: 'block', marginBottom: '4px' }}>Price ($)</label>
          <input required type="number" placeholder="249" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: `1px solid ${theme.borderColor}`, backgroundColor: theme.bgMain, color: theme.textMain, boxSizing: 'border-box' }} />
        </div>
        <div>
          <label style={{ fontSize: '12px', fontWeight: '700', color: theme.textMain, display: 'block', marginBottom: '4px' }}>Initial Stock</label>
          <input required type="number" value={newProduct.countInStock} onChange={(e) => setNewProduct({ ...newProduct, countInStock: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: `1px solid ${theme.borderColor}`, backgroundColor: theme.bgMain, color: theme.textMain, boxSizing: 'border-box' }} />
        </div>
        <button type="submit" style={{ padding: '11px 18px', backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: '800', cursor: 'pointer' }}>+ Add Hardware</button>
      </form>

      <div style={{ backgroundColor: theme.bgCard, border: `1px solid ${theme.borderColor}`, borderRadius: '12px', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${theme.borderColor}`, color: theme.textMuted }}>
              <th style={{ padding: '14px 18px' }}>PRODUCT</th>
              <th style={{ padding: '14px 18px' }}>CATEGORY</th>
              <th style={{ padding: '14px 18px' }}>PRICE</th>
              <th style={{ padding: '14px 18px' }}>STOCK</th>
              <th style={{ padding: '14px 18px', textAlign: 'right' }}>QUICK ADJUST</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id} style={{ borderBottom: `1px solid ${theme.borderColor}`, color: theme.textMain }}>
                <td style={{ padding: '12px 18px', display: 'flex', alignItems: 'center', gap: '12px', fontWeight: '700' }}>
                  <img src={p.image} alt={p.name} style={{ width: '40px', height: '40px', borderRadius: '6px', objectFit: 'cover' }} />
                  {p.name}
                </td>
                <td style={{ padding: '12px 18px', color: theme.textMuted }}>{p.category}</td>
                <td style={{ padding: '12px 18px', fontWeight: '800' }}>${Number(p.price).toFixed(2)}</td>
                <td style={{ padding: '12px 18px', fontWeight: '700', color: p.countInStock <= 5 ? '#f59e0b' : '#10b981' }}>{p.countInStock} units</td>
                <td style={{ padding: '12px 18px', textAlign: 'right' }}>
                  <button type="button" onClick={() => handleStockChange(p._id, -1)} style={{ marginRight: '8px', padding: '5px 10px', borderRadius: '6px', border: `1px solid ${theme.borderColor}`, backgroundColor: theme.bgMain, color: theme.textMain, cursor: 'pointer', fontWeight: '800' }}>−1</button>
                  <button type="button" onClick={() => handleStockChange(p._id, 5)} style={{ padding: '5px 10px', borderRadius: '6px', border: 'none', backgroundColor: '#2563eb', color: '#fff', cursor: 'pointer', fontWeight: '800' }}>+5</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
