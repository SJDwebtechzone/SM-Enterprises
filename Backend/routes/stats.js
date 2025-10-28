const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

router.get('/metrics', async (req, res) => {
  try {
    const orders = await Order.find({ status: 'completed' });

    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, order) => sum + order.amount, 0);

    res.json({ totalOrders, totalRevenue });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch metrics' });
  }
});

module.exports = router;