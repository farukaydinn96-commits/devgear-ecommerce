import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import { connectRedis } from './config/redis.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import { notFound, errorHandler } from './middlewares/errorMiddleware.js';

const startServer = async () => {
  try {
    await connectDB();
    await connectRedis();
  } catch (err) {
    console.warn('Baglanti uyarisi:', err.message);
  }
};

startServer();

const app = express();
app.set('trust proxy', 1);

const allowedOrigins = [
  process.env.CLIENT_URL,
  'https://devgear-ecommerce-one.vercel.app',
  'http://localhost:5173',
  'http://localhost:4173'
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (
        !origin ||
        allowedOrigins.includes(origin) || /^https:\/\/devgear-ecommerce(-[a-z0-9]+)?(-farukaydinn96-commits-projects)?\.vercel\.app$/i.test(origin)
      ) {
        return callback(null, true);
      }
      return callback(new Error('Not allowed by CORS'));
    },
    credentials: true
  })
);

app.use(express.json({ limit: '16kb' }));
app.use(cookieParser());

app.get('/', (req, res) => res.send('DevGear API Aktif'));
app.get('/api/health', (req, res) => res.json({ status: 'ok', timestamp: Date.now() }));

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Sunucu ${PORT} portunda calisiyor`));
