import Footer from "../Footer"
import Header from "../Header"
import bgImage from '../../assets/images/bg_8.jpg'
import NewsletterSubscription from "./NewsLetter"
import CheckoutSection from "./checkoutSection"
import { useLocation } from "react-router-dom";

const Checkout=(cart, setCart, setCartClickCount)=>{

  const location = useLocation();
  const { subtotal, discount, delivery, total, cartItems } = location.state || {};

    return(<>
    <Header/>
    <div
                      className="hero-wrap hero-bread d-flex align-items-center justify-content-center text-center"
                      style={{
                        backgroundImage: `url(${bgImage})`,
                        backgroundSize: 'cover', 
                        backgroundPosition: 'center',
                        height: '70vh' 
                        }}>
              <div className="container">
                <div className="row g-0">
                  <div className="col-md-9 mx-auto">
                    {/* <p className="breadcrumbs mb-2"> */}
                      {/* <span className="me-2">
                        <a href="index.html">Home</a>
                      </span>
                      <span>About us</span> */}
                    {/* </p> */}
                    <h1 className="mb-0 bread text-light">Checkout</h1>
                  </div>
                </div>
              </div>
            </div>
            <CheckoutSection
            subtotal={subtotal}
        discount={discount}
        delivery={delivery}
        total={total}
        cartItems={cartItems}
        cart={cart}
        setCart={setCart}
        setCartClickCount={setCartClickCount}
/>
    <NewsletterSubscription/>
    <Footer/>
    </>)
}
export default Checkout