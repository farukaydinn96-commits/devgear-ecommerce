import { useState, useEffect } from "react";
import ProductSkeleton from "../components/ProductSkeleton";
// Kendi ProductCard bileşeninin yolunu buraya ekle (örnek yol)
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
        const backendUrl =
          import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
        const response = await fetch(`${backendUrl}/api/products`);

        if (!response.ok)
          throw new Error("Ürünler getirilirken bir hata oluştu.");

        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-12 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Sayfa Başlığı */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Tüm Ürünler</h1>
          <p className="text-sm text-slate-400">
            DevGear E-Commerce koleksiyonunu keşfedin.
          </p>
        </div>

        {/* Hata Durumu */}
        {error && (
          <div className="bg-rose-500/10 border border-rose-500/30 text-rose-400 p-4 rounded-xl mb-6 text-sm">
            {error}
          </div>
        )}

        {/* Yükleme (Skeleton) veya Ürünleri Listeleme Durumu */}
        {isLoading ? (
          // Yüklenirken yan yana 8 adet iskelet kartı gösterilir
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <ProductSkeleton key={index} />
            ))}
          </div>
        ) : products.length === 0 && !error ? (
          // Ürün bulunamadığında gösterilecek ekran
          <div className="text-center py-20 bg-slate-900/50 rounded-2xl border border-slate-800">
            <p className="text-slate-400">Henüz ürün eklenmemiş.</p>
          </div>
        ) : (
          // Ürünler başarıyla geldiğinde gösterilecek ızgara
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              // Kendi ProductCard bileşenini buraya yerleştir
              <div
                key={product._id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-4"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-xl mb-4"
                />
                <p className="text-xs text-blue-400 font-semibold mb-1 uppercase tracking-wider">
                  {product.category}
                </p>
                <h2 className="text-base font-bold text-slate-100 mb-2 truncate">
                  {product.name}
                </h2>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-800/80">
                  <span className="text-lg font-bold text-white">
                    ${product.price}
                  </span>
                  <button className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium px-4 py-2 rounded-xl transition cursor-pointer">
                    Sepete Ekle
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
