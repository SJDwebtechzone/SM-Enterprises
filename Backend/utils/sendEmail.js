const nodemailer = require('nodemailer');

module.exports = async function sendEmail(to, otp) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    }
  });

  await transporter.verify();
  await transporter.sendMail({
    from: process.env.MAIL_USER,
    to,
    subject: 'Your OTP Code',
    text: `Your OTP is ${otp}. It expires in 5 minutes.`
  });
};