const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

router.post('/orders', async (req, res) => {
  try {
    const { amount, status } = req.body;
    const newOrder = new Order({ amount, status });
    await newOrder.save();
    res.status(201).json({ message: 'Order saved', order: newOrder });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save order' });
  }
});

module.exports = router;