const Razorpay = require('razorpay');

const razorpay = new Razorpay({
	key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_SBa5AvR1nSg2Je',
	key_secret: process.env.RAZORPAY_KEY_SECRET || '4KLfEPitpd5xgoMc3RmAYJm6'
});

module.exports = razorpay;