import crypto from 'crypto';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';
import { checkAuthRateLimit, validateCredentialsInput } from '../utils/security.js';

export const authUser = async (req, res, next) => {
  try {
    const ip = req.ip || 'anon';
    if (!checkAuthRateLimit(ip)) {
      return res.status(429).json({ message: 'Too many login attempts. Please wait a minute.' });
    }

    const check = validateCredentialsInput(req.body?.email, req.body?.password);
    if (!check.valid) {
      return res.status(400).json({ message: check.message });
    }

    const user = await User.findOne({ email: check.email });
    if (user && (await user.matchPassword(req.body.password))) {
      const token = generateToken(res, user._id);
      return res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token
      });
    }

    return res.status(401).json({ message: 'Invalid email or password' });
  } catch (err) {
    return next(err);
  }
};

export const registerUser = async (req, res, next) => {
  try {
    const ip = req.ip || 'anon';
    if (!checkAuthRateLimit(ip)) {
      return res.status(429).json({ message: 'Too many registration attempts. Please wait a minute.' });
    }

    const name = typeof req.body?.name === 'string' ? req.body.name.trim().slice(0, 60) : '';
    const check = validateCredentialsInput(req.body?.email, req.body?.password);
    if (!name || !check.valid) {
      return res.status(400).json({ message: check.message || 'Valid name, email, and password required' });
    }

    const userExists = await User.findOne({ email: check.email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({
      name,
      email: check.email,
      password: req.body.password
    });

    if (user) {
      const token = generateToken(res, user._id);
      return res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token
      });
    }

    return res.status(400).json({ message: 'Invalid user data' });
  } catch (err) {
    return next(err);
  }
};

export const demoCustomerLogin = async (req, res, next) => {
  try {
    const ip = req.ip || 'anon';
    if (!checkAuthRateLimit(ip)) {
      return res.status(429).json({ message: 'Too many demo login requests. Please wait a minute.' });
    }

    const suffix = crypto.randomBytes(4).toString('hex');
    const demoUser = await User.create({
      name: `Demo Shopper (${suffix})`,
      email: `demo_${suffix}@devgear.local`,
      password: crypto.randomUUID(),
      isAdmin: false
    });

    const token = generateToken(res, demoUser._id);
    return res.json({
      _id: demoUser._id,
      name: demoUser.name,
      email: demoUser.email,
      isAdmin: false,
      token
    });
  } catch (err) {
    return next(err);
  }
};

export const logoutUser = (req, res) => {
  res.cookie('jwt', '', { httpOnly: true, expires: new Date(0) });
  res.status(200).json({ message: 'Logged out successfully' });
};

export const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      return res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
      });
    }
    return res.status(404).json({ message: 'User not found' });
  } catch (err) {
    return next(err);
  }
};
