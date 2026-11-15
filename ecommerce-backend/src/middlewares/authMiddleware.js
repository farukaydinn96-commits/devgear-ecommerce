import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import { getJwtSecret } from '../utils/generateToken.js';

export const protect = async (req, res, next) => {
  let token = req.cookies?.jwt;

  if (!token && req.headers.authorization?.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized: token missing' });
  }

  try {
    const decoded = jwt.verify(token, getJwtSecret());
    req.user = await User.findById(decoded.userId).select('-password');
    if (!req.user) {
      return res.status(401).json({ message: 'Not authorized: user not found' });
    }
    return next();
  } catch {
    return res.status(401).json({ message: 'Not authorized: token invalid' });
  }
};

export const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    return next();
  }
  return res.status(403).json({ message: 'Forbidden: Admin privileges required' });
};
