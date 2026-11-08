import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../slices/cartSlice';

const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux Store'dan sepet verilerini çekiyoruz
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    // Alışverişi tamamla butonuna basınca önce girişe, giriş yaptıysa kargoya yönlendirir
    navigate('/login?redirect=/shipping');
  };

  return (
    <div style={{ padding: '40px' }}>
      <h1 style={{ fontSize: '28px', marginBottom: '30px' }}>Alışveriş Sepeti</h1>

      {cartItems.length === 0 ? (
        <div style={{ padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
          Sepetiniz şu an boş. <Link to="/" style={{ color: '#000', fontWeight: 'bold' }}>Alışverişe Başla</Link>
        </div>
      ) : (
        <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
          
          {/* Sol Taraf: Sepetteki Ürünlerin Listesi */}
          <div style={{ flex: '2', minWidth: '300px' }}>
            {cartItems.map((item) => (
              <div key={item._id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px', borderBottom: '1px solid #eee', gap: '20px' }}>
                <div style={{ width: '80px', height: '80px', backgroundColor: '#f5f5f7', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '12px', color: '#888' }}>Görsel</span>
                </div>
                
                <div style={{ flex: '1' }}>
                  <Link to={`/product/${item._id}`} style={{ textDecoration: 'none', color: '#000', fontWeight: 'bold', fontSize: '18px' }}>
                    {item.name}
                  </Link>
                </div>
                
                <div style={{ fontWeight: 'bold', fontSize: '18px' }}>${item.price}</div>
                
                <select 
                  value={item.qty} 
                  onChange={(e) => dispatch(addToCart({ ...item, qty: Number(e.target.value) }))}
                  style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                >
                  {[...Array(item.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>{x + 1}</option>
                  ))}
                </select>

                <button 
                  onClick={() => removeFromCartHandler(item._id)}
                  style={{ padding: '8px 12px', backgroundColor: '#ff4d4f', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                  Sil
                </button>
              </div>
            ))}
          </div>

          {/* Sağ Taraf: Sipariş Özeti Kutusu */}
          <div style={{ flex: '1', minWidth: '250px' }}>
            <div style={{ border: '1px solid #ddd', padding: '25px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
              <h2 style={{ margin: '0 0 20px 0', borderBottom: '1px solid #eee', paddingBottom: '15px' }}>
                Ara Toplam ({cartItems.reduce((acc, item) => acc + item.qty, 0)} Ürün)
              </h2>
              
              <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '25px' }}>
                ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
              </div>
              
              <button 
                type="button" 
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
                style={{ width: '100%', padding: '15px', backgroundColor: '#000', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}
              >
                Alışverişi Tamamla
              </button>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default CartScreen;