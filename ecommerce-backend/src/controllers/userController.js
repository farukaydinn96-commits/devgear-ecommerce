import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

// @desc    Kullanıcı girişi (Login) & Token oluşturma
// @route   POST /api/users/login
// @access  Public
export const authUser = async (req, res) => {
  const { email, password } = req.body;

  // 1. Veritabanında bu email'e sahip kullanıcı var mı?
  const user = await User.findOne({ email });

  // 2. Kullanıcı varsa ve girdiği şifre (hashlenmiş haliyle) eşleşiyorsa
  if (user && (await user.matchPassword(password))) {
    
    // Cookie içine Token'ı yerleştir
    generateToken(res, user._id);

    // Başarılı giriş yanıtı dön
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401).json({ message: 'Geçersiz email veya şifre' });
  }
};
// @desc    Kullanıcı kendi profilini getirir
// @route   GET /api/users/profile
// @access  Private (Sadece giriş yapanlar)
export const getUserProfile = async (req, res) => {
  // req.user bilgisini authMiddleware (protect) içinden alıyoruz
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404).json({ message: 'Kullanıcı bulunamadı' });
  }
};