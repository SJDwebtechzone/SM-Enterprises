const nodemailer = require('nodemailer');

module.exports = async function sendEmail(to, otp) {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      }
    });

    await transporter.verify();
    console.log('✅ SMTP connection verified');
    
    const result = await transporter.sendMail({
      from: `"SM Enterprises" <${process.env.MAIL_USER}>`,
      to,
      subject: 'Your OTP Code - SM Enterprises',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f7e2b8;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #b22222; text-align: center; margin-bottom: 20px;">SM Enterprises</h2>
            <p style="font-size: 16px; color: #333;">Your OTP verification code is:</p>
            <div style="background-color: #f7e2b8; padding: 20px; text-align: center; border-radius: 5px; margin: 20px 0;">
              <h1 style="color: #b22222; letter-spacing: 8px; margin: 0; font-size: 36px;">${otp}</h1>
            </div>
            <p style="color: #666; font-size: 14px;">This code will expire in <strong>5 minutes</strong>.</p>
            <p style="color: #666; font-size: 14px;">If you didn't request this code, please ignore this email.</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
            <p style="color: #999; font-size: 12px; text-align: center;">© ${new Date().getFullYear()} SM Enterprises. All rights reserved.</p>
          </div>
        </div>
      `
    });
    
    console.log('✅ Email sent successfully to:', to);
    return result;
  } catch (error) {
    console.error('❌ Email sending failed:', error.message);
    throw error;
  }
};