import React, { useState } from 'react';

const SignUpWithEmailOTP = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState('');

  const sendOTP = async () => {
    try {
      const res = await fetch('/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.success) {
        setStep(2);
        setMessage('OTP sent to your email.');
      } else {
        setMessage('Failed to send OTP.');
      }
    } catch (err) {
      setMessage('Error sending OTP.');
    }
  };

  const verifyOTP = async () => {
    try {
      const res = await fetch('/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });
      const data = await res.json();
      if (data.verified) {
        setMessage('Email verified successfully!');
      } else {
        setMessage('Invalid OTP.');
      }
    } catch (err) {
      setMessage('Error verifying OTP.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {step === 1 ? 'Sign Up with Email' : 'Enter OTP'}
        </h2>

        {step === 1 ? (
          <>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              onClick={sendOTP}
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              Send OTP
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              className="w-full px-4 py-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button
              onClick={verifyOTP}
              className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
            >
              Verify OTP
            </button>
          </>
        )}

        {message && (
          <p className="mt-4 text-center text-sm text-gray-700">{message}</p>
        )}
      </div>
    </div>
  );
};

export default SignUpWithEmailOTP;