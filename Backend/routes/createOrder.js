const express = require('express');
const router = express.Router();
const razorpay = require('../config/razorpay');

router.post('/', async (req, res) => {
  console.log('req-razorpay',req.body.amount)
  try {
    const options = {
      amount: req.body.amount*100,
      currency: 'INR',
      receipt: `rcpt_${Date.now()}`
    };
    const order = await razorpay.orders.create(options);
    console.log('Created order:', order);
    res.json(order);
  } catch (err) {
    console.error('❌ Razorpay order creation failed:', err);
    res.status(500).json({ error: 'Order creation failed', details: err.message });
  }
});

module.exports = router;