import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import devspectra from "../assets/images/smlogo6.png";
import bell1 from "../assets/images/bell1.png";
import bell2 from "../assets/images/bell2.png";
import CartButton from "./pages/CartButton";
import GoldenFlowers from "./GoldenFlowers";

const getAvatarColor = (name) => {
  if (!name) return '#713200';
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const colors = ['#c9a44a', '#713200', '#8b0000', '#8b6914', '#e65100', '#8d6e63', '#d4af37', '#a0522d'];
  return colors[Math.abs(hash) % colors.length];
};

const Header = ({ cartClickCount, showMessage }) => {
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dropdownTimeoutId, setDropdownTimeoutId] = useState(null);

  const handleDropdownMouseEnter = () => {
    if (dropdownTimeoutId) {
      clearTimeout(dropdownTimeoutId);
      setDropdownTimeoutId(null);
    }
    setShowDropdown(true);
  };

  const handleDropdownMouseLeave = () => {
    const id = setTimeout(() => {
      setShowDropdown(false);
    }, 400); // 400ms buffer delay so it doesn't instantly close on brief mouse exits
    setDropdownTimeoutId(id);
  };

  useEffect(() => {
    return () => {
      if (dropdownTimeoutId) {
        clearTimeout(dropdownTimeoutId);
      }
    };
  }, [dropdownTimeoutId]);

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
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700&display=swap');

          #mobileNavbarNav {
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.25s ease;
            opacity: 0;
            display: block !important;
          }
          #mobileNavbarNav.show {
            max-height: 380px;
            opacity: 1;
          }
          .nav-item .nav-link:hover .nav-underline {
            width: 100% !important;
          }
          .header-logout-btn {
            color: #713200 !important;
            font-size: 0.9rem;
            background-color: transparent !important;
            border: none;
            transition: all 0.2s ease-in-out;
            width: 100%;
            text-align: left;
            display: flex;
            align-items: center;
            cursor: pointer !important;
          }
          .header-logout-btn:hover {
            background-color: #713200 !important;
            color: #ffffff !important;
          }
          .header-logout-btn i {
            color: inherit !important;
          }
        `}
      </style>
      {/* ===== DESKTOP HEADER ===== */}
      <header className="d-none d-lg-block position-relative overflow-hidden" style={{
        backgroundColor: "#f7e2b8",
        boxShadow: '0 4px 18px rgba(139,90,0,0.15)',
        borderBottom: '2px solid #d4a84b'
      }}>
        <GoldenFlowers count={12} />

        {/* Suspended Hanging Diyas on Left and Right */}
        <img
          src={bell1}
          alt="Hanging Diya Left"
          className="position-absolute d-none d-xl-block"
          style={{
            left: "15px",
            top: "0",
            height: "230px",
            width: "auto",
            zIndex: 10,
            pointerEvents: 'none'
          }}
        />
        <img
          src={bell2}
          alt="Hanging Diya Right"
          className="position-absolute d-none d-xl-block"
          style={{
            right: "15px",
            top: "0",
            height: "230px",
            width: "auto",
            zIndex: 10,
            pointerEvents: 'none'
          }}
        />

        {/* ===== TOP BAR ===== */}
        <div className="container-fluid px-4 py-2 d-flex align-items-center justify-content-center" style={{ position: 'relative', zIndex: 10 }}>
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
              <div 
                className="dropdown position-relative" 
                style={{ zIndex: 2000 }}
                onMouseEnter={handleDropdownMouseEnter}
                onMouseLeave={handleDropdownMouseLeave}
              >
                <div
                  onClick={() => setShowDropdown(!showDropdown)}
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    backgroundColor: getAvatarColor(user.userName || user.email),
                    color: "#ffffff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                    cursor: "pointer",
                    boxShadow: "0 2px 5px rgba(0,0,0,0.15)",
                    textTransform: "uppercase",
                    userSelect: "none"
                  }}
                >
                  {user.userName ? user.userName.charAt(0) : user.email.charAt(0)}
                </div>

                <ul
                  className={`dropdown-menu dropdown-menu-end shadow-sm border-0 ${showDropdown ? "show" : ""
                    }`}
                  style={{
                    position: "absolute",
                    left: 0,
                    top: "46px", /* Flush with 48px avatar for stable hover transition */
                    backgroundColor: "#fef9ef", // Soft Sandal
                    border: '1.5px solid #d4a84b', // Gold border
                    padding: '8px 0',
                    zIndex: 2000,
                    minWidth: '160px'
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
                      className="dropdown-item py-2 header-logout-btn"
                      onClick={handleLogout}
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
          <Link
            to="/"
            className="navbar-brand fw-bold d-inline-flex align-items-center"
            style={{
              fontFamily: "'Cinzel', serif",
              color: "#8b0000",
              fontSize: "36px",
              letterSpacing: "2.5px",
              textDecoration: "none",
            }}
          >
            <img
              src={devspectra}
              alt="Logo"
              className="rounded-circle"
              style={{ width: "50px", height: "50px", marginRight: "16px" }}
            />
            SM ENTERPRISES
          </Link>
          <div style={{ fontSize: "11px", letterSpacing: "2px", fontWeight: "700", color: "#d4af37", marginTop: "-6px", textTransform: "uppercase" }}>
            QUALITY - TRUST - VALUE
          </div>

          <div style={{ fontSize: "14px", letterSpacing: "1px", fontWeight: "600", color: "#8d6e63", marginTop: "4px" }}>
            Every Path Welcomed. Every Soul Nourished.
          </div>
        </div>

        {/* ===== NAV MENU ===== */}
        <nav className="navbar navbar-expand-lg justify-content-center py-2" style={{ background: 'transparent' }}>
          <div className="d-flex justify-content-center align-items-center shadow-sm" style={{
            borderRadius: '30px',
            border: '1.5px solid #d4af37',
            padding: '6px 40px',
            backgroundColor: '#fffdf9',
            width: '100%',
            maxWidth: '900px'
          }}>
            <div className="collapse navbar-collapse justify-content-center w-100" id="navbarNav">
              <ul
                className="navbar-nav text-uppercase fw-bold text-center d-flex flex-row align-items-center justify-content-between mb-0 w-100"
                style={{ fontSize: "13px", letterSpacing: "1.2px" }}
              >
                {[
                  ['/', 'Home', 'bi-house'],
                  ['/about', 'About Us', 'bi-person'],
                  ['/products', 'Products', 'bi-gift'],
                  ['/reach-us', 'Contact Us', 'bi-telephone']
                ].map(([path, label, icon]) => (
                    <li className="nav-item position-relative" key={label}>
                      <Link
                        className="nav-link d-inline-flex align-items-center"
                        to={path}
                        style={{
                          color: '#4a2800',
                          padding: '8px 16px',
                          position: 'relative',
                          transition: 'color 0.2s',
                          fontWeight: '700',
                          gap: '6px'
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.color = '#8b6914';
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.color = '#4a2800';
                        }}
                      >
                        <i className={`bi ${icon}`} style={{ fontSize: '1rem', color: '#d4af37' }}></i>
                        <span>{label}</span>
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
      <div className="d-flex d-lg-none align-items-center justify-content-between px-3 py-2 position-relative"
        style={{
          backgroundColor: "#f7e2b8",
          borderBottom: '2px solid #d4a84b',
          boxShadow: '0 3px 12px rgba(139,90,0,0.12)'
        }}>
        <GoldenFlowers count={6} />

        {/* Left: Menu + Search */}
        <div className="d-flex align-items-center gap-3">
          {/* Hamburger */}
          <button
            className="btn p-0 border-0 bg-transparent"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <i className="bi bi-list fs-2 text-dark"></i>
          </button>

          {/* Search Icon */}
          <button
            className="btn p-0 border-0 bg-transparent"
            onClick={() => setShowMobileSearch(!showMobileSearch)}
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
              style={{ height: "36px", marginRight: "12px" }}
            />
            <span style={{ 
              color: "#8b0000", 
              fontFamily: "'Cinzel', serif", 
              fontWeight: "700", 
              fontSize: "21px",
              letterSpacing: "1.2px"
            }}>SM ENTERPRISES</span>
          </div>
          <div style={{ fontSize: "9px", letterSpacing: "1.5px", fontWeight: "700", color: "#d4af37", marginTop: "-4px", textTransform: "uppercase" }}>
            QUALITY - TRUST - VALUE
          </div>
          <div style={{ fontSize: "11px", letterSpacing: "0.5px", fontWeight: "600", color: "#8d6e63", marginTop: "2px" }}>
            Every Path Welcomed. Every Soul Nourished.
          </div>
        </Link>

        {/* Right: User + Cart */}
        <div className="d-flex align-items-center gap-3">
          {/* Wishlist */}
          <Link to="/wishlist" className="text-dark fs-5">
            <i className="bi bi-heart"></i>
          </Link>

          {/* User */}
          {user ? (
            <div className="dropdown position-relative" style={{ zIndex: 2000 }}>
              <div
                onClick={() => setShowDropdown(!showDropdown)}
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  backgroundColor: getAvatarColor(user.userName || user.email),
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.95rem",
                  fontWeight: "bold",
                  cursor: "pointer",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.15)",
                  textTransform: "uppercase",
                  userSelect: "none"
                }}
              >
                {user.userName ? user.userName.charAt(0) : user.email.charAt(0)}
              </div>
              <ul
                className={`dropdown-menu dropdown-menu-end shadow-sm border-0 ${showDropdown ? "show" : ""}`}
                style={{
                  position: "absolute",
                  right: 0,
                  top: "38px",
                  backgroundColor: "#fef9ef", // Soft Sandal
                  border: '1.5px solid #d4a84b', // Gold border
                  padding: '8px 0',
                  zIndex: 2000,
                  minWidth: '160px'
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
                    className="dropdown-item py-2 header-logout-btn"
                    onClick={() => {
                      handleLogout();
                      setShowDropdown(false);
                    }}
                  >
                    <i className="bi bi-box-arrow-right me-2"></i>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link to="/login" className="text-dark fs-5">
              <i className="bi bi-person"></i>
            </Link>
          )}

          {/* Cart */}
          <div className="position-relative">
            <CartButton cartClickCount={cartClickCount} showMessage={showMessage} />
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={`collapse d-lg-none ${isMenuOpen ? 'show' : ''}`} id="mobileNavbarNav">
        <ul className="navbar-nav p-3 border-bottom border-warning" style={{ backgroundColor: "#fef9ef" }}>
          <li className="nav-item mb-2">
            <Link className="nav-link text-dark d-flex align-items-center gap-2 fw-semibold" to="/" onClick={() => setIsMenuOpen(false)}>
              <i className="bi bi-house text-warning"></i> Home
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link className="nav-link text-dark d-flex align-items-center gap-2 fw-semibold" to="/about" onClick={() => setIsMenuOpen(false)}>
              <i className="bi bi-person text-warning"></i> About Us
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link className="nav-link text-dark d-flex align-items-center gap-2 fw-semibold" to="/products" onClick={() => setIsMenuOpen(false)}>
              <i className="bi bi-gift text-warning"></i> Products
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link className="nav-link text-dark d-flex align-items-center gap-2 fw-semibold" to="/reach-us" onClick={() => setIsMenuOpen(false)}>
              <i className="bi bi-telephone text-warning"></i> Contact Us
            </Link>
          </li>
          {user ? (
            <>
              <li className="nav-item mb-2 border-top pt-2 mt-2" style={{ borderColor: 'rgba(212, 168, 75, 0.3)' }}>
                <span className="nav-link text-dark d-flex align-items-center gap-2 fw-bold" style={{ color: '#713200' }}>
                  Hello, {user.userName}
                </span>
              </li>
              <li className="nav-item">
                <button 
                  className="nav-link text-dark d-flex align-items-center gap-2 fw-semibold bg-transparent border-0 w-100 text-start"
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  <i className="bi bi-box-arrow-right text-warning"></i> Logout
                </button>
              </li>
            </>
          ) : (
            <li className="nav-item border-top pt-2 mt-2" style={{ borderColor: 'rgba(212, 168, 75, 0.3)' }}>
              <Link className="nav-link text-dark d-flex align-items-center gap-2 fw-semibold" to="/login" onClick={() => setIsMenuOpen(false)}>
                <i className="bi bi-box-arrow-in-right text-warning"></i> Login
              </Link>
            </li>
          )}
        </ul>
      </div>

      {/* Mobile Search Bar Dropdown */}
      {showMobileSearch && (
        <div className="d-lg-none p-2 w-100" style={{ backgroundColor: "#fef9ef", borderBottom: '1.5px solid #d4a84b' }}>
          <form
            onSubmit={(e) => {
              handleSearch(e);
              setShowMobileSearch(false);
            }}
            className="d-flex align-items-center w-100"
            style={{
              borderRadius: '25px',
              border: '1.5px solid #c9a44a',
              padding: '4px 14px',
              background: '#fff'
            }}
          >
            <input
              type="text"
              className="form-control border-0 bg-transparent shadow-none"
              placeholder="Search products..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
            />
            <button type="submit" className="btn p-0 border-0 bg-transparent">
              <i className="bi bi-search fs-5" style={{ color: '#8b6914' }}></i>
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Header;
