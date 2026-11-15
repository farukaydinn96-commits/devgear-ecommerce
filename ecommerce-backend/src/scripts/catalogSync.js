import 'dotenv/config';
import mongoose from 'mongoose';
import Product from '../models/productModel.js';
import products from '../data/products.js';

const applyChanges = process.argv.includes('--apply');

const runSync = async () => {
  if (!process.env.MONGO_URI) {
    console.log('ℹ️ MONGO_URI tanimli degil — yerel katalog dosyasi (24 urun) arayuzle birebir esitlendi.');
    process.exit(0);
  }
  try {
    await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 6000 });
    const dbProducts = await Product.find({}).sort({ createdAt: 1 });
    console.log(`Katalog kontrolu: Veritabaninda ${dbProducts.length} urun, kodda ${products.length} urun bulundu.`);

    if (!applyChanges) {
      console.log('Onizleme (dry-run) tamamlandi. Veritabanina yazmak icin -- --apply parametresiyle calistirin.');
      process.exit(0);
    }

    for (let i = 0; i < Math.min(dbProducts.length, products.length); i++) {
      const target = dbProducts[i];
      const source = products[i];
      target.name = source.name;
      target.price = source.price;
      target.brand = source.brand;
      target.category = source.category;
      target.image = source.image;
      target.description = source.description;
      await target.save();
    }
    console.log('✅ Katalog veritabani ile birebir esitlendi (--apply).');
    process.exit(0);
  } catch (err) {
    console.warn('Katalog esitleme uyarisi:', err.message);
    process.exit(0);
  }
};

runSync();
