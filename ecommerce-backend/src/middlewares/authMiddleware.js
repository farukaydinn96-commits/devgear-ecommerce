import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

export const protect = async (req, res, next) => {
  let token = req.cookies?.jwt;

  if (!token && req.headers.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized: token missing' });
  }

  try {
    const secret = process.env.JWT_SECRET || 'devgear_jwt_secret_key_2026';
    const decoded = jwt.verify(token, secret);
    req.user = await User.findById(decoded.userId).select('-password');
    if (!req.user) {
      return res.status(401).json({ message: 'Not authorized: user not found' });
    }
    next();
  } catch {
    res.status(401).json({ message: 'Not authorized: token invalid' });
  }
};

export const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).json({ message: 'Not authorized as an admin' });
  }
};
