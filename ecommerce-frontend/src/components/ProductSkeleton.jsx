export default function ProductSkeleton() {
  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 w-full animate-pulse shadow-sm">
      {/* Ürün Görseli Alanı (Kare veya Dikdörtgen) */}
      <div className="w-full h-48 bg-slate-800/80 rounded-xl mb-4"></div>
      
      {/* Kategori ve Başlık Alanı */}
      <div className="w-1/3 h-3 bg-slate-800/60 rounded-full mb-2"></div>
      <div className="w-3/4 h-5 bg-slate-800/80 rounded-full mb-4"></div>
      
      {/* Fiyat ve Sepete Ekle Butonu Alanı */}
      <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-800/50">
        <div className="w-1/4 h-6 bg-slate-800/80 rounded-full"></div>
        <div className="w-1/3 h-9 bg-slate-800/80 rounded-xl"></div>
      </div>
    </div>
  );
}