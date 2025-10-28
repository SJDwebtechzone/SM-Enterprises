import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const NavigationBars = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        {/* Brand */}
        <Link className="navbar-brand fw-bold" to="/" style={{ fontFamily: 'Poppins, sans-serif' }}>
          SM Enterprises
        </Link>

        {/* Toggler for mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Nav Items */}
        <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
          <ul className="navbar-nav d-flex gap-4">
            {/* Dropdown for My Shopping */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="shoppingDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                My Shopping
              </a>
              <ul className="dropdown-menu" aria-labelledby="shoppingDropdown">
                <li>
                  <Link className="dropdown-item" to="/products">Products</Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/orders">Orders</Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/wishlist">Wishlist</Link>
                </li>
              </ul>
            </li>

            {/* Link to My Journey */}
            <li className="nav-item">
              <Link className="nav-link" to="/journey">
                My Journey
              </Link>
            </li>

            {/* Link to About */}
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBars;