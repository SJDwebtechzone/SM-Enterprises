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
import { isMobile } from 'react-device-detect';



const CartSection = ({cart,setCart,setCartClickCount}) => {
  
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
    const normalizedCart = rawCart
  .filter(item => item.product && item.product._id) // only include valid items
  .map(item => ({
    _id: item.product._id,
    name: item.product.name,
    price: typeof item.product.price === 'number' ? item.product.price : 0,
    image: item.product.image || product3,
    quantity: typeof item.quantity === 'number' ? item.quantity : 1
  }));

    console.log('Normalized cart after delete:', normalizedCart);

    setCartItems(normalizedCart);
    setCart(normalizedCart);
    setCartClickCount(Math.max(normalizedCart.length, 0));
  } catch (err) {
    console.error('Failed to delete cart item:', err.response?.data || err.message);
  }
};
    console.log(' updatedcart ',cartItems)
console.log(isMobile); // true or false


useEffect(() => {
  const safeCart = cart.map(item => ({
    ...item,
    price: typeof item.price === 'number' ? item.price : 0,
    quantity: typeof item.quantity === 'number' ? item.quantity : 1
  }));
  setCartItems(safeCart);
}, [cart]);


  const subtotal = Array.isArray(cartItems)
  ? cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
  : 0;
  const gstRate = 0.18;
const gstAmount = subtotal * gstRate;

const shippingEstimate = subtotal > 1000 ? 0 : 50; // Free shipping over ₹1000
  const discount = 3.0;
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
              <h1 className="mb-0 bread text-dark">My Cart</h1>
            </div>
          </div>
        </div>
      {/* </div> */}

      <section className="py-5 bg-light">
        <div className="container">
          {/* Cart Table */}
          {isMobile ? (
  cartItems.map(item => (
    <div className="card mb-3 shadow-sm" key={item._id}>
      <div className="card-body">
        <div className="d-flex align-items-center mb-2">
          <img src={item.image} alt={item.name} className="me-3" style={{ width: '60px', height: '60px' }} />
          <h5 className="mb-0">{item.name}</h5>
        </div>
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
         ( <div className="row">
            <div className="col-md-12">
              <div className="table-responsive">
               <table className="table table-bordered table-hover cart-table text-center">
                  <thead className="bg-warning text-dark">
                    <tr>
                      <th>Action</th>
                      <th>Image</th>
                      <th>Product</th>
                      <th>Price</th>
                      <th>Qty</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <tr key={item._id}>
                        <td>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDelete(item?._id)}
                          >
                            <i className="bi bi-trash-fill"></i>
                          </button>
                        </td>
                        <td>
                          <img
                            src={item.image?.startsWith('http') ? item.image : `http://localhost:5000${item.image}`}
                            alt={item.name}
                            className="cart-image"
                            style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                          />
                        </td>
                        <td>
                          <h6 className="mb-0">{item?.name}</h6>
                          <small className="text-muted">{item.description}</small>
                        </td>
                        <td>र{item.price.toFixed(2)}</td>
                        <td>
                          <span className="quantity-pill">{item.quantity}</span>
                        </td>
                        <td>र{(item.price * item.quantity).toFixed(2)}</td>
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
            <div className="col-lg-4 mb-4">
                <div className="bg-white p-4 shadow-sm rounded border border-warning">
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

            {/* Estimate Shipping */}
            <div className="col-lg-4 mb-4">
                <div className="bg-white p-4 shadow-sm rounded border-start border-4 border-primary">
                  <div className="d-flex align-items-center mb-3">
                    <i className="bi bi-truck fs-3 text-primary me-2"></i>
                    <h4 className="mb-0">Estimate Shipping & Tax</h4>
                  </div>
                  <p className="text-muted">Enter your destination to calculate delivery charges and taxes.</p>

                  <div className="mb-2">
                    <label className="form-label fw-semibold">Country</label>
                    <input type="text" className="form-control border-primary" placeholder="e.g. India" />
                  </div>

                  <div className="mb-2">
                    <label className="form-label fw-semibold">State / Province</label>
                    <input type="text" className="form-control border-primary" placeholder="e.g. Tamil Nadu" />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Zip / Postal Code</label>
                    <input type="text" className="form-control border-primary" placeholder="e.g. 600095" />
                  </div>

                  <button className="btn btn-primary w-100 fw-bold">
                    <i className="bi bi-calculator me-2"></i> Estimate Now
                  </button>
                </div>
            </div>

            {/* Cart Totals */}
   <div className="col-lg-4 mb-4">
  <div className="bg-white p-4 shadow-sm total-card">
    <h4 className="mb-3">Cart Totals</h4>

    <div className="d-flex justify-content-between mb-2">
      <span>Subtotal</span>
      <span>र{subtotal.toFixed(2)}</span>
    </div>

    <div className="d-flex justify-content-between mb-2">
      <span>GST (18%)</span>
      <span>र{gstAmount.toFixed(2)}</span>
    </div>

    <div className="d-flex justify-content-between mb-2">
      <span>Estimated Shipping</span>
      <span>र{shippingEstimate.toFixed(2)}</span>
    </div>

    <div className="d-flex justify-content-between mb-2 text-success">
      <span>Discount</span>
      <span>-र{discount.toFixed(2)}</span>
    </div>

    <hr />

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
      className="btn btn-dark w-100 mt-3"
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
