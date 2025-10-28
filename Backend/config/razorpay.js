const Razorpay = require('razorpay');

const razorpay = new Razorpay({
key_id: process.env.RAZORPAY_KEY_ID,       // test key
key_secret:process.env.RAZORPAY_KEY_SECRET // test secret
});

module.exports = razorpay;