import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin Kullanıcı',
    email: 'admin@devgear.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Normal Müşteri',
    email: 'musteri@devgear.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false,
  },
];

export default users;