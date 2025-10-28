// const express = require('express');
// const router = express.Router();
// const generateOtp = require('../utils/generateOtp');
// const sendEmail = require('../utils/sendEmail');
// const User = require('../models/User');
// const jwt = require('jsonwebtoken');

// const otpStore = new Map();

// router.post('/send-otp', async (req, res) => {
//   const { email } = req.body;
//   const otp = generateOtp();
//   otpStore.set(email, { otp, expires: Date.now() + 5 * 60 * 1000 });
//   console.log(`Generated OTP for ${email}: ${otp}`);

//   try {
//     await sendEmail(email, otp);
//     res.json({ success: true });
//   } catch (err) {
//     console.error('Email error:', err);
//     res.status(500).json({ success: false, error: 'Email failed' });
//   }
// });

// router.post('/verify-otp', async (req, res) => {
//   const { email, otp } = req.body;
//   const record = otpStore.get(email);

//   if (!record || Date.now() > record.expires) {
//     return res.json({ success: false, error: 'OTP expired or not found' });
//   }

//   if (String(record.otp) !== String(otp)) {
//     return res.json({ success: false, error: 'Invalid OTP' });
//   }

//   otpStore.delete(email);

//   try {
//     let user = await User.findOne({ email });

//     if (!user) {
//       const defaultName = email.split('@')[0];
//       const defaultPassword = email + otp;
//       user = new User({ name: defaultName, email, password: defaultPassword });
//       await user.save();
//     }

//     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

//     const populatedUser = await User.findById(user._id).populate('cart');

//     res.json({
//       success: true,
//       token,
//       email: user.email,
//       userName: user.name,
//       userID: user._id,
//       cart: populatedUser.cart
//     });
//   } catch (err) {
//     console.error('Verification error:', err);
//     res.status(500).json({ success: false, error: 'Server error' });
//   }
// });
// module.exports = router;

const express = require('express');
const router = express.Router();
const generateOtp = require('../utils/generateOtp');
const sendEmail = require('../utils/sendEmail');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const otpStore = new Map();

router.post('/send-otp', async (req, res) => {
  const { email } = req.body;
  const otp = generateOtp();
  otpStore.set(email, { otp, expires: Date.now() + 5 * 60 * 1000 });
  console.log(`Generated OTP for ${email}: ${otp}`);

  try {
    await sendEmail(email, otp);
    res.json({ success: true });
  } catch (err) {
    console.error('Email error:', err);
    res.status(500).json({ success: false, error: 'Email failed' });
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
      const role = email === 'manithilaibalaji@gmail.com' ? 'admin' : 'user';

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