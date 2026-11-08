import express from 'express';
import { authUser, getUserProfile } from '../controllers/userController.js';
import { protect } from '../middlewares/authMiddleware.js'; 

const router = express.Router();

// Herkese açık rota (Giriş yapma / Token alma)
router.post('/login', authUser);

// Korumalı rota: Önce 'protect' çalışır, izin verirse 'getUserProfile' çalışır
router.route('/profile').get(protect, getUserProfile);

export default router;