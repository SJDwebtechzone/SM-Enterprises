import React, { useState,useContext  } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

import AuthLayout from './AuthLayout';
import bgImage from '../../assets/images/bg_122.jpg';

const LoginPage = ({setCart,setCartClickCount}) => {
  const [email, setEmail] = useState('');
  const [userName,setUserName]=useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);
const [loading, setLoading] = useState(false);


const handleLogin = async (e) => {
  e.preventDefault();
  setErrorMsg('');
  setLoading(true);
 

  try {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();
   

    if (res.ok) {
      setUser({
        email,
        token: data.token,
        userName: data.userName,
        userID: data.userId
      });

      localStorage.setItem('token', data.token);
      localStorage.setItem('userName', data.userName);
      localStorage.setItem('userId', data.userId);

      let cartData = { cart: [] };
      try {
        const cartRes = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/cart`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${data.token}`
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

      setCart(cartData.cart || []);
      setCartClickCount((cartData.cart || []).length);
      navigate('/');
    } else {
      setErrorMsg(data.message || 'Login failed. Please try again.');
    }
  } catch (err) {
    console.error('Login error:', err);
    setErrorMsg('Unable to connect to server. Please try again later.');
  } finally {
    setLoading(false);
  }
};

 return(
    <AuthLayout imageSrc={bgImage}>
      <h2 className="mb-4 text-center">Login</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {errorMsg && <div className="text-danger mb-2">{errorMsg}</div>}
        <button type="submit" className="btn btn-success w-100">Login</button>

        <div className="mt-3 text-center">
          <a href="/forgot-password" className="d-block mb-2 text-decoration-none text-primary">
            Forgot Password?
          </a>
          <Link to="/signup" className="d-block mb-2 text-decoration-none text-success">
            Don't have an account? Sign Up
          </Link>
          {/* <a href="/dashboard" className="d-block text-decoration-none text-secondary">
            Already signed in? Go to Dashboard
          </a> */}
        </div>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;