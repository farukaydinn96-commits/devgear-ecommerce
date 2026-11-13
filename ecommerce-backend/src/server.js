import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import redisClient, { connectRedis } from './config/redis.js';
import Product from './models/productModel.js';
import User from './models/userModel.js';
import products from './data/products.js';
import users from './data/users.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import { notFound, errorHandler } from './middlewares/errorMiddleware.js';

dotenv.config();

const startServer = async () => {
  const dbReady = await connectDB();
  await connectRedis();

  if (!dbReady) return;

  try {
    const sampleProduct = await Product.findOne();
    if (!sampleProduct || !sampleProduct.numReviews || sampleProduct.numReviews === 0) {
      await Product.deleteMany();
      await User.deleteMany();
      const createdUsers = await User.insertMany(users);
      const adminUser = createdUsers[0]._id;
      const sampleProducts = products.map((product) => ({
        ...product,
        user: adminUser,
        reviews: [
          { name: 'Alex Rivera', rating: 5, comment: 'Solid build quality and zero latency in daily engineering workflows.' },
          { name: 'Sarah Chen', rating: 5, comment: 'Top-tier developer hardware. Highly recommended for remote teams.' }
        ]
      }));
      await Product.insertMany(sampleProducts);
    }
    if (redisClient?.isOpen) await redisClient.flushAll();
  } catch (err) {
    console.warn('Seed check skipped:', err.message);
  }
};

startServer();

const app = express();
app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => res.send('DevGear E-Commerce API Active'));
app.get('/api/health', (req, res) => res.json({ status: 'ok', timestamp: Date.now() }));

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
