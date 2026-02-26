import React from "react";
import { Accordion } from "react-bootstrap";
import { Link } from "react-router-dom";
import SocialIcons from "./pages/socialMedia";
import footerImg from "../assets/images/footer.png";
import "./FooterAccordion.css";

const FooterAccordion = () => {
  return (
    <div className="mobile-footer d-md-none">
      {/* Mobile Company Info */}
      <div className="mb-4">
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

      <Accordion flush>

        {/* SHOP */}
        <Accordion.Item eventKey="0" className="footer-item">
          <Accordion.Header>
            <span>SHOP</span>
            <span className="plus-icon">+</span>
          </Accordion.Header>
          <Accordion.Body>
            <ul>
              <li><Link to="/" className="text-decoration-none text-dark">Home</Link></li>
              <li><Link to="/about" className="text-decoration-none text-dark">About Us</Link></li>
              <li><Link to="/reach-us" className="text-decoration-none text-dark">Contact Us</Link></li>
              <li><Link to="/shipping-policy" className="text-decoration-none text-dark">Shipping Policy</Link></li>
            </ul>
          </Accordion.Body>
        </Accordion.Item>

        {/* INFORMATION */}
        <Accordion.Item eventKey="1" className="footer-item">
          <Accordion.Header>
            <span>INFORMATION</span>
            <span className="plus-icon">+</span>
          </Accordion.Header>
          <Accordion.Body>
            <ul>
              <li><Link to="/shipping-policy" className="text-decoration-none text-dark">Shipping Information</Link></li>
              <li><Link to="/returns-refunds" className="text-decoration-none text-dark">Returns & Exchange</Link></li>
              <li><Link to="/terms-conditions" className="text-decoration-none text-dark">Terms & Conditions</Link></li>
              <li><Link to="/privacy-policy" className="text-decoration-none text-dark">Privacy Policy</Link></li>
              <li><Link to="/faq" className="text-decoration-none text-dark">FAQs</Link></li>
            </ul>
          </Accordion.Body>
        </Accordion.Item>

        {/* VISIT US */}
        <Accordion.Item eventKey="2" className="footer-item">
          <Accordion.Header>
            <span>VISIT US @</span>
            <span className="plus-icon">+</span>
          </Accordion.Header>
          <Accordion.Body>
            <div className="contact-info">
              <p><i className="bi bi-geo-alt me-2"></i>Tiruvannamalai, Tamil Nadu</p>
              <p><i className="bi bi-telephone me-2"></i><a href="tel:+919788661093" className="text-decoration-none text-dark">9788661093</a></p>
              <p><i className="bi bi-envelope me-2"></i><a href="mailto:smvilakku@gmail.com" className="text-decoration-none text-dark">smvilakku@gmail.com</a></p>
            </div>
          </Accordion.Body>
        </Accordion.Item>

      </Accordion>
      
      {/* Mobile Footer Image */}
      <div className="text-center mt-4">
        <img 
          src={footerImg} 
          alt="Footer decoration" 
          style={{ 
            width: "150px", 
            height: "auto", 
            opacity: "0.9",
            backgroundColor: "transparent",
            mixBlendMode: "multiply"
          }}
        />
      </div>
    </div>
  );
};

export default FooterAccordion;