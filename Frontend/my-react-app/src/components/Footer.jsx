import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import SocialIcons from "./pages/socialMedia";
import logo from "../assets/images/smlogo6.png";
import footerImg from "../assets/images/footer.png";
import FooterAccordion from "./FooterAccordion";

const Footer = () => {
  return (
    <footer
      className="pt-5"
      style={{
        backgroundColor: "#f7e2b8",
        color: "#000",
        borderTop: "2px solid #d4a84b",
      }}
    >
      <div className="container">

        {/* Desktop Footer Content */}
        <div className="row gy-4 mb-5 d-none d-md-flex">

          {/* Left: Logo + Info */}
          <div className="col-lg-4 col-md-6 col-12">
            <div className="mb-3">
              <h5 style={{ color: "#b22222", fontWeight: "bold", fontSize: "30px" }}>SM Enterprises</h5>
              <div className="mt-3">
                <p className="fw-semibold mb-2">GST IN:33CJIPS6916C1Z6</p>
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <i className="bi bi-geo-alt-fill me-2"></i>
                    No.392, Thoppu Street, Vadamanapakkkam, Tiruvannamalai, Tamil Nadu - 6004402
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-telephone-fill me-2"></i>
                    9788661093
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-envelope-fill me-2"></i>
                    smvilakku@gmail.com
                  </li>
                </ul>
              </div>

              {/* Social Icons */}
              <div className="mt-3">
                <SocialIcons />
              </div>
            </div>
          </div>

          {/* Column 2: SHOP / MENU */}
          <div className="col-lg-2 col-md-6 col-6">
            <h6 className="fw-bold text-uppercase mb-3">Shop</h6>
            <ul className="list-unstyled">
              <li>
                <Link to="/" className="text-decoration-none text-dark d-block mb-2">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-decoration-none text-dark d-block mb-2">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-decoration-none text-dark d-block mb-2">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/reach-us" className="text-decoration-none text-dark d-block">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: INFORMATION / HELP */}
          <div className="col-lg-3 col-md-6 col-6">
            <h6 className="fw-bold text-uppercase mb-3">Information</h6>
            <ul className="list-unstyled">
              <li>
                <Link to="/shipping-policy" className="text-decoration-none text-dark d-block mb-2">
                  Shipping Information
                </Link>
              </li>
              <li>
                <Link to="/returns-refunds" className="text-decoration-none text-dark d-block mb-2">
                  Returns & Exchange
                </Link>
              </li>
              <li>
                <Link to="/terms-conditions" className="text-decoration-none text-dark d-block mb-2">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-decoration-none text-dark d-block mb-2">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-decoration-none text-dark d-block">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: QUICK LINKS / VISIT */}
          <div className="col-lg-3 col-md-6 col-6 position-relative">
            <h6 className="fw-bold text-uppercase mb-3">Visit Us @</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <i className="bi bi-geo-alt me-2"></i>
                Tiruvannamalai, Tamil Nadu
              </li>
              <li className="mb-2">
                <i className="bi bi-telephone me-2"></i>
                9788661093
              </li>
              <li>
                <i className="bi bi-envelope me-2"></i>
                smvilakku@gmail.com
              </li>
            </ul>

            {/* Footer Image */}
            <div className="d-none d-lg-block mt-3" style={{ textAlign: "center" }}>
              <img
                src={footerImg}
                alt="Footer decoration"
                style={{
                  width: "160px",
                  height: "auto",
                  opacity: "0.9",
                  backgroundColor: "transparent",
                  mixBlendMode: "multiply",
                  display: "block",
                  margin: "0 auto"
                }}
              />
            </div>
          </div>

        </div>

        {/* Mobile Footer Accordion */}
        <FooterAccordion />

        {/* Bottom Copyright */}
        <div className="row pt-2" style={{ borderTop: "1px solid #d4a84b" }}>
          <div className="col-md-12 text-center">
            <p className="small text-muted mb-2">
              &copy; {new Date().getFullYear()} All rights reserved{" "}
              <i className="bi bi-heart-fill text-danger"></i>{" "}
              <a className="text-decoration-none" href="https://devspectra.in" target="_blank" rel="noopener noreferrer">
                DevSpectra
              </a>
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;