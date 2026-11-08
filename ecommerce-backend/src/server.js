import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import redisClient, { connectRedis } from './config/redis.js';

// Otomatik Veri Kontrolü İçin Modeller ve Örnek Veriler
import Product from './models/productModel.js';
import User from './models/userModel.js';
import products from './data/products.js';
import users from './data/users.js';

// Rotalar
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

// Hata Yönetimi Middleware'leri
import { notFound, errorHandler } from './middlewares/errorMiddleware.js';

dotenv.config();

const startServer = async () => {
  await connectDB();
  await connectRedis();

  // OTOMATİK VERİ VE REDIS CACHE DÜZELTİCİ:
  // Eğer veritabanında ürün yoksa veya SlimMom'dan kalan '$0' fiyatlı yiyecek verileri varsa otomatik yeniler
  try {
    const sampleProduct = await Product.findOne();
    if (!sampleProduct || !sampleProduct.name || sampleProduct.price === 0) {
      console.log('Eski veya eksik ürün verisi tespit edildi. DevGear ürünleri yükleniyor...');
      await Product.deleteMany();
      await User.deleteMany();

      const createdUsers = await User.insertMany(users);
      const adminUser = createdUsers[0]._id;

      const sampleProducts = products.map((product) => {
        return { ...product, user: adminUser };
      });

      await Product.insertMany(sampleProducts);
      console.log('DevGear ürünleri başarıyla veritabanına eklendi!');
    }

    // Redis önbelleğindeki eski yiyecek listesini temizle
    if (redisClient && redisClient.isOpen) {
      await redisClient.flushAll();
      console.log('Redis önbelleği (cache) temizlendi!');
    }
  } catch (err) {
    console.error('Otomatik veri kontrolü hatası:', err.message);
  }
};

startServer();

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('DevGear E-Commerce API Çalışıyor...');
});

// API Rotaları
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

// Hata Yakalayıcılar (Mutlaka API rotalarından SONRA gelmelidir)
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Sunucu ${process.env.NODE_ENV} modunda ${PORT} portunda çalışıyor.`);
});