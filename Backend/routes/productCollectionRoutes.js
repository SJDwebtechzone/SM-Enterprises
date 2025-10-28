const express = require('express');
const router = express.Router();
const Product = require('../models/ProductCollection');

// Route: /api/collections
router.get('/', async (req, res) => {
  try {
    const products = await Product.find(); // or group by type/category
    res.json(products);
  } catch (error) {
    console.error('Error fetching collections:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;