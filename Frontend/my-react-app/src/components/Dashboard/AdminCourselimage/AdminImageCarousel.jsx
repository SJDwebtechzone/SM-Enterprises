import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
    <div id="adminCarousel" className="carousel slide mt-0" data-bs-ride="carousel" data-bs-interval="3000"
 style={{ overflow: 'hidden' }} >
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
        {images && images.length > 0 ? images.map((img, index) => (
          <div key={img._id} className={`carousel-item ${index === 0 ? 'active' : ''}`} style={{minHeight:'0px'}}>
            <img
  src={`${import.meta.env.VITE_BACKEND_URL}${img.url}`}
  alt={img.title || `Slide ${index + 1}`}
  className="d-block w-100"
 style={{
  height: '70vh',
  width: '100%',
  objectFit: 'cover',
  imageRendering: 'auto',
  marginBottom: '0px',
  border: 'none',
  outline: 'none'
}}

/>
          </div>
        )) : (
          <div className="carousel-item active">
            <div className="d-flex justify-content-center align-items-center" style={{height: '70vh', backgroundColor: '#f8f9fa'}}>
              <p className="text-muted">No images available</p>
            </div>
          </div>
        )}
      </div>

      {/* <button className="carousel-control-prev" type="button" data-bs-target="#adminCarousel" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>

      <button className="carousel-control-next" type="button" data-bs-target="#adminCarousel" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button> */}
    </div>
  );
};

export default AdminImageCarousel;