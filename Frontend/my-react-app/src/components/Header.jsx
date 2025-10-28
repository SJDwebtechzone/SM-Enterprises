
import  { useEffect, useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import '../assets/css/css/TopBar.css';
import { Link, useNavigate } from 'react-router-dom'; 
import bg_121 from '../assets/images/bg_121.jpg'
import devspectra from '../assets/images/smlogo6.png'
import NavigationBar from './nav';
import NavigationBars from './nav';
import CartButton from './pages/cartButton';
import SearchBar from './pages/SearchBar';
import SearchResults from './pages/SearchResults';
import axios from 'axios';




const Header = ({cartClickCount,showMessage}) => {

  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);


const { user, setUser} = useContext(AuthContext);
const navigate=  useNavigate();
// const { setUser } = useContext(AuthContext);
 const [showToast, setShowToast] = useState(false);



  // const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  // const cartCount = Array.isArray(cart)
  // ? cart.reduce((total, item) => total + (item.quantity || 1), 0)
  // : 0;




  const handleCartClick = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };



const handleLogout = () => {
 localStorage.removeItem('token');
  setUser(null);
  // setWishlist([]);
  navigate('/login');



};

  const handleSearch = async (e) => {
  e.preventDefault();
  if (query.trim()) {
    navigate(`/search?query=${encodeURIComponent(query.trim())}`);
  }
};





  return (
	<>
  <div className="app-wrapper">

<div className='sticky-header'>

  <nav
  className="navbar navbar-expand-lg border-bottom "
  style={{
    background: " #e8940dff",
    color: 'white',
    // #dea32cff
  }}
>
  <div className="container-fluid">
    {/* Logo and Brand */}
      <a className="navbar-brand d-flex align-items-center fw-bold me-lg-5" href="#">
    <img
      src={devspectra}
      alt="Lotus Emblem"
      style={{
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        filter: 'brightness(0.7) contrast(1.2)', // darkens lotus
        transition: 'filter 0.3s ease-in-out'
      }}
    />
    <span style={{ fontFamily: 'Poppins, sans-serif', color: '#333', marginLeft: '10px' }}>
      SM Enterprises
    </span>
  </a>

    {/* Mobile Toggle Button */}
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarContent"
      aria-controls="navbarContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon"></span>
    </button>

    {/* Collapsible Content */}
    <div className="collapse navbar-collapse" id="navbarContent">
      <div className="w-100 d-flex flex-column flex-lg-row align-items-start align-items-lg-center justify-content-between py-2">
        {/* Navigation Links */}
        <ul className="navbar-nav d-flex flex-row justify-content-start gap-4 ms-lg-3">
          <li className="nav-item">
            <Link to='/' className="nav-link text-dark" >Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/journey" className="nav-link text-dark">About us</Link>
          </li>
          <li className="nav-item">
            <Link to='/reach-us' className="nav-link text-dark">Contact us</Link>
          </li>
        </ul>

        {/* Search Bar */}
         <form className="search-form d-flex mx-lg-4 my-2 my-lg-0" style={{ maxWidth: '400px' }} onSubmit={handleSearch}>
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search products..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <button className="btn btn-outline-dark" type="submit"> 
                  <i className="bi bi-search"></i> 
                                    </button>

              </form> 
             

        {/* Icons and Login */}
        <div className="d-flex align-items-center gap-3 mt-2 mt-lg-0">
          <Link to="/orderhistory" className="text-dark" title="Order History"><i className="bi bi-receipt-cutoff fs-5 text-dark"></i> </Link>
          <Link to='/wishlist' className="text-dark" title="My WishList">
          <i className="bi bi-heart fs-5 text-dark" title="Wishlist"></i>
          </Link>
          {/* <i className="bi bi-cart fs-5 text-white" title="Cart"></i> */}
          {/* <Link to="/cart" className="text-white" title="Cart">
            <i className="bi bi-cart fs-5 text-white"></i>
         </Link> */}
        <CartButton cartClickCount={cartClickCount} showMessage={showMessage} />

        <div className="dropdown">
  {user ? (
    <>
      <img
        src={bg_121 || "https://via.placeholder.com/40"} // fallback if no image
        alt="User Avatar"
        className="rounded-circle"
        style={{ width: '40px', height: '40px', cursor: 'pointer' }}
        data-bs-toggle="dropdown"
        aria-expanded="false"
      />
      <ul className="dropdown-menu dropdown-menu-end">
        <li>
          <span className="dropdown-item-text fw-bold">Hello, {user.userName}</span>
        </li>
        <li><hr className="dropdown-divider" /></li>
        <li>
          <button className="dropdown-item text-danger" onClick={handleLogout}>
            Logout
          </button>
        </li>
      </ul>
    </>
  ) : (
    //<Link to="/login" className="text-white" title="Login">
    //   <button className="btn btn-light text-dark">Login</button>
    // </Link> 
    // <Link to="/loginpage" className="text-white" title="Login">
    //    <button className="btn btn-light text-dark">Login</button>
    // </Link>
    <Link to="/login" className="text-white" title="Login">
       <button className="btn btn-light text-dark">Login</button>
    </Link>
  )}
</div>


          
        </div>
      </div>
    </div>
  </div>
</nav>
</div>
</div>
    
	</>
	)
};

export default Header;