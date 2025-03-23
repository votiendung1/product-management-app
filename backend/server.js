const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Khởi tạo Firebase Admin SDK
const serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL
});

const db = admin.firestore();
const productsCollection = db.collection('products');

// Thêm sản phẩm
app.post('/add-product', async (req, res) => {
  try {
    const { name, price, category } = req.body;
    if (!name || !price || !category) {
      return res.status(400).json({ error: 'Missing fields' });
    }

    const newProduct = await productsCollection.add({ name, price, category });
    res.status(201).json({ id: newProduct.id, message: "Product added!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Lấy danh sách sản phẩm
app.get('/products', async (req, res) => {
  try {
    const snapshot = await productsCollection.get();
    const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Chạy server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
