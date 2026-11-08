// 1. Var olmayan bir adrese (404) girildiğinde çalışacak fonksiyon
const notFound = (req, res, next) => {
  const error = new Error(`Bulunamadı - ${req.originalUrl}`);
  res.status(404);
  next(error); // Hatayı alttaki errorHandler'a fırlatır
};

// 2. Sistem genelinde oluşan tüm hataları (Veritabanı çökmesi, yanlış ID vb.) yakalayan fonksiyon
const errorHandler = (err, req, res, next) => {
  // Eğer status code daha önceden belirlenmemişse 500 (Sunucu Hatası) yap
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  // MongoDB'de geçersiz bir ID formatı aratıldığında oluşan özel "CastError" hatasını yakala
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    statusCode = 404;
    message = 'Kaynak bulunamadı (Geçersiz veya bozuk ID)';
  }

  // Frontend'e daima JSON dön (stack trace sadece development ortamında gösterilir)
  res.status(statusCode).json({
    message: message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

export { notFound, errorHandler };