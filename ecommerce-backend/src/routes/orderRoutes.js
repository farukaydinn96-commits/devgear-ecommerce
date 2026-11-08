import express from 'express';
import { 
  addOrderItems, 
  getMyOrders, 
  getOrderById, 
  getOrders, 
  updateOrderToDelivered 
} from '../controllers/orderController.js';
import { protect, admin } from '../middlewares/authMiddleware.js';

const router = express.Router();

// GET isteği gelirse tüm siparişleri getir (Admin), POST gelirse yeni sipariş oluştur (Müşteri)
router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders);

router.route('/mine').get(protect, getMyOrders);
router.route('/:id').get(protect, getOrderById);

// Adminin siparişi teslim edildi olarak işaretleyeceği rota
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered);

export default router;