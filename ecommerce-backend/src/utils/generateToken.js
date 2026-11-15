import jwt from 'jsonwebtoken';

export const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('CRITICAL: JWT_SECRET environment variable must be defined in production.');
    }
    return 'dev_only_local_secret_do_not_use_in_prod';
  }
  return secret;
};

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, getJwtSecret(), { expiresIn: '7d' });

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000
  });

  return token;
};

export default generateToken;
