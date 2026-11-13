import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config();

const noopClient = {
  isOpen: false,
  get: async () => null,
  setEx: async () => {},
  del: async () => {},
  flushAll: async () => {}
};

const redisClient = process.env.REDIS_URL
  ? createClient({
      url: process.env.REDIS_URL,
      socket: { reconnectStrategy: false, connectTimeout: 5000 }
    })
  : noopClient;

if (process.env.REDIS_URL) {
  redisClient.on('error', (err) => console.warn('Redis Warning:', err.message));
}

export const connectRedis = async () => {
  if (process.env.REDIS_URL && !redisClient.isOpen) {
    try {
      await redisClient.connect();
      console.log('Redis Connected');
    } catch (err) {
      console.warn('Redis cache skipped:', err.message);
    }
  }
};

export default redisClient;
