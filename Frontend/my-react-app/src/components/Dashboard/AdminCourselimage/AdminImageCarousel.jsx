import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminImageCarousel = () => {
  const [images, setImages] = useState([]);

  const [error, setError] = useState('');

  useEffect(() => {
    // const token = localStorage.getItem('token');
    // if (!token) {
    //   console.error('❌ No token found');
    //   setError('You must be logged in as admin to view images');
    //   return;
    // }

    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/images`)
      .then(res => setImages(res.data))
      .catch(err => {
        console.error('❌ Axios error:', err.response?.data?.message || err.message);
        setError(err.response?.data?.message || 'Failed to load images');
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
        {images.map((img, index) => (
          <div key={img._id} className={`carousel-item ${index === 0 ? 'active' : ''}`} style={{minHeight:'0px'}}>
            <img
  src={`${import.meta.env.VITE_BACKEND_URL}${img.url}`}
  alt={img.title || `Slide ${index + 1}`}
  className="d-block w-100"
 style={{
  height: '70vh',
  width: '100%',
  objectFit: 'cover',
  imageRendering: 'auto', // or 'crisp-edges' for pixel art
  marginBottom: '0px',
  border: 'none',
  outline: 'none'
}}

/>



             
            
            {/* <div className="carousel-caption d-none d-md-block">
              <h5>{img.title || 'Untitled Image'}</h5>
            </div> */}
          </div>
        ))}
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