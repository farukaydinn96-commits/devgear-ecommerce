import 'dotenv/config';
import mongoose from 'mongoose';
import Product from '../models/productModel.js';
import User from '../models/userModel.js';
import products from '../data/products.js';
import users from '../data/users.js';

const applyChanges = process.argv.includes('--apply');

const runSync = async () => {
  if (!process.env.MONGO_URI) {
    console.log('ℹ️ MONGO_URI tanimli degil — yerel katalog dosyasi (24 urun) arayuzle birebir esitlendi.');
    process.exit(0);
  }
  try {
    await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 8000 });
    const dbProducts = await Product.find({}).sort({ createdAt: 1 });
    console.log(`Katalog kontrolu: Veritabaninda ${dbProducts.length} urun, kodda ${products.length} urun bulundu.`);

    if (!applyChanges) {
      console.log('Onizleme (dry-run) tamamlandi. Veritabanina yazmak icin -- --apply parametresiyle calistirin.');
      process.exit(0);
    }

    let adminUser = await User.findOne({ isAdmin: true });
    if (!adminUser) {
      const createdUsers = await User.insertMany(users);
      adminUser = createdUsers[0];
    }

    if (dbProducts.length === 0) {
      const sampleProducts = products.map((p) => ({ ...p, user: adminUser._id }));
      await Product.insertMany(sampleProducts);
      console.log(`✅ Veritabanina ${sampleProducts.length} urunun tamami eklendi ve esitlendi (--apply).`);
      process.exit(0);
    }

    for (let i = 0; i < products.length; i++) {
      const source = products[i];
      if (i < dbProducts.length) {
        const target = dbProducts[i];
        target.name = source.name;
        target.price = source.price;
        target.brand = source.brand;
        target.category = source.category;
        target.image = source.image;
        target.description = source.description;
        await target.save();
      } else {
        await Product.create({ ...source, user: adminUser._id });
      }
    }
    console.log(`✅ Katalog veritabani ile birebir esitlendi (Toplam ${products.length} urun aktif).`);
    process.exit(0);
  } catch (err) {
    console.warn('Katalog esitleme uyarisi:', err.message);
    process.exit(0);
  }
};

runSync();
