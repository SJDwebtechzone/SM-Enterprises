import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import AuthLayout from './AuthLayout';
import Hindu_Devotional_Bac from '../../assets/images/Hindu_Devotional_Bac.png';
import axios from 'axios';

const OtpLogin = ({ setCart, setCartClickCount }) => {
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    setErrorMsg('');
    setMessage('');
    setLoading(true);
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/send-otp`, { email });
      setOtpSent(true);
      setMessage('OTP sent to your email');
    } catch (err) {
      console.error('Send OTP error:', err);
      setErrorMsg('Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setErrorMsg('');
    setMessage('');
    setLoading(true);

    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/verify-otp`, { email, otp });

      if (res.data.success && res.data.token) {
        const { token, email, userName, userID, role } = res.data;

        setUser({ email, token, userName, userID, role });

        localStorage.setItem('token', token);
        localStorage.setItem('email', email);
        localStorage.setItem('userName', userName);
        localStorage.setItem('userId', userID);
        localStorage.setItem('role', role);

        // ✅ Fetch cart after OTP verification
        let cartData = { cart: [] };
        try {
          const cartRes = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/cart`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

          if (cartRes.ok) {
            cartData = await cartRes.json();
            console.log('Fetched cart:', cartData);
          } else {
            console.warn('Cart fetch failed:', await cartRes.text());
          }
        } catch (cartErr) {
          console.error('Cart fetch error:', cartErr);
        }

        // ✅ Normalize cart
        const normalizedCart = (cartData.cart || []).map(item => ({
          _id: item._id,
          productId: item._id,
          name: item.name,
          image: item.image,
          price: item.price,
          quantity: item.quantity
        }));

        if (typeof setCart === 'function') {
          setCart(normalizedCart);
        }

        if (typeof setCartClickCount === 'function') {
          setCartClickCount(normalizedCart.length);
        }

        setMessage('OTP verified. Login successful!');

        // ✅ Navigate based on role
        if (role === 'admin') {
          navigate('/admin/dashboard');
        } else {
          navigate('/');
        }
      } else {
        setErrorMsg(res.data.error || 'Invalid OTP');
      }
    } catch (err) {
      console.error('OTP verification error:', err);
      setErrorMsg('Verification failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout imageSrc={Hindu_Devotional_Bac}>
      <h2 className="mb-4 text-center">Login with Email OTP</h2>
      <div className="card p-4 mx-auto" style={{ maxWidth: '400px' }}>
        {!otpSent ? (
          <>
            <div className="mb-3">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button className="btn btn-primary w-100" onClick={handleSendOtp} disabled={loading}>
              {loading ? 'Sending...' : 'Send OTP'}
            </button>
          </>
        ) : (
          <>
            <div className="mb-3">
              <label className="form-label">Enter OTP</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value.trim())}
                required
              />
            </div>
            <button className="btn btn-success w-100" onClick={handleVerifyOtp} disabled={loading}>
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
          </>
        )}
        {message && <div className="alert alert-info mt-3">{message}</div>}
        {errorMsg && <div className="text-danger mt-3">{errorMsg}</div>}
      </div>
    </AuthLayout>
  );
};

export default OtpLogin;