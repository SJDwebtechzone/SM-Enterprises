import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AdminImageCarousel = () => {
  const [images, setImages] = useState([]);

  const [error, setError] = useState('');

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
        
        #adminCarousel .carousel-item {
          height: auto;
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
          display: inline-block;
          margin-top: 15px;
          background-color: #691a24;
          color: #ffffff !important;
          font-family: 'Roboto', sans-serif;
          font-size: 1rem;
          font-weight: 500;
          padding: 10px 24px;
          border-radius: 6px;
          text-decoration: none;
          transition: all 0.2s ease;
          border: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
        }

        #adminCarousel .banner-btn:hover {
          background-color: #80202d;
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
          #adminCarousel .banner-quote span {
            white-space: nowrap;
            display: block;
          }
          #adminCarousel .banner-btn {
            font-size: 0.7rem !important;
            padding: 5px 12px;
            margin-top: 6px;
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
            padding: 3px 8px;
            margin-top: 4px;
          }
        }
      `},StartLine:112,TargetContent:}
    </style>
    <div id="adminCarousel" className="carousel slide" data-bs-ride="carousel" data-bs-interval="3000">
        <div className="carousel-indicators">
    {images.map((_, index) => (
      <button
        key={index}
        type="button"
        data-bs-target="#adminCarousel"
        data-bs-slide-to={index}
        className={index === 0 ? 'active' : ''}
        aria-current={index === 0 ? 'true' : undefined}
        aria-label={`Slide ${index + 1}`}
      ></button>
    ))}
  </div>

      <div className="carousel-inner">
        {images && images.length > 0 ? images.map((img, index) => {
          const formatTitle = (title) => {
            if (!title) return '';
            const normalized = title.trim();
            if (normalized.includes("The soul knows the way; the ego just blocks the view.")) {
              return (
                <>
                  <span style={{ display: 'block' }}>The soul knows the way;</span>
                  <span style={{ display: 'block' }}>the ego just blocks</span>
                  <span style={{ display: 'block' }}>the view.</span>
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
            <div key={img._id} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
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
                  <div className="banner-quote-container">
                    <h2 className="banner-quote">
                      {formatTitle(img.title)}
                    </h2>
                    <Link to="/products" className="banner-btn">
                      Explore Collection
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