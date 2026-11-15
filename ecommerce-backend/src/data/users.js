import crypto from 'crypto';

const adminPassword = process.env.SEED_ADMIN_PASSWORD || crypto.randomUUID();
const customerPassword = process.env.SEED_USER_PASSWORD || crypto.randomUUID();

const users = [
  {
    name: 'Faruk Aydin',
    email: 'admin@devgear.com',
    password: adminPassword,
    isAdmin: true
  },
  {
    name: 'Sample Customer',
    email: 'customer@devgear.com',
    password: customerPassword,
    isAdmin: false
  }
];

export default users;
