import { Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import SocialIcons from './pages/socialMedia';
import { useEffect } from 'react';
import ChatFooter from './whatsapp/ChatFooter';
import bgimage from '../assets/images/Hindu_Devotional_Bac.png'

const Footer = () => {

//   useEffect(() => {
//   window.scrollTo({ top: 0, behavior: 'smooth' });
// }, []);
  return (

    <footer
  className="pt-5"
  style={{
   
    background:"#e8940dff",
    color: 'white'     ,
    fontWeight:'600px'       // Bootstrap gray-900 for readable text
  }}
>
  <div className="container">
    {/* Scroll to top icon */}
    <div className="row">
      <div className="text-center mb-3">
        <Link
          to="#"
          className="btn btn-outline-secondary rounded-circle bg-white"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <span className="bi bi-arrow-up"></span>
        </Link>
    </div>
    </div>

    {/* Footer content */}
    <div className="row mb-5">
      {/* Brand Info */}
      <div className="col-md">
        <div className="mb-4">
          <h3 className="h5 text-dark">SM Enterprises</h3>
          <p className=" text-white fw-bold">
           GST IN:33CJIPS6916C1Z6
          </p>
          <ul className="list-inline mt-3">
           
            <SocialIcons/>
          </ul>
        </div>
      </div>

      {/* Menu */}
      <div className="col-md">
        <div className="mb-4 ms-md-5">
          <h3 className="h5 text-dark">Menu</h3>
          <ul className="list-unstyled">
            <li><Link to="/" className="d-block py-1 text-white text-decoration-none fw-bold" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Home</Link></li>
            <li><Link to="/journey" className="d-block py-1 text-white text-decoration-none fw-bold" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>About us</Link></li>
            <li><Link to="/reach-us" className="d-block py-1 text-white text-decoration-none fw-bold" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Contact us</Link></li>
          </ul>
        </div>
      </div>

      {/* Help */}
      <div className="col-md">
        {/* <div className="mb-4"> */}
          
          <div className=" mb-4 ms-md-5 ">
            <h3 className="h5 text-dark">Help</h3>
            <ul className="list-unstyled">
              <li>
                <Link to='/shipping-policy' className="d-block py-1 text-white text-decoration-none fw-bold" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Shipping Information</Link></li>
              <li><Link to='/returns-refunds' className="d-block py-1 text-white text-decoration-none fw-bold" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
>Returns & Exchange</Link></li>
              <li><Link to='/terms-conditions' className="d-block py-1 text-white text-decoration-none fw-bold" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
>Terms & Conditions</Link></li>
              <li><Link to='/privacy-policy' className="d-block py-1 text-white text-decoration-none fw-bold" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
>Privacy Policy</Link></li>
              <li><Link to="/faq" className="d-block py-1 text-white text-decoration-none fw-bold" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
>FAQs</Link></li>
              {/* <li><Link href="#" className="d-block py-1 text-white">Contact</Link></li> */}
            </ul>
          {/* </div> */}
        </div>
      </div>

      {/* Contact Info */}
      <div className="col-md">
        <div className="mb-4">
          <h3 className="h5 text-dark">Visit Us @</h3>
          <ul className="list-unstyled text-white">
            <li><i className="bi bi-geo-alt-fill me-2 text-white fw-bold"></i><span className="text-white fw-bold">No.392 ,Thoppu street, Vadamanapakkkam, Tiruvannamalai,TamilNadu-6004402</span></li>
            <li><i className="bi bi-telephone-fill me-2 text-white fw-bold"></i><Link to="#" className="text-white text-decoration-none fw-bold">9788661093</Link></li>
            <li><i className="bi bi-envelope-fill me-2 text-white fw-bold"></i><Link href="#" className="text-white text-decoration-none fw-bold">smvilakku@gmail.com</Link></li>
          </ul>
        </div>
      </div>
    </div>

    {/* Copyright */}
    <div className="row">
      <div className="col-md-12 text-center">
        <p className="small text-white">
          &copy; {new Date().getFullYear()} All rights reserved <i className="bi bi-heart-fill text-danger"></i> <Link className="text-white" to="https://devspectra.in">DevSpectra</Link>
        </p>
      
      </div>
    </div>
  </div>
</footer>
  );
};

export default Footer;