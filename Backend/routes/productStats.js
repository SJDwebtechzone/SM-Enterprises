const express = require('express');
const router = express.Router();
const ProductCollection = require('../models/ProductCollection');
router.get('/alerts/low-stock', async (req, res) => {
  try {
    const lowStockItems = await ProductCollection.find({
      $expr: { $lte: ['$stock', '$alertThreshold'] },
      status: 'active'
    });
    res.json({ lowStockItems });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch low stock alerts' });
  }
});

router.get('/products/best-sellers', async (req, res) => {
  try {
    const topProducts = await ProductCollection.find({ status: 'active' })
      .sort({ sold: -1 })
      .limit(5);
    res.json({ topProducts });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch best sellers' });
  }
});

module.exports = router;