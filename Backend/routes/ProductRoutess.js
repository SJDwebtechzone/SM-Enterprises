const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.get('/products/debug', async (req, res) => {
  try {
    const products = await Product.find();
    const output = products.map(p => ({ name: p.name, id: p._id.toString() }));
    console.log('Product list:', output);
    res.json(output);
  } catch (err) {
    console.error('Debug route error:', err.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;