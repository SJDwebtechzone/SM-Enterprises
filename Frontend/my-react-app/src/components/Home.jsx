import React from 'react';
import '../assets/css/css/HomeSlide.css'; // Optional for custom styles
import GanapathyImage from '../assets/images/Ganapathy_122.jpg';
import Ganapathy_sticks from '../assets/images/bg_133.png'
import diya1 from '../assets/images/diya1.jpg';
import sticks from '../assets/images/Sticks.png';
import product1 from '../assets/images/product-1.jpg';
import product2 from '../assets/images/product-2.jpg';
import product3 from '../assets/images/product-3.jpg';
import product4 from '../assets/images/product-4.jpg';
import product5 from '../assets/images/product-5.jpg';
import product6 from '../assets/images/product-6.jpg';
import product7 from '../assets/images/product-7.jpg';
import product8 from '../assets/images/product-8.jpg';

// import '@fortawesome/fontawesome-free/css/all.min.css';
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";

import { Link } from 'react-router-dom';


const Home = () => {
  {/* Product data */}
const products = [
  { name: ' Steel Vilakku', price: '$120.00', sale: '$80.00', image: diya1, discount: '30%' },
  { name: ' Steel Vilakku', price: '$120.00', sale: '$80.00', image: diya1, discount: '30%' },
  { name: ' Steel Vilakku', price: '$120.00', sale: '$80.00', image: diya1, discount: '30%' },
  { name: ' Steel Vilakku', price: '$120.00', sale: '$80.00', image: diya1, discount: '30%' },
  { name: ' Steel Vilakku', price: '$120.00', sale: '$80.00', image: diya1, discount: '30%' },
  { name: ' Steel Vilakku', price: '$120.00', sale: '$80.00', image: diya1, discount: '30%' },
  { name: ' Steel Vilakku', price: '$120.00', sale: '$80.00', image: diya1, discount: '30%' },
  { name: ' Steel Vilakku', price: '$120.00', sale: '$80.00', image: diya1, discount: '30%' },

];
const categories = [
  { name: "e-Puja Service", img:diya1 },
  // { name: "Aarti Diya", img: "../../assets/images/diya.jpg" },
  // { name: "God Statue", img: "/images/statue.jpg" },
  // { name: "Ganesh Chaturthi", img: "/images/ganesh.jpg" },
  // { name: "Jap Mala", img: "/images/mala.jpg" },
  // { name: "Shankh", img: "/images/shankh.jpg" },
];




  
  return (
    <>
   
   <section id="home-section" className="hero">
  <div
    id="heroCarousel"
    className="carousel slide"
    data-bs-ride="carousel"
    data-bs-interval="5000"
  >
    <div className="carousel-inner">

      {/* Slide 1 */}
      <div
        className="carousel-item custom-control active"
        style={{
        backgroundImage: `url(${GanapathyImage})`,
        minHeight: '100vh',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        }}

      >
        <div className="overlay"></div>
        <div className="container-fluid h-100">
          <div className="row justify-content-center align-items-center h-100">
            <div className="col-md-12 d-flex flex-column justify-content-end align-items-center text-center mb-4">
              <h1 className="mb-2" style={{ fontFamily:'cursive',fontWeight:'600px',fontSize: '2.0rem', color: 'white' }}>
                Experience the fragrance of devotion and the glow of purity in every ritual
              </h1>
              <h2 className="subheading mb-4" style={{ fontSize: '2rem', color: 'white' }}>
                Traditions preserved, devotion delivered
              </h2>
              <p>
                {/* <Link
                  href="#"
                  className="btn btn-primary"
                  style={{ fontSize: '1.3rem', padding: '0.7rem 2.5rem',backgroundColor:'#ffc107' }}
                >
                  View Details
                </Link> */}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Slide 2 */}
      <div
        className="carousel-item"
        style={{
  backgroundImage: `url(${Ganapathy_sticks})`,
  height: '100vh',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    width: '100%',

  // backgroundPosition: 'top center', // or 'center top', 'center bottom'
}}

      >
        <div className="overlay"></div>
        <div className="container-fluid h-100">
          <div className="row justify-content-center align-items-center h-100">
            <div className="col-md-12 d-flex flex-column justify-content-end align-items-center text-center mb-4">
              <h1 className="mb-2" style={{ fontFamily:'cursive',fontWeight:'600px',fontSize: '2.0rem', color: 'white' }}>
                Experience the fragrance of devotion and the glow of purity in every ritual
              </h1>
              <h2 className="subheading mb-4" style={{ fontFamily:'cursive',fontSize: '2rem', color: 'white' }}>
                Traditions preserved, devotion delivered
              </h2>
              <p>
                {/* <Link
                  href="#"
                  className="btn btn-primary"
                  style={{ fontSize: '1.3rem', padding: '0.7rem 2.5rem',backgroundColor:'#ffc107' }}
                >
                  View Details
                </Link> */}
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>

    {/* Carousel Controls */}
    <button
      className="carousel-control-prev"
      type="button"
      data-bs-target="#heroCarousel"
      data-bs-slide="prev"
    >
      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    </button>
    <button
      className="carousel-control-next"
      type="button"
      data-bs-target="#heroCarousel"
      data-bs-slide="next"
    >
      <span className="carousel-control-next-icon" aria-hidden="true"></span>
    </button>
  </div>
</section>


{/* <div className="p-6 bg-[#fdfbf6]">
      <h1 className="text-2xl font-bold text-center mb-6">Our Categories</h1>
      <Swiper
        modules={[Navigation]}
        navigation={true}
        spaceBetween={30}
        slidesPerView={4}
        loop={true}
        className="pb-10"
      >
        {categories.map((cat, index) => (
          <SwiperSlide key={index} className="text-center">
            <img
              src={cat.img}
              alt={cat.name}
              className="w-[150px] h-[150px] rounded-full object-cover border-2 border-dashed border-gray-400 p-2 bg-white mx-auto"
            />
            <p className="mt-3 font-semibold">{cat.name}</p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>


 */}


      {/* Services Section */}
      <section className="ftco-section">
  <div className="container">
    <div className="row g-0 ftco-services">
      {[
        {
          iconClass: 'bi bi-truck',
          title: 'Free Shipping',
          subtitle: 'On order over Rs.500',
          bgColor: 'bg-color-1 active',
        },
        {
          iconClass: 'bi bi-shield-check',
          title: 'Delivery Status',
          subtitle: '3-5 Business days delivery & Free Returns',
          bgColor: 'bg-color-2',
        },
        {
          iconClass: 'bi bi-award',
          title: 'Superior Quality',
          subtitle: 'Quality Products',
          bgColor: 'bg-color-3',
        },
        {
          iconClass: 'bi bi-chat-dots',
          title: 'Support',
          subtitle: '24/7 Support',
          bgColor: 'bg-color-4',
        },
      ].map((service, index) => (
        <div key={index} className="col-md-3 d-flex align-items-stretch">
          <div className="media block-6 services text-center p-4 w-100">
            <div className={`icon ${service.bgColor} d-flex justify-content-center align-items-center mx-auto mb-3`}>
              <i className={service.iconClass} style={{ fontSize: '36px', color: '#785050ff' }}></i>
            </div>
            <div className="media-body">
              <h3 className="heading mb-2 " style={{color:'#a91b5bff'}}>{service.title}</h3>
              <span>{service.subtitle}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
      {/* Product Sections */}
       

    <section className="py-5">
      <div className="container">
        <div className="row justify-content-center mb-4">
          <div className="col-md-12 text-center">
            <span className="text-muted">Featured Products</span>
            <h2 className="mb-3 " style={{color:'#a91b5bff'}}>Our Products</h2>
            <p className="text-secondary">
              Far far away, behind the word mountains, far from the countries Vokalia and Consonantia
            </p>
          </div>
        </div>

        <div className="row">
          {products.map((product, index) => (
            <div key={index} className="col-md-6 col-lg-3 mb-4">
              <div className="card h-100 shadow-sm border-0">
                <div className="position-relative">
                  <img src={product.image} alt={product.name} 
                   className="card-img-top product-img"
                   
/>
                  {product.discount && (
                    <span className="badge bg-danger position-absolute top-0 start-0 m-2">{product.discount}</span>
                  )}
                  <div className="overlay"></div>
                </div>
                <div className="card-body text-center">
                  <h5 className="card-title" style={{color:'#a91b5bff'}}>{product.name}</h5>
                  <div className="pricing">
                    {product.sale ? (
                      <p className="mb-2">
                        <span className="text-muted text-decoration-line-through me-2">{product.price}</span>
                        <span className="text-success fw-bold">{product.sale}</span>
                      </p>
                    ) : (
                      <p className="mb-2 fw-bold">{product.price}</p>
                    )}
                  </div>
                  <div className="d-flex justify-content-center gap-2">
                    <button className="btn btn-outline-secondary btn-sm">
                      <i className="bi bi-list"></i>
                    </button>
                    <button className="btn btn-outline-primary btn-sm">
                      <i className="bi bi-cart"></i>
                    </button>
                    <button className="btn btn-outline-danger btn-sm">
                      <i className="bi bi-heart"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  
    

      </>
    );
    
};

export default Home;