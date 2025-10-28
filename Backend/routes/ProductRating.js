const express = require('express');
const router = express.Router();
const Product = require('../models/ProductCollection');

// GET ratings for a specific product
router.get('/:id/ratings', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).select('ratings');
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product.ratings);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch ratings' });
  }
});

// POST a new rating to a product
router.post('/:id/ratings', async (req, res) => {
  const { userId, rating, comment } = req.body;

  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    // Add new rating
    product.ratings.push({ userId, rating, comment });

    // Recalculate averageRating and ratingCount
    const totalRatings = product.ratings.length;
    const sumRatings = product.ratings.reduce((sum, r) => sum + r.rating, 0);
    product.averageRating = (sumRatings / totalRatings).toFixed(2);
    product.ratingCount = totalRatings;

    await product.save();
    res.status(201).json({ message: 'Rating added', averageRating: product.averageRating });
  } catch (err) {
    res.status(400).json({ error: 'Failed to add rating' });
  }
});

module.exports = router;