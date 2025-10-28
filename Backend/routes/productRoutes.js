const express = require('express');
const router = express.Router();
const { getAllProducts, getProductsByCategory,getProductbySearch} = require('../controllers/productController');
const ProductCollection = require('../models/ProductCollection');
// Route: /api/products
router.get('/search', getProductbySearch); // ✅ must be first
router.get('/:category', getProductsByCategory);
router.get('/', getAllProducts);



// 🔍 Test route to check rating update
router.get('/test-rating/:productId', async (req, res) => {
  try {
    const product = await ProductCollection.findById(req.params.productId);
    res.json({
      averageRating: product.averageRating,
      ratingCount: product.ratingCount
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch product rating' });
  }
});


module.exports = router;