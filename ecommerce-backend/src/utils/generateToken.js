import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });

  // Token'ı HTTP-Only cookie olarak ayarlıyoruz (XSS saldırılarını engeller)
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development', // Prod ortamında sadece HTTPS
    sameSite: 'strict', // CSRF saldırılarını engeller
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 Gün
  });
};

export default generateToken;