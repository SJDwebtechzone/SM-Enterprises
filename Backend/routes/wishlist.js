// routes/wishlist.js
const express = require('express');
const router = express.Router();
const Wishlist = require('../models/Wishlist');

// Add product to wishlist
router.post('/add', async (req, res) => {
  const { userId, productId } = req.body;

  try {
    const updatedWishlist = await Wishlist.findOneAndUpdate(
      { user: userId },
      { $addToSet: { products: productId } }, // ✅ now compares ObjectIds directly
      { upsert: true, new: true }
    ).populate('products');

    res.status(200).json({ success: true, wishlist: updatedWishlist });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});
router.get('/:userId', async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.params.userId }).populate('products');
    res.status(200).json({ success: true, wishlist });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});
// Remove product from wishlist
router.delete('/:userId/:productId', async (req, res) => {
  const { userId, productId } = req.params;

  try {
    const updatedWishlist = await Wishlist.findOneAndUpdate(
      { user: userId },
      { $pull: { products: productId } },
      { new: true }
    ).populate('products');

    if (!updatedWishlist) {
      return res.status(404).json({ success: false, message: 'Wishlist not found' });
    }

    res.status(200).json({ success: true, wishlist: updatedWishlist });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});
module.exports = router;