
import '@flaticon/flaticon-uicons/css/all/all.css';
import React, { useEffect, useRef, useState } from 'react';

import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home'
import Header from './components/Header'
import Footer from './components/Footer'
import TestimonialCarousel from './components/Testemonialcarosel';
import DealOfTheDay from './components/DealOfTheDay';
import Shop from './components/pages/shop'
import NewsletterSubscription from './components/pages/NewsLetter';
import Wishlist from './components/pages/wishlist';
import About from './components/pages/about';
import Contact from './components/pages/contact';
import Cart from './components/pages/cart';
import Checkout from './components/pages/checkout';
import LoginPage from './components/pages/NewLoginPage';
import SignupForm from './components/Login/signUp';
import PromoBanner from './components/pages/Promobanner';
import DiyaCollection from './components/pages/DiyaCollection';
import CategorySidebar from './components/pages/CategoryBar';
import ProductListing from './components/pages/ProductListing';
import ShippingPolicy from './components/pages/ShippingPolicy';
import ReturnsRefunds from './components/pages/ReturnRefunds';
import TermsConditions from './components/pages/TermsConditions';
import AboutUs from './components/pages/about';
import PrivacyPolicy from './components/pages/PrivacyPolicy';
import FAQ from './components/pages/FAQ';
import ProductPage from './components/pages/productpage';
import SearchResults from './components/pages/SearchResults';
import ProductSearch from './components/pages/ProductSearch';
import ProtectedRoute from './components/pages/ProtectedRoute';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import ProductManager from './components/Dashboard/productManager/ProductManager';
import DashboardHeader from './components/Dashboard/DashboardHeader';
import DashboardSidebar from './components/Dashboard/DashboardSidebar';
import DashboardLayout from './components/Dashboard/DashboardLayout';
import ChatFooter from './components/whatsapp/ChatFooter';

import PromoAdmin from './components/Dashboard/PromoAdmin';
import CheckoutPage from './components/paymentGateway/checkout';

import CardPaymentPage from './components/paymentGateway/CardPaymentMethod';
import UpiPaymentPage from './components/paymentGateway/upiPaymentPage';
import OrderManager from './components/Dashboard/OrderManager/OrderManager';
import BestSellers from './components/Dashboard/BestSellers/BestSellers';
import StockAlerts from './components/StockAlert/StockAlert';
import RoughCheckout from './components/paymentGateway/RoughCheckout';
import OtpLogin from './components/pages/NewLoginPage';
import BlessedCheckout from './components/paymentGateway/checkout';
import AdminRoute from './components/AdminRoute';
import { AuthContext } from './context/AuthContext';
import { useContext } from 'react';
import ReviewPage from './components/ReviewPage';
import ReviewDetailPage from './components/ReviewDetailPage';
import AdminImageUpload from './components/Dashboard/AdminCourselimage/AdminImageUpload';
import OrderHistory from './components/pages/OrderHistory';
import AdminReviewPanel from './components/Dashboard/ReviewandRating/AdminReviewPanel';
import CategoryManager from './components/Dashboard/CategoryManager/CategoryManager';



function App() {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [cartClickCount, setCartClickCount] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const showMessageRef = useRef(false);
  const { setUser } = useContext(AuthContext);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    const userName = localStorage.getItem('userName');
    const userID = localStorage.getItem('userId');
    const role = localStorage.getItem('role');

    if (token && email) {
      setUser({ email, token, userName, userID, role });
    }
  }, []);


 useEffect(() => {
    showMessageRef.current = showMessage;
  }, [showMessage]);


useEffect(() => {
  const fetchWishlist = async () => {
    const token = localStorage.getItem('token');
    if (!token || token.split('.').length !== 3) return;

    let currentUserId;
    try {
      const decoded = jwtDecode(token);
      currentUserId = decoded.userId;
    } catch (err) {
      console.error('Token decode failed:', err);
      return;
    }

    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/wishlist/${currentUserId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const wishlistData = res.data?.wishlist;

      if (!wishlistData || !Array.isArray(wishlistData.products)) {
        console.warn('No wishlist found or products missing');
        setWishlist([]);
        return;
      }

      const normalizedWishlist = wishlistData.products.map(product => ({
        _id: product._id,
        name: product.name,
        image: product.image,
        price: product.sale || product.price,
        quantity: 1
      }));

      setWishlist(normalizedWishlist);
    } catch (err) {
      console.error('Wishlist fetch error:', err.message || err);
      setWishlist([]);
    }
  };

  fetchWishlist();
}, []);
useEffect(() => {
  if (!sessionStorage.getItem("visited-home")) {
    axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/track-visit`, { page: "home" });
    sessionStorage.setItem("visited-home", "true");
  }
}, []);

const getAuthHeaders = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${localStorage.getItem('token')}`
});




// const handleAddToWishlist = async (product) => {
//   const token = localStorage.getItem('token');
//   const decoded = jwtDecode(token);
//   const currentUserId = decoded.userId;

//   setWishlist((prevWishlist) => {
//     const exists = prevWishlist.some((item) => item._id === product._id);

//     if (!exists) {
//       axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/wishlist/add`, {
//         userId: currentUserId,
//         productId: product._id
//       }, {
//         headers: { Authorization: `Bearer ${token}` },
//         withCredentials: true
//       }).catch(err => {
//         console.error('Failed to add to wishlist:', err.response?.data || err.message);
//       });
//     } else {
//       axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/wishlist/${currentUserId}/${product._id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//         withCredentials: true
//       }).catch(err => {
//         console.error('Failed to remove from wishlist:', err.response?.data || err.message);
//       });
//     }

//     return exists
//       ? prevWishlist.filter((item) => item._id !== product._id)
//       : [...prevWishlist, product];
//   });

//   // ✅ Re-fetch wishlist to sync with backend
//   try {
//     const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/wishlist/${currentUserId}`, {
//       headers: { Authorization: `Bearer ${token}` },
//       withCredentials: true
//     });

//     const products = res.data.wishlist.products || [];
//     const mapped = products.map(item => ({
//       ...item,
//       quantity: 1
//     }));

//     setWishlist(mapped);
//   } catch (err) {
//     console.error('Failed to fetch updated wishlist:', err.response?.data || err.message);
//   }
// };

const handleAddToWishlist = async (product) => {
  const token = localStorage.getItem('token');
  const decoded = jwtDecode(token);
  const currentUserId = decoded.userId;

  const exists = wishlist.some((item) => item._id === product._id);

  // Optimistic UI update
  setWishlist((prev) =>
    exists
      ? prev.filter((item) => item._id !== product._id)
      : [...prev, product]
  );

  try {
    if (!exists) {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/wishlist/add`,
        {
          userId: currentUserId,
          productId: product._id,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
    } else {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/wishlist/${currentUserId}/${product._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
    }

    // Optional: re-fetch wishlist after backend confirms
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/wishlist/${currentUserId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      }
    );

    const products = res.data.wishlist.products || [];
    const mapped = products.map((item) => ({
      ...item,
      quantity: 1,
    }));

    setWishlist(mapped);
  } catch (err) {
    console.error("Wishlist sync failed:", err.response?.data || err.message);
  }
};
const handleAddToCart = async (product) => {
  
  if (!product?._id) {
    
    return;
  }
  try {
    // 🛒 Update local cart
   // 🛒 Optimistic local update
const updatedCart = cart.some(item => item._id === product._id)
  ? cart.map(item =>
      item._id === product._id
        ? { ...item, quantity: item.quantity + (product.quantity || 1) }
        : item
    )
  : [...cart, { ...product, quantity: product.quantity || 1 }];

setCart(updatedCart);
setCartClickCount(updatedCart.length);

// 🔄 Backend sync
 const token = localStorage.getItem('token');

const response = await axios.post(
  `${import.meta.env.VITE_BACKEND_URL}/api/user/cart/${product._id}`,
  { quantity: product.quantity || 1 },
  
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    
  }
);

// ✅ Replace local cart with backend response if needed
// setCart(response.data.cart);
// setCartClickCount(response.data.cart.length);
    // ✅ Show feedback
    setShowMessage(true);
    setTimeout(() => {
      if (showMessageRef.current) setShowMessage(false);
    }, 3000);
  } catch (err) {
    console.error('Cart error:', err.response?.data || err.message);
  }
};


  return (
    <>
  
 
    <Router>
      

      <Routes>
        <Route
          path="/"
          element={
            <>
           
              <Header cartClickCount={cartClickCount} showMessage={showMessage}/>
              <PromoBanner/>
               <DiyaCollection/>
              <CategorySidebar onAddToCart={handleAddToCart} onAddToWishlist={handleAddToWishlist} wishlist={wishlist}/>
              <Footer/>
             
            </>
          }
        />
        
       <Route 
          path="/products/:category" 
          element={
          <>
            <Header cartClickCount={cartClickCount} showMessage={showMessage}/>
            <PromoBanner/>
            <ProductPage
              onAddToCart={handleAddToCart}
              onAddToWishlist={handleAddToWishlist}
              wishlist={wishlist}
            />
          <Footer/>
          </>
        } 
       />

        <Route path="/shop" element={
          <>
            <Header/>
            <Shop />
            <Footer/>
          </>
        } />
        
          <Route path="/wishlist" element={
            <ProtectedRoute>
            <>
              <Header cartClickCount={cartClickCount} showMessage={showMessage}/>
              <Wishlist wishlist={wishlist} setWishlist={setWishlist} onAddToCart={handleAddToCart}/>
              {/* <NewsletterSubscription/> */}
              <Footer/>
            </>
             </ProtectedRoute>
          } />
         
        <Route path="/journey" element={
          <>
             <Header/>
             <AboutUs/>
             
             <Footer/>
          </>
        }/>
          <Route path="/reach-us" element={
          <>
            <Contact/> 
          </>
        }/>
           <Route path="/search" element={
            <>
            <Header cartClickCount={cartClickCount} showMessage={showMessage}/>
            <ProductSearch
                onAddToCart={handleAddToCart}
                onAddToWishlist={handleAddToWishlist}
                wishlist={wishlist}/>
            <Footer/>
            </>
            } />

            <Route path="/cart" element={
              <ProtectedRoute>
                <Cart cart={cart} setCart={setCart} setCartClickCount={setCartClickCount}/>
              </ProtectedRoute>
              } 
              />
          
       
          {/* <Route path="/checkout" element={
           <ProtectedRoute>
            <Checkout cart={cart} setCart={setCart} setCartClickCount={setCartClickCount}/> 
          </ProtectedRoute>
        }/> */}
         <Route path="/checkout" element={
          //  <ProtectedRoute>
             <CheckoutPage cart={cart} setCart={setCart} setCartClickCount={setCartClickCount}/> 
            // <RoughCheckout/>
          // </ProtectedRoute>
        }/>
         <Route path="/card-payment" element={<CardPaymentPage />} />
         <Route path="/upi-payment" element={<UpiPaymentPage />} />


          {/* <Route path="/loginpage" element={
          <>
         
            <LoginPage 
                setCart={setCart}
                setCartClickCount={setCartClickCount}
            /> 
           
          </>
        }/> */}
        {/* <Route path="/loginpage" element={
          <>
          {/* <ProtectedRoute> */}
            {/* <LoginPage 
            setCart={setCart}
                setCartClickCount={setCartClickCount}
                
            />  */}
            {/* </ProtectedRoute> */}
          {/* </> */}
        {/* }/>  */}
         <Route path="/signup" element={
          <>
            <SignupForm/> 
          </>
        }/>
        <Route path="/login" element={
          <>
            <OtpLogin setCart={setCart}
                setCartClickCount={setCartClickCount}/> 
          </>
        }/>
        {/* <Route path="/" element={isLoggedIn ? < BlessedCheckout/> : <Navigate to="/login" />} /> */}
        <Route path="/shipping-policy" element={
          <>
          <Header cartClickCount={cartClickCount} showMessage={showMessage}/>
          <ShippingPolicy />
          <Footer/>
          </>
          } />
        <Route path="/returns-refunds" element={
          <>
          <Header cartClickCount={cartClickCount} showMessage={showMessage}/>
          <ReturnsRefunds />
          <Footer/>
          </>
          } />
        <Route path="/terms-conditions" element={
          <>
          <Header cartClickCount={cartClickCount} showMessage={showMessage}/>
          <TermsConditions />
          <Footer/>
          </>
          } />
        <Route path="/privacy-policy" element={
          <>
          <Header cartClickCount={cartClickCount} showMessage={showMessage}/>
          <PrivacyPolicy/>
          <Footer/>
          </>
          } />

        <Route path="/faq" element={
          <>
          <Header cartClickCount={cartClickCount} showMessage={showMessage}/>
          <FAQ/>
          <Footer/>
          </>
          } />
          {/* <Route path="/admin" element={
            <AdminDashboard />
            } /> */}
          {/* <Route path="/admin/products" element={
            <>
            <DashboardHeader/>
            <DashboardSidebar/>
            <ProductManager />
            </> */}
            {/* } /> */}
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <DashboardLayout />
                </AdminRoute>
              }
            >

            
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="products" element={<ProductManager />} />
              <Route path="promos" element={<PromoAdmin />} />
              <Route path="order" element={<OrderManager/>}/>
               <Route path="bestseller" element={<BestSellers />} />
              <Route path="stocks" element={<StockAlerts/>}/>
              <Route path="images/upload" element={<AdminImageUpload />} />
              <Route path="reviews" element={<AdminReviewPanel/>} />
              <Route path="category" element={<CategoryManager/>}/>


            </Route>
         

            <Route path="/review/:orderId" element={<ReviewPage/>} />
            <Route path="/orderhistory" element={<OrderHistory />} />


           

      </Routes>
       
<ChatFooter/>
   
    </Router>


    </>
  )
}

export default App

