import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../Header';
import Footer from '../Footer';
import bgImage from '../../assets/images/bg_cart.jpg';
import product3 from '../../assets/images/diya1.jpg';
import cart1 from '../../assets/images/cart1.jpg';
import NewsletterSubscription from './NewsLetter';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cart from './cart';
import '../../assets/css/css/CartSection.css'




const CartSection = ({ cart, setCart, setCartClickCount }) => {

  const [cartItems, setCartItems] = useState(cart);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust breakpoint if needed
    };

    checkMobile(); // Initial check
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');

    try {
      const res = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/user/cart/${id}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const rawCart = res.data.cart;

      // Normalize cart format
      // const normalizedCart = rawCart.map(item => ({
      //   _id: item.product?._id || item._id,
      //   name: item.product?.name || item.name,
      //   price: typeof item.product?.price === 'number' ? item.product.price : item.price || 0,
      //   image: item.product?.image || item.image || product3,
      //   quantity: typeof item.quantity === 'number' ? item.quantity : 1
      // }));
      const normalizedCart = rawCart.map(item => ({
        _id: item._id,
        name: item.name,
        price: typeof item.price === 'number' ? item.price : 0,
        originalPrice: typeof item.originalPrice === 'number' ? item.originalPrice : 0,
        discountStr: item.discountStr || '',
        gst: typeof item.gst === 'number' ? item.gst : 0,
        size: item.size || '',
        image: item.image || product3,
        quantity: typeof item.quantity === 'number' ? item.quantity : 1
      }));



      setCartItems(normalizedCart);
      setCart(normalizedCart);
      setCartClickCount(Math.max(normalizedCart.length, 0));
    } catch (err) {
      console.error('Failed to delete cart item:', err.response?.data || err.message);
    }
  };



  useEffect(() => {
    const safeCart = cart.map(item => ({
      ...item,
      price: typeof item.price === 'number' ? item.price : 0,
      originalPrice: typeof item.originalPrice === 'number' ? item.originalPrice : (typeof item.product?.price === 'number' ? item.product.price : 0),
      discountStr: item.discountStr || item.discount || item.product?.discount || '',
      gst: typeof item.gst === 'number' ? item.gst : 0,
      size: item.size || '',
      quantity: typeof item.quantity === 'number' ? item.quantity : 1
    }));
    setCartItems(safeCart);
  }, [cart]);


  const subtotal = Array.isArray(cartItems)
    ? cartItems.reduce((acc, item) => {
        const itemOriginalPrice = item.originalPrice || item.price || 0;
        return acc + itemOriginalPrice * item.quantity;
      }, 0)
    : 0;

  // ✅ Professional GST: calculated per product (supports mixed rates like 5%, 12%, 18%, 28%)
  const gstAmount = Array.isArray(cartItems)
    ? cartItems.reduce(
      (total, item) => total + (item.price * item.quantity * (item.gst || 0)) / 100,
      0
    )
    : 0;

  // Dynamic GST label – show single rate if all same, else 'as per product rate'
  const gstRates = [...new Set((cartItems || []).map(item => item.gst || 0))];
  const averageGstDisplay =
    gstRates.length === 1
      ? `${gstRates[0]}%`
      : 'as per product rate';

  const shippingEstimate = 0; // Free shipping
  const discount = Array.isArray(cartItems)
    ? cartItems.reduce((acc, item) => {
        if (item.discountStr && String(item.discountStr).trim() !== '') {
          const itemOriginalPrice = item.originalPrice || item.price || 0;
          const diff = itemOriginalPrice > item.price ? (itemOriginalPrice - item.price) * item.quantity : 0;
          return acc + diff;
        }
        return acc;
      }, 0)
    : 0;
  const delivery = 0.0;
  const amount_sum = subtotal + gstAmount + shippingEstimate - discount;
  const total = Math.round(amount_sum);


  return (
    <>
      <Header />
      {/* <div
        className="hero-wrap hero-bread d-flex align-items-center justify-content-center text-center" */}
      {/* style={{ */}
      {/* // backgroundImage: `url(${bgImage})`,
  // backgroundSize: 'cover',
  // backgroundPosition: 'center',
  // backgroundRepeat: 'no-repeat',
//   height: '80vh',
//   width: '100%',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
// }}
      > */}
      <div className="container">
        <div className="row g-0">
          <div className="col-md-9 mx-auto">
             <h1 className="mb-0 bread" style={{ color: "#713200", fontFamily: "'Cantata One', serif", fontWeight: "bold" }}>My Cart</h1>
          </div>
        </div>
      </div>
      {/* </div> */}

      <section className="py-5 bg-transparent">
        <div className="container">
          {/* Cart Table */}
          {isMobile ? (
            cartItems.map(item => (
              <div className="card mb-3 shadow-sm" key={item._id} style={{ backgroundColor: 'rgba(255, 255, 255, 0.75)' }}>
                <div className="card-body">
                  <div className="d-flex align-items-center mb-2">
                    <img src={item.image?.startsWith('http') ? item.image : `${import.meta.env.VITE_BACKEND_URL}${item.image}`} alt={item.name} className="me-3" style={{ width: '60px', height: '60px', objectFit: 'cover' }} />
                    <h5 className="mb-0">{item.name}</h5>
                  </div>
                  {item.size && <p className="mb-1 text-muted small">Size: {item.size}</p>}
                  <p className="mb-1">Price: ₹{item.price.toFixed(2)}</p>
                  <p className="mb-1">Quantity: {item.quantity}</p>
                  <p className="mb-1 fw-bold">Total: ₹{(item.price * item.quantity).toFixed(2)}</p>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(item._id)}>
                    Remove
                  </button>
                </div>
              </div>
            ))
          ) :
            (<div className="row">
              <div className="col-md-12">
                <div className="table-responsive shadow-sm rounded border border-warning" style={{ backgroundColor: 'rgba(255, 255, 255, 0.75)', backdropFilter: 'blur(8px)' }}>
                  <table className="table table-bordered table-hover cart-table text-center mb-0">
                    <thead className="bg-warning text-dark">
                      <tr>
                        <th style={{ minWidth: '120px' }}>Action</th>
                        <th>Image</th>
                        <th style={{ minWidth: '250px' }}>Product</th>
                        <th>Price</th>
                        <th>Qty</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.map((item) => (
                        <tr key={item._id}>
                          <td style={{ verticalAlign: 'middle' }}>
                            <button
                              className="btn btn-sm btn-outline-danger d-inline-flex align-items-center"
                              onClick={() => handleDelete(item?._id)}
                            >
                              <i className="bi bi-trash-fill me-1"></i> Remove
                            </button>
                          </td>
                          <td style={{ verticalAlign: 'middle' }}>
                            <img
                              src={item.image?.startsWith('http') ? item.image : `${import.meta.env.VITE_BACKEND_URL}${item.image}`}
                              alt={item.name}
                              className="cart-image"
                              style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                            />
                          </td>
                          <td style={{ minWidth: '250px', textAlign: 'left', verticalAlign: 'middle', whiteSpace: 'normal' }}>
                            <h6 className="mb-0 fw-bold">{item?.name}</h6>
                            <small className="text-muted d-block">{item.description}</small>
                            {item.size && <div className="text-muted small mt-1">Size: {item.size}</div>}
                          </td>
                          <td style={{ verticalAlign: 'middle' }}>
                            {item.originalPrice && item.originalPrice > item.price ? (
                              <div className="d-flex flex-column align-items-center">
                                <span className="text-muted text-decoration-line-through small">
                                  र{item.originalPrice.toFixed(2)}
                                </span>
                                <span className="fw-bold text-dark">
                                  र{item.price.toFixed(2)}
                                </span>
                              </div>
                            ) : (
                              <span>र{item.price.toFixed(2)}</span>
                            )}
                          </td>
                          <td style={{ verticalAlign: 'middle' }}>
                            <span className="quantity-pill">{item.quantity}</span>
                          </td>
                          <td style={{ verticalAlign: 'middle' }}>र{(item.price * item.quantity).toFixed(2)}</td>
                        </tr>
                      ))}
                      {cartItems.length === 0 && (
                        <tr>
                          <td colSpan="6" className="text-muted text-center py-4">
                            <img src={cart1} alt="Empty Cart" style={{ width: '100px' }} />
                            <p className="mt-3">🛒 Your cart is empty. Start shopping!</p>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>)}

          {/* Cart Actions */}
          <div className="row justify-content-end mt-5">
            {/* Coupon Code */}
            <div className="col-lg-6 mb-4">
              <div className="p-4 shadow-sm rounded border border-warning" style={{ backgroundColor: 'rgba(255, 255, 255, 0.75)', backdropFilter: 'blur(8px)' }}>
                <div className="d-flex align-items-center mb-3">
                  <i className="bi bi-gift-fill text-warning fs-3 me-2"></i>
                  <h4 className="mb-0">Apply Coupon</h4>
                </div>
                <p className="text-muted">Have a promo code? Enter it below to unlock savings.</p>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control border-warning"
                    placeholder="Enter coupon code"
                    aria-label="Coupon code"
                  />
                  <button className="btn btn-warning text-dark fw-bold" type="button">
                    Apply
                  </button>
                </div>
                <div className="text-success small mt-2">
                  {/* Optional success message */}
                  🎉 Coupon applied successfully!
                </div>
              </div>
            </div>

            {/* Cart Totals */}
            <div className="col-lg-6 mb-4">
              <div className="p-4 shadow-sm rounded border border-warning total-card" style={{ backgroundColor: 'rgba(255, 255, 255, 0.75)', backdropFilter: 'blur(8px)' }}>
                <h4 className="mb-3">Cart Totals</h4>

                <div className="d-flex justify-content-between mb-2">
                  <span>Product Price</span>
                  <span>र{subtotal.toFixed(2)}</span>
                </div>

                <div className="d-flex justify-content-between mb-2">
                  <span>GST</span>
                  <span>र{gstAmount.toFixed(2)}</span>
                </div>

                <div className="d-flex justify-content-between mb-2 text-success">
                  <span>discount</span>
                  <span>{discount > 0 ? `-र${discount.toFixed(2)}` : `र0.00`}</span>
                </div>

                <hr style={{ borderColor: '#d4af37' }} />

                <div className="d-flex justify-content-between fw-bold fs-5">
                  <span>Total</span>
                  <span>र{total.toFixed(2)}</span>
                </div>

                <Link
                  to="/checkout"
                  state={{
                    subtotal,
                    gstAmount,
                    shippingEstimate,
                    discount,
                    total,
                    cartItems
                  }}
                  className="btn btn-warning w-100 text-dark fw-bold mt-3"
                >
                  <i className="bi bi-arrow-right-circle me-2"></i> Proceed to Checkout
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <NewsletterSubscription /> */}
      <Footer />
    </>
  );
};

export default CartSection;
