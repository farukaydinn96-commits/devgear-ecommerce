import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

// 1. Sadece Giriş Yapmış Kullanıcılar İçin (Protect)
export const protect = async (req, res, next) => {
  let token;

  // Cookie-parser sayesinde token'ı doğrudan çerezlerden okuyabiliyoruz
  token = req.cookies.jwt;

  if (token) {
    try {
      // Token'ın bizim gizli anahtarımızla oluşturulduğunu doğrula
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Token'ın içindeki userId ile veritabanından kullanıcıyı bul
      // .select('-password') diyerek şifreyi dışarıda bırakıyoruz (güvenlik için)
      req.user = await User.findById(decoded.userId).select('-password');
      
      // Her şey yolundaysa bir sonraki işleme (controller'a) geçiş izni ver
      next();
    } catch (error) {
      res.status(401).json({ message: 'Yetkisiz erişim: Token geçersiz veya süresi dolmuş' });
    }
  } else {
    res.status(401).json({ message: 'Yetkisiz erişim: Token bulunamadı' });
  }
};

// 2. Sadece Adminler İçin (Admin)
export const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).json({ message: 'Yetkisiz erişim: Bu işlem için Admin yetkisi gerekiyor' });
  }
};