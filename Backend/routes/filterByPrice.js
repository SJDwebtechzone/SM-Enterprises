const express = require('express');
const ProductFilter = require('../models/ProductCollection');

const router = express.Router();

router.get('/', async (req, res) => {
  const { size } = req.query;

  try {
    const filter = size ? { sizes: size } : {};
    const products = await ProductFilter.find(filter);
    console.log(products)
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

module.exports = router;