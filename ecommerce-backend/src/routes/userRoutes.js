import express from 'express';
import {
  authUser,
  registerUser,
  demoCustomerLogin,
  logoutUser,
  getUserProfile
} from '../controllers/userController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', registerUser);
router.post('/login', authUser);
router.post('/demo-login', demoCustomerLogin);
router.post('/logout', logoutUser);
router.route('/profile').get(protect, getUserProfile);

export default router;
