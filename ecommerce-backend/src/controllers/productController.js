import Product from '../models/productModel.js';
import redisClient from '../config/redis.js';

// @desc    Tüm ürünleri getir (Redis Cache özellikli)
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res) => {
  try {
    const cacheKey = 'products:all';

    // 1. Önce Redis önbelleğinde (cache) bu veri var mı diye kontrol et
    const cachedProducts = await redisClient.get(cacheKey);

    if (cachedProducts) {
      console.log('⚡ Veri hızlıca Redis Cache\'den getirildi!');
      return res.json(JSON.parse(cachedProducts));
    }

    // 2. Eğer Redis'te yoksa, veriyi MongoDB'den çek
    console.log('🗄️ Veri MongoDB\'den çekildi ve Redis\'e kaydediliyor...');
    const products = await Product.find({});

    // 3. Veritabanından çekilen veriyi Redis'e kaydet (3600 saniye = 1 saat boyunca tutulacak)
    await redisClient.setEx(cacheKey, 3600, JSON.stringify(products));

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Ürünler getirilirken hata oluştu', error: error.message });
  }
};

// @desc    ID'ye göre tek bir ürün getir
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Ürün bulunamadı' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Geçersiz Ürün ID\'si veya sunucu hatası', error: error.message });
  }
};