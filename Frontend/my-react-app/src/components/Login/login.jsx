// LoginPage.js
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import '../../assets/css/css/Login.css';
import bgimage from '../../assets/images/Hindu_Devotional_Bac.png'

const LoginPage = () => {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validatePhone = (number) => /^[6-9]\d{9}$/.test(number);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!validatePhone(phone)) {
      setError('Enter a valid 10-digit Indian phone number.');
    } else {
      setError('');
      alert('Login successful!');
      navigate('/')
    }
  };

  return (
    <div 
    className="login-wrapper"
    style={{
      backgroundImage: `url(${bgimage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}>
      <div className="card login-card p-4 shadow-sm">
        <h3 className="mb-4 text-center">Login</h3>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Phone Number</label>
            <input
              type="text"
              className={`form-control ${error ? 'is-invalid' : ''}`}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
            />
            {error && <div className="invalid-feedback">{error}</div>}
          </div>
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
        <div className="mt-3 d-flex justify-content-between align-items-center link-row">
  <Link to="/signup" className="auth-link">Create an account</Link>
  <Link to="/forgot-password" className="auth-link">Forgot Password?</Link>
</div>
      </div>
    </div>
  );
};

export default LoginPage;