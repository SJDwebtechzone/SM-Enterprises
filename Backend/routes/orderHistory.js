const express = require('express');
const router = express.Router();
const OrderHistory = require('../models/AdminOrder')
const authenticateUser = require('../middleware/authMiddleware');

// 🧾 Get order history for logged-in user
router.get('/history', authenticateUser, async (req, res) => {
    console.log('history',req.user._id)
  try {
    const orders = await OrderHistory.find({ userId: req.user._id });
    res.json(orders);
  } catch (err) {
    console.error('❌ Order fetch error:', err);
    res.status(500).json({ message: 'Failed to fetch order history' });
  }
});


module.exports = router;