import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import devspectra from "../assets/images/smlogo6.png";
import bg_121 from "../assets/images/bg_121.jpg";
import bell1 from "../assets/images/bell1.png";
import bell2 from "../assets/images/bell2.png";
import CartButton from "./pages/CartButton";

const Header = ({ cartClickCount, showMessage }) => {
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?query=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <>
      {/* ===== DESKTOP HEADER ===== */}
      <header className="d-none d-lg-block" style={{
        backgroundColor: "#f7e2b8",
        boxShadow: '0 4px 18px rgba(139,90,0,0.15)',
        borderBottom: '2px solid #d4a84b'
      }}>
        {/* ===== TOP BAR ===== */}
        <div className="container-fluid px-4 py-2 d-flex align-items-center justify-content-center">
          {/* Center: Search + Icons */}
          <div className="d-flex align-items-center gap-4">
            <form
              onSubmit={handleSearch}
              className="d-flex align-items-center"
              style={{
                width: "300px",
                borderRadius: '25px',
                border: '1.5px solid #c9a44a',
                padding: '4px 14px',
                background: 'rgba(255,255,255,0.55)'
              }}
            >
              <input
                type="text"
                className="form-control border-0 bg-transparent shadow-none"
                placeholder="Search products..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button className="btn p-0 border-0 bg-transparent">
                <i className="bi bi-search fs-5" style={{ color: '#8b6914' }}></i>
              </button>
            </form>

            {/* Icons near search */}
            <Link to="/orderhistory" className="text-dark fs-5">
              <i className="bi bi-receipt-cutoff"></i>
            </Link>

            <Link to="/wishlist" className="text-dark fs-5 position-relative">
              <i className="bi bi-heart"></i>
            </Link>

            <CartButton cartClickCount={cartClickCount} showMessage={showMessage} />

            {/* Login Button */}
            {user ? (
              <div className="dropdown position-relative" style={{ zIndex: 20 }}>
                <img
                  src={bg_121 || "https://via.placeholder.com/40"}
                  alt="User Avatar"
                  className="rounded-circle"
                  style={{ width: "40px", height: "40px", cursor: "pointer" }}
                  onClick={() => setShowDropdown(!showDropdown)}
                />

                <ul
                  className={`dropdown-menu dropdown-menu-end shadow-sm border-0 ${showDropdown ? "show" : ""
                    }`}
                  style={{
                    position: "absolute",
                    right: 0,
                    top: "100%",
                    backgroundColor: "#fef9ef", // Soft Sandal
                    border: '1.5px solid #d4a84b', // Gold border
                    padding: '8px 0',
                    zIndex: 1000,
                  }}
                >
                  <li className="px-3 py-2">
                    <span className="fw-bold" style={{ color: "#713200", fontSize: '0.9rem' }}>
                      Hello, {user.userName}
                    </span>
                  </li>
                  <li><hr className="dropdown-divider" style={{ backgroundColor: '#d4a84b', height: '1.5px', opacity: 0.3 }} /></li>
                  <li>
                    <button
                      className="dropdown-item py-2"
                      style={{
                        color: "#713200",
                        fontSize: '0.9rem',
                        transition: 'all 0.2s'
                      }}
                      onClick={handleLogout}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = '#713200';
                        e.target.style.color = '#ffffff';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = 'transparent';
                        e.target.style.color = '#713200';
                      }}
                    >
                      <i className="bi bi-box-arrow-right me-2"></i>
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/login">
                <button
                  className="btn"
                  style={{
                    background: 'linear-gradient(135deg, #c9a44a, #8b6914)',
                    border: "none",
                    color: "#fff",
                    padding: "7px 20px",
                    fontSize: "12px",
                    fontWeight: "700",
                    borderRadius: "20px",
                    letterSpacing: '0.5px',
                    boxShadow: '0 2px 8px rgba(139,105,20,0.3)',
                    transition: "all 0.3s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = '#fff';
                    e.target.style.color = '#8b6914';
                    e.target.style.border = '1px solid #c9a44a';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'linear-gradient(135deg, #c9a44a, #8b6914)';
                    e.target.style.color = '#fff';
                    e.target.style.border = 'none';
                  }}
                >
                  Login
                </button>
              </Link>
            )}
          </div>
        </div>

        {/* ===== LOGO ===== */}
        <div className="text-center py-2 position-relative">
          {/* Left Bell */}
          <img
            src={bell1}
            alt="Bell 1"
            className="position-absolute"
            style={{
              left: "20px",
              top: "50%",
              transform: "translateY(-50%)",
              width: "200px",
              height: "200px"
            }}
          />

          <Link
            to="/"
            className="navbar-brand fw-bold d-inline-flex align-items-center"
            style={{
              fontFamily: "Poppins, sans-serif",
              color: "#b22222",
              fontSize: "28px",
              textDecoration: "none",
            }}
          >
            <img
              src={devspectra}
              alt="Logo"
              className="rounded-circle"
              style={{ width: "50px", height: "50px", marginRight: "10px" }}
            />
            SM Enterprises
          </Link>

          {/* Right Bell */}
          <img
            src={bell2}
            alt="Bell 2"
            className="position-absolute"
            style={{
              right: "20px",
              top: "50%",
              transform: "translateY(-50%)",
              width: "200px",
              height: "200px"
            }}
          />

          <div className="small text-muted">All-INCLUSIVE HINDU SPIRITUAL PLATFORM</div>
        </div>

        {/* ===== NAV MENU ===== */}
        <nav className="navbar navbar-expand-lg" style={{
          background: 'rgba(210,160,60,0.08)'
        }}>
          <div className="container-fluid justify-content-center">
            <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
              <ul
                className="navbar-nav text-uppercase fw-semibold text-center"
                style={{ fontSize: "13px", letterSpacing: "1.2px", gap: "10px" }}
              >
                {[['/', 'Home'], ['/about', 'About Us'], ['/products', 'Products'], ['/reach-us', 'Contact Us']].map(
                  ([path, label]) => (
                    <li className="nav-item" key={path}>
                      <Link
                        className="nav-link"
                        to={path}
                        style={{
                          color: '#4a2800',
                          padding: '10px 16px',
                          position: 'relative',
                          transition: 'color 0.2s'
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.color = '#8b6914';
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.color = '#4a2800';
                        }}
                      >
                        {label}
                        <span style={{
                          position: 'absolute', bottom: 4, left: '50%',
                          transform: 'translateX(-50%)',
                          width: 0, height: '2px',
                          background: '#c9a44a',
                          borderRadius: '2px',
                          transition: 'width 0.28s ease',
                          display: 'block'
                        }} className="nav-underline" />
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        </nav>
      </header>

      {/* ===== MOBILE HEADER ===== */}
      <div className="d-flex d-lg-none align-items-center justify-content-between px-3 py-2"
        style={{
          backgroundColor: "#f7e2b8",
          borderBottom: '2px solid #d4a84b',
          boxShadow: '0 3px 12px rgba(139,90,0,0.12)'
        }}>

        {/* Left: Menu + Search */}
        <div className="d-flex align-items-center gap-3">
          {/* Hamburger */}
          <button
            className="btn p-0 border-0 bg-transparent"
            data-bs-toggle="collapse"
            data-bs-target="#mobileNavbarNav"
          >
            <i className="bi bi-list fs-2 text-dark"></i>
          </button>

          {/* Search Icon */}
          <button
            className="btn p-0 border-0 bg-transparent"
            onClick={() => navigate("/search")}
          >
            <i className="bi bi-search fs-5 text-dark"></i>
          </button>
        </div>

        {/* Center: Logo */}
        <Link to="/" className="text-decoration-none text-center d-flex flex-column align-items-center">
          <div className="d-flex align-items-center">
            <img
              src={devspectra}
              alt="Logo"
              className="rounded-circle"
              style={{ height: "32px", marginRight: "8px" }}
            />
            <span style={{ color: "#b22222", fontWeight: "bold", fontSize: "16px" }}>SM Enterprises</span>
          </div>
          <div className="small text-muted" style={{ fontSize: "10px" }}>All-INCLUSIVE HINDU SPIRITUAL PLATFORM</div>
        </Link>

        {/* Right: User + Cart */}
        <div className="d-flex align-items-center gap-3">
          {/* Wishlist */}
          <Link to="/wishlist" className="text-dark fs-5">
            <i className="bi bi-heart"></i>
          </Link>

          {/* User */}
          <Link to={user ? "/account" : "/login"} className="text-dark fs-5">
            <i className="bi bi-person"></i>
          </Link>

          {/* Cart */}
          <div className="position-relative">
            <CartButton cartClickCount={cartClickCount} showMessage={showMessage} />
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div className="collapse d-lg-none" id="mobileNavbarNav">
        <ul className="navbar-nav p-3" style={{ backgroundColor: "#f7e2b8" }}>
          <li className="nav-item">
            <Link className="nav-link text-dark" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-dark" to="/about">About Us</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-dark" to="/products">Products</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-dark" to="/reach-us">Contact Us</Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Header;
