// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const fs = require('fs');
// const path = require('path');
// const ProductCollection = require('../models/ProductCollection');

// // Ensure 'uploads' folder exists
// const uploadDir = path.join(__dirname, '../uploads');
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir);
// }

// // Multer setup
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, uploadDir),
//   filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
// });
// const upload = multer({ storage });


// // ✅ POST /api/products/upload — Add new product
// router.post('/upload', upload.single('image'), async (req, res) => {
//   try {
//     const {
//   name, price, originalPrice, discount, sale,
//   category, subcategory, sku, offers, details,
//   stock, sizes // ✅ add these here
// } = req.body;

//     const product = new ProductCollection({
//       name,
//       price,
//       originalPrice,
//       discount,
//       sale,
//       category,
//       subcategory,
//       sku,
//       offers: JSON.parse(offers),
//       details: JSON.parse(details),
//       image: req.file ? `/uploads/${req.file.filename}` : '',
//       stock: Number(stock), // ✅ convert to number
//       sizes: JSON.parse(sizes) // ✅ parse array

//     });

//     await product.save();
//     res.status(201).json({ message: 'Product saved successfully' });
//   } catch (err) {
//     console.error('Upload error:', err);
//     res.status(500).json({ error: 'Failed to save product' });
//   }
// });


// // ✅ GET /api/products — Fetch all products
// router.get('/', async (req, res) => {
//   try {
//     const products = await ProductCollection.find().sort({ createdAt: -1 });
//     res.json({ products });
//   } catch (err) {
//     console.error('Fetch error:', err);
//     res.status(500).json({ error: 'Failed to fetch products' });
//   }
// });




// // ✅ PUT /api/products/:id — Update product
// router.put('/:id', upload.single('image'), async (req, res) => {
//   try {
//      const {
//   name, price, originalPrice, discount, sale,
//   category, subcategory, sku, offers, details,
//   stock, sizes // ✅ add these here
// } = req.body;
//     const updateData = {
//       name,
//       price,
//       originalPrice,
//       discount,
//       sale,
//       category,
//       subcategory,
//       image,
//       sku,
//       offers: JSON.parse(offers),
//       details: JSON.parse(details),
//       stock: Number(stock), // ✅ convert to number
//       sizes: JSON.parse(sizes) // ✅ parse array

//     };

//     if (req.file) {
//       updateData.image = `/uploads/${req.file.filename}`;
//     }

//     const updated = await ProductCollection.findByIdAndUpdate(req.params.id, updateData, { new: true });

//     if (!updated) {
//       return res.status(404).json({ error: 'Product not found' });
//     }

//     res.json({ message: 'Product updated successfully', product: updated });
//   } catch (err) {
//     console.error('Update error:', err);
//     res.status(500).json({ error: 'Failed to update product' });
//   }
// });


// // ✅ DELETE /api/products/:id — Delete product
// router.delete('/:id', async (req, res) => {
//   try {
//     const deleted = await ProductCollection.findByIdAndDelete(req.params.id);
//     if (!deleted) {
//       return res.status(404).json({ error: 'Product not found' });
//     }
//     res.json({ message: 'Product deleted successfully' });
//   } catch (err) {
//     console.error('Delete error:', err);
//     res.status(500).json({ error: 'Failed to delete product' });
//   }
// });

// module.exports = router;
const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const ProductCollection = require('../models/ProductCollection');

// Ensure 'uploads' folder exists
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });


// ✅ POST /api/products/upload — Add new product
router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const {
      name, price, originalPrice, discount, sale,
      category, subcategory, sku, offers, details,
      stock, sizes
    } = req.body;

    const product = new ProductCollection({
      name,
      price,
      originalPrice,
      discount,
      sale,
      category,
      subcategory,
      sku,
      offers: offers ? JSON.parse(offers) : [],
      details: details ? JSON.parse(details) : {},
      image: req.file ? `/uploads/${req.file.filename}` : '',
      stock: Number(stock) || 0,
      sizes: sizes ? JSON.parse(sizes) : []
    });

    await product.save();
    res.status(201).json({ message: 'Product saved successfully' });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ error: 'Failed to save product' });
  }
});


// ✅ GET /api/products — Fetch all products with category populated
router.get('/', async (req, res) => {
  try {
    const products = await ProductCollection.find()
      .populate('category')
      .sort({ createdAt: -1 });

    res.json(products);
  } catch (err) {
    console.error('Fetch error:', err);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});


// ✅ PUT /api/products/:id — Update product
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const {
      name, price, originalPrice, discount, sale,
      category, subcategory, sku, offers, details,
      stock, sizes
    } = req.body;

    // ✅ Safe JSON parsing
    let parsedOffers = [];
    let parsedDetails = {};
    let parsedSizes = [];

    try {
      parsedOffers = offers ? JSON.parse(offers) : [];
      parsedDetails = details ? JSON.parse(details) : {};
      parsedSizes = JSON.parse(sizes || '[]');

    } catch (parseErr) {
      console.error('JSON parse error:', parseErr);
      return res.status(400).json({ error: 'Invalid JSON in offers, details, or sizes' });
    }

    const updateData = {
      name,
      price,
      originalPrice,
      discount,
      sale,
      category,
      subcategory,
      sku,
      offers: parsedOffers,
      details: parsedDetails,
      sizes: parsedSizes,
      stock: Number(stock) || 0
    };

    // ✅ Only update image if a new file is uploaded
    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    const updated = await ProductCollection.findByIdAndUpdate(req.params.id, updateData, { new: true });

    if (!updated) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ message: 'Product updated successfully', product: updated });
  } catch (err) {
    console.error('Update error:', err);
    res.status(500).json({ error: 'Failed to update product', details: err.message });
  }
});

// ✅ DELETE /api/products/:id — Delete product
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await ProductCollection.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

module.exports = router;