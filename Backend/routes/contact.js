const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');

// ✅ Email setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'priyajass33@gmail.com', // replace with your email
    pass:process.env.MAIL_CONTACT_PASS ,         // use app password if 2FA is enabled
  },
});

router.post('/', async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    // ✅ Save to database
    const contact = new Contact({ name, email, subject, message });
    await contact.save();

    // ✅ Send email
    await transporter.sendMail({
      from: email,
      to: 'priyajass33@gmail.com', // your receiving email
      subject: `New Contact Form: ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`,
    });

    res.json({ message: 'Message sent and saved successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to send message.' });
  }
});

module.exports = router;