const express = require('express');
const router = express.Router();
const razorpay = require('../config/razorpay');

router.post('/', async (req, res) => {
  console.log('\n=== CREATE ORDER REQUEST ===');
  console.log('Body:', req.body);
  
  try {
    const { amount } = req.body;
    
    if (!amount || amount <= 0) {
      console.log('Invalid amount:', amount);
      return res.status(400).json({ error: 'Invalid amount' });
    }

    const options = {
      amount: Math.round(amount * 100),
      currency: 'INR',
      receipt: `rcpt_${Date.now()}`
    };
    
    console.log('Creating order with:', options);
    console.log('Using Key ID:', process.env.RAZORPAY_KEY_ID);
    
    const order = await razorpay.orders.create(options);
    console.log('✅ Order created successfully:', order.id);
    
    const response = {
      id: order.id,
      amount: order.amount,
      currency: order.currency
    };
    
    console.log('Sending response:', response);
    res.json(response);
    
  } catch (err) {
    console.error('❌ Error details:');
    console.error('Message:', err.message);
    console.error('Code:', err.statusCode);
    console.error('Description:', err.error?.description);
    console.error('Full error:', err);
    
    res.status(500).json({ 
      error: 'Order creation failed', 
      message: err.message,
      details: err.error?.description
    });
  }
});

module.exports = router;