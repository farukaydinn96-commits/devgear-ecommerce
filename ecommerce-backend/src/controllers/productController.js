import Product from '../models/productModel.js';
import redisClient from '../config/redis.js';
import fallbackProducts from '../data/products.js';

export const getProducts = async (req, res) => {
  try {
    const cacheKey = 'products:all:v3';

    if (redisClient?.isOpen) {
      const cached = await redisClient.get(cacheKey);
      if (cached) return res.json(JSON.parse(cached));
    }

    const products = await Product.find({});

    if (redisClient?.isOpen && products.length > 0) {
      await redisClient.setEx(cacheKey, 3600, JSON.stringify(products));
    }

    res.json(products.length > 0 ? products : fallbackProducts);
  } catch {
    res.json(fallbackProducts);
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) return res.json(product);
    res.status(404).json({ message: 'Product not found' });
  } catch {
    res.status(404).json({ message: 'Product not found' });
  }
};

export const createProductReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;

    await product.save();
    if (redisClient?.isOpen) await redisClient.del('products:all:v3');

    res.status(201).json({ message: 'Review added', product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
