import Footer from "../Footer";
import Header from "../Header";
import bgImage from '../../assets/images/reachus1.jpg'
import ContactSection from "./contactSection";

const Contact=()=>{
    return(<>
    <Header/>
    <div
                  className="hero-wrap hero-bread d-flex align-items-center justify-content-center text-center"
                  style={{
                    backgroundImage: `url(${bgImage})`,
                    backgroundSize: 'cover', 
                    backgroundPosition: 'center',
                    height: '60vh' 
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
                <h1 className="mb-0 bread text-light mt-1">Contact us</h1>
              </div>
            </div>
          </div>
        </div>
    <ContactSection/>
    <Footer/>
    </>)
}
export default Contact;
