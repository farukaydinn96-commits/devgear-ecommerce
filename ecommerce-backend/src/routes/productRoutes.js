import express from 'express';
import { getProducts, getProductById } from '../controllers/productController.js';

const router = express.Router();

// /api/products rotasına gelen istekleri controller'a yönlendiriyoruz
router.route('/').get(getProducts);
router.route('/:id').get(getProductById);

export default router;