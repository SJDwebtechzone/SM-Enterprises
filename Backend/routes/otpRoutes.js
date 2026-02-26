const express = require('express');
const router = express.Router();
const generateOtp = require('../utils/generateOtp');
const sendEmail = require('../utils/sendEmail');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const otpStore = new Map();

router.post('/send-otp', async (req, res) => {
  const { email } = req.body;
  
  if (!email) {
    return res.status(400).json({ success: false, error: 'Email is required' });
  }
  
  const otp = generateOtp();
  otpStore.set(email, { otp, expires: Date.now() + 5 * 60 * 1000 });

  console.log(`\n${'='.repeat(50)}`);
  console.log(`🔐 OTP for ${email}: ${otp}`);
  console.log(`⏰ Expires in 5 minutes`);
  console.log(`${'='.repeat(50)}\n`);

  try {
    if (process.env.MAIL_USER && process.env.MAIL_PASS) {
      await sendEmail(email, otp);
      console.log('✅ Email sent successfully');
    }
    res.json({ success: true, message: 'OTP sent successfully. Check backend console for OTP.' });
  } catch (err) {
    console.log('⚠️ Email failed, use console OTP:', err.message);
    res.json({ success: true, message: 'OTP generated. Check backend console for OTP.' });
  }
});

router.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;
  const record = otpStore.get(email);

  if (!record || Date.now() > record.expires) {
    return res.json({ success: false, error: 'OTP expired or not found' });
  }

  if (String(record.otp) !== String(otp)) {
    return res.json({ success: false, error: 'Invalid OTP' });
  }

  otpStore.delete(email);

  try {
    let user = await User.findOne({ email });

    if (!user) {
      const defaultName = email.split('@')[0];
      const defaultPassword = email + otp;
      const role = email === process.env.MAIL_ADMIN ? 'admin' : 'user';

      user = new User({ name: defaultName, email, password: defaultPassword, role });
      await user.save();
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

    const populatedUser = await User.findById(user._id).populate('cart');

    res.json({
      success: true,
      token,
      email: user.email,
      userName: user.name,
      userID: user._id,
      role: user.role,
      cart: populatedUser.cart
    });
  } catch (err) {
    console.error('Verification error:', err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

module.exports = router;
