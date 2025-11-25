const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');

// ✅ Email setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER, // sender email from .env
    pass: process.env.MAIL_CONTACT_PASS, // app password from .env
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
      to: process.env.MAIL_USER, // recipient email from .env
      subject: `SM Enterprises Enquiry Form: ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`,
    });

    res.json({ message: 'Message sent and saved successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to send message.' });
  }
});

module.exports = router;