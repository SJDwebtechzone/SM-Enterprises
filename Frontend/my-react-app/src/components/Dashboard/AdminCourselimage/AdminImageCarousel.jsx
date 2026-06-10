import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AdminImageCarousel = () => {
  const [images, setImages] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/images`)
      .then(res => {
        // Check if response data is an array
        if (!res.data || !Array.isArray(res.data)) {
          console.error('Invalid images data format:', res.data);
          setImages([]);
          return;
        }
        setImages(res.data);
      })
      .catch(err => {
        console.error('❌ Axios error:', err.response?.data?.message || err.message);
        setError(err.response?.data?.message || 'Failed to load images');
        setImages([]); // Prevent crashes
      });
  }, []);

  if (error) {
    return <div className="alert alert-danger mt-3">{error}</div>;
  }

  if (images.length === 0) {
    return <div className="alert alert-info mt-3">No images uploaded yet</div>;
  }

  return (
    <>
    <style>
      {`
        #adminCarousel {
          margin: 0;
          padding: 0;
          position: relative;
        }
        
        #adminCarousel .carousel-indicators {
          display: none !important;
        }
        
        #adminCarousel .carousel-item {
          height: auto;
          min-height: auto !important;
          position: relative;
        }
        
        #adminCarousel .carousel-banner-img {
          width: 100%;
          height: auto;
          display: block;
        }
        
        @media (min-width: 768px) {
          #adminCarousel .carousel-item {
            height: 500px;
          }
          
          #adminCarousel .carousel-banner-img {
            height: 100%;
            object-fit: cover;
          }
        }

        #adminCarousel .banner-quote-container {
          background-color: transparent;
          padding: 0;
          max-width: 50%;
          border: none;
          box-shadow: none;
          display: block;
          margin-left: 8%;
          margin-right: auto;
          text-align: left;
        }

        #adminCarousel .banner-quote {
          font-family: 'Great Vibes', cursive, serif;
          font-size: 3.2rem;
          color: #ffd54f !important;
          line-height: 1.25;
          margin: 0;
          font-weight: 500;
          text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.75), -1px -1px 3px rgba(0, 0, 0, 0.5);
        }

        #adminCarousel .banner-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(135deg, #c9a44a, #8b6914);
          border: none;
          color: #ffffff !important;
          padding: 8px 24px;
          border-radius: 25px;
          font-family: 'Roboto', sans-serif;
          font-size: 0.9rem;
          font-weight: bold;
          text-decoration: none;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
          transition: all 0.2s ease;
        }

        #adminCarousel .banner-btn:hover {
          background: linear-gradient(135deg, #d8b860, #a07d1c);
          transform: translateY(-2px);
          box-shadow: 0 6px 14px rgba(0, 0, 0, 0.4);
        }

        @media (max-width: 768px) {
          #adminCarousel .banner-quote-container {
            max-width: 55%;
            margin-left: 6%;
            background-color: transparent;
            box-shadow: none;
          }
          #adminCarousel .banner-quote {
            font-size: 1.05rem !important;
            text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.85), -1px -1px 2px rgba(0, 0, 0, 0.6);
            line-height: 1.2;
          }
          #adminCarousel .banner-btn {
            font-size: 0.7rem !important;
            padding: 5px 14px !important;
            margin-top: 6px !important;
            border-radius: 15px !important;
            gap: 4px !important;
          }
        }

        @media (max-width: 480px) {
          #adminCarousel .banner-quote-container {
            max-width: 60%;
            margin-left: 5%;
          }
          #adminCarousel .banner-quote {
            font-size: 0.85rem !important;
            line-height: 1.15;
          }
          #adminCarousel .banner-btn {
            font-size: 0.6rem !important;
            padding: 3px 10px !important;
            margin-top: 4px !important;
            border-radius: 12px !important;
            gap: 3px !important;
          }
        }

        @keyframes slideInFromLeft {
          0% {
            opacity: 0;
            transform: translateX(-80px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        #adminCarousel .initial-slide-in {
          animation: slideInFromLeft 1.4s cubic-bezier(0.19, 1, 0.22, 1) forwards;
        }

        #adminCarousel .soul-ego-text {
          display: block;
          font-size: 2.5rem;
          text-transform: none;
          line-height: 1.2;
        }

        @media (max-width: 768px) {
          #adminCarousel .soul-ego-text {
            font-size: 1.15rem !important;
          }
          #adminCarousel .ornament-line {
            max-width: 180px !important;
            margin-bottom: 8px !important;
            margin-top: 8px !important;
          }
          #adminCarousel .ornament-icon {
            font-size: 12px !important;
          }
        }

        @media (max-width: 480px) {
          #adminCarousel .soul-ego-text {
            font-size: 0.9rem !important;
          }
          #adminCarousel .ornament-line {
            max-width: 120px !important;
            margin-bottom: 4px !important;
            margin-top: 4px !important;
          }
          #adminCarousel .ornament-icon {
            font-size: 10px !important;
          }
        }
      `}
    </style>
    <div id="adminCarousel" className="carousel slide carousel-fade">
        <div className="carousel-indicators">
    {images.map((_, index) => (
      <button
        key={index}
        type="button"
        className={index === currentSlide ? 'active' : ''}
        aria-current={index === currentSlide ? 'true' : undefined}
        aria-label={`Slide ${index + 1}`}
        onClick={() => setCurrentSlide(index)}
      ></button>
    ))}
  </div>

      <div className="carousel-inner">
        {images && images.length > 0 ? images.map((img, index) => {
          const formatTitle = (title) => {
            if (!title) return '';
            const normalized = title.trim();
            if (normalized.toLowerCase().includes("the soul knows the way") || normalized.toLowerCase().includes("ego just blocks")) {
              return (
                <>
                  {/* Decorative Ornament at the top */}
                  <div className="d-flex align-items-center mb-3 ornament-line" style={{ width: '100%', maxWidth: '350px' }}>
                    <div style={{ flexGrow: 1, height: '1.5px', background: 'linear-gradient(to right, transparent, #c9a44a)' }}></div>
                    <span className="ornament-icon" style={{ color: '#c9a44a', margin: '0 8px', fontSize: '16px', display: 'inline-flex', alignItems: 'center' }}>⚜</span>
                    <div style={{ flexGrow: 1, height: '1.5px', background: 'linear-gradient(to left, transparent, #c9a44a)' }}></div>
                  </div>
                  
                  <span className="soul-ego-text">
                    The <span style={{ color: '#ffd54f', fontWeight: 'bold' }}>soul</span> knows the way,
                  </span>
                  <span className="soul-ego-text">
                    the <span style={{ color: '#ffd54f', fontWeight: 'bold' }}>ego</span> just blocks the view.
                  </span>


                </>
              );
            }
            if (normalized.includes(';')) {
              const parts = normalized.split(';');
              return (
                <>
                  {parts[0]}; <br />
                  {parts.slice(1).join(';')}
                </>
              );
            }
            return normalized;
          };

          return (
            <div key={img._id} className={`carousel-item ${index === currentSlide ? 'active' : ''}`}>
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}${img.url}`}
                alt={img.title || `Slide ${index + 1}`}
                className="d-block w-100 carousel-banner-img"
              />
              {img.title && (
                <div className="carousel-caption d-flex flex-column justify-content-center align-items-start h-100" style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0,
                  zIndex: 2,
                  padding: '0'
                }}>
                  <div className={`banner-quote-container ${index === currentSlide ? 'initial-slide-in' : ''}`}>
                    <h2 className="banner-quote">
                      {formatTitle(img.title)}
                    </h2>
                    <Link to="/products" className="banner-btn">
                      Explore Now <i className="bi bi-chevron-right" style={{ fontSize: '0.85rem' }}></i>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          );
        }) : (
          <div className="carousel-item active">
            <div className="d-flex justify-content-center align-items-center" style={{height: '70vh', backgroundColor: '#f8f9fa'}}>
              <p className="text-muted">No images available</p>
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default AdminImageCarousel;