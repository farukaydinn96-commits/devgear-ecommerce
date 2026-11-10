import { useState, useEffect } from "react";
import ProductSkeleton from "../components/ProductSkeleton";
// Kendi ürün kartı tasarımın (ProductCard) varsa aşağıdaki yorumu kaldır:
// import ProductCard from '../components/ProductCard';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        // Vercel'e eklediğimiz VITE_BACKEND_URL ortam değişkenini kullanıyoruz
        const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
        const response = await fetch(`${backendUrl}/api/products`);
        
        if (!response.ok) {
          throw new Error("Ürünler getirilirken bir hata oluştu.");
        }
        
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        // İşlem bittiğinde (başarılı veya hatalı) yükleme durumunu kapat
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Hata durumunda ekranda gösterilecek arayüz
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[50vh] text-red-500 font-semibold text-lg">
        Hata: {error}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8 tracking-tight">
        New Arrivals
      </h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {isLoading ? (
          // Yükleme sırasında yan yana 8 adet iskelet kart (skeleton) gösterilir
          [...Array(8)].map((_, index) => <ProductSkeleton key={index} />)
        ) : (
          // Yükleme bittiğinde gerçek ürünler listelenir
          products.map((product) => (
            /* Eğer ProductCard bileşenini import ettiysen aşağıdaki yapıyı kullan:
               <ProductCard key={product._id || product.id} product={product} /> 
               Şimdilik yedek bir kart tasarımı ile listeliyoruz: */
            <div key={product._id || product.id} className="group relative border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-shadow duration-300 bg-white">
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-100 group-hover:opacity-75 h-48 mb-4 flex items-center justify-center">
                {product.image ? (
                  <img src={product.image} alt={product.name} className="h-full w-full object-cover object-center" />
                ) : (
                  <span className="text-gray-400">Görsel Yok</span>
                )}
              </div>
              <h3 className="text-sm font-medium text-gray-700 truncate">
                {product.name}
              </h3>
              <p className="mt-1 text-lg font-bold text-gray-900">
                ${product.price}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}