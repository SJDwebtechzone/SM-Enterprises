import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const NavigationBars = () => {
  return (
    <header style={{ backgroundColor: "#fdf7ef" }}>
      {/* ===== TOP BAR ===== */}
      <div className="container-fluid px-4 py-2 d-flex align-items-center justify-content-between">

        {/* Left: Location & Contact */}
        <div className="d-flex align-items-center gap-4 text-dark small">
          <span className="d-flex align-items-center gap-2">
            <i className="bi bi-geo-alt fs-5"></i> LOCATION
          </span>
          <span className="d-flex align-items-center gap-2">
            <i className="bi bi-telephone fs-5"></i> CONTACT US
          </span>
        </div>

        {/* Center: Search */}
        <div className="d-none d-md-flex align-items-center border-bottom" style={{ width: "300px" }}>
          <input
            type="text"
            className="form-control border-0 bg-transparent shadow-none"
            placeholder="Search"
          />
          <i className="bi bi-search fs-5 text-dark"></i>
        </div>

        {/* Right: Icons */}
        <div className="d-flex align-items-center gap-4">
          <Link to="/account" className="text-dark fs-5">
            <i className="bi bi-person"></i>
          </Link>

          <Link to="/wishlist" className="text-dark fs-5 position-relative">
            <i className="bi bi-heart"></i>
            <span className="badge bg-dark position-absolute top-0 start-100 translate-middle">
              0
            </span>
          </Link>

          <Link to="/cart" className="text-dark fs-5 position-relative">
            <i className="bi bi-bag"></i>
            <span className="badge bg-dark position-absolute top-0 start-100 translate-middle">
              0
            </span>
          </Link>
        </div>
      </div>

      {/* ===== LOGO ===== */}
      <div className="text-center py-2">
        <Link
          to="/"
          className="navbar-brand fw-bold"
          style={{
            fontFamily: "Poppins, sans-serif",
            color: "#b22222",
            fontSize: "28px",
            textDecoration: "none",
          }}
        >
          SM Enterprises
        </Link>
        <div className="small text-muted">ALL HINDU SPIRITUAL NEEDS</div>
      </div>

      {/* ===== NAV MENU ===== */}
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid justify-content-center">

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
            <ul
              className="navbar-nav text-uppercase fw-semibold text-center"
              style={{ fontSize: "14px", letterSpacing: "0.5px", gap: "25px" }}
            >
              <li className="nav-item">
                <Link className="nav-link text-dark" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-dark" to="/collections">Collections</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-dark" to="/deity-decoratives">Deity Decoratives</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-dark" to="/festival-essentials">Festival Essentials</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-dark" to="/kumbabishegam">Kumbabishegam Specials</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-dark" to="/success-stories">Success Stories</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-dark" to="/track-order">Track Your Order</Link>
              </li>
              <li className="nav-item w-100 text-center">
                <Link className="nav-link text-dark" to="/our-story">Our Story</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NavigationBars;
