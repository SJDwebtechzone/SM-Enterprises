import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminImageUpload = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);

  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  const fetchImages = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/images`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setImages(res.data);
    } catch (err) {
      console.error('Fetch error:', err);
      // Don't show error message if just listing
    }
  };

  useEffect(() => {
    fetchImages();
  }, [token]);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return setMessage('⚠️ Please select a file');
    if (role !== 'admin') return setMessage('🛑 Only admins can upload images');

    setLoading(true);
    setMessage('');

    const formData = new FormData();
    formData.append('image', file);
    formData.append('title', title);

    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/images/upload-file`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      setMessage('✅ Image uploaded successfully!');
      setFile(null);
      setTitle('');
      // Clear input
      document.getElementById('imageInput').value = '';
      await fetchImages();
    } catch (err) {
      console.error('Upload Error Details:', err.response?.data);
      const errorMsg = err.response?.data?.message || err.message || 'Upload failed';
      setMessage(`❌ ${errorMsg}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this image?')) return;

    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/admin/images/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setImages(images.filter(img => img._id !== id));
      setMessage('🗑️ Image deleted successfully');
    } catch (err) {
      setMessage(`❌ ${err.response?.data?.message || 'Delete failed'}`);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h4 style={styles.title}>📤 Upload Image to Carousel</h4>
        <p style={styles.subtitle}>Add beautiful spiritual banners to your store homepage.</p>

        <form onSubmit={handleUpload}>
          <div className="mb-3 text-start">
            <label className="form-label fw-bold" style={{ color: '#8d6e63' }}>Choose Image File</label>
            <input
              id="imageInput"
              type="file"
              className="form-control"
              accept="image/*"
              style={styles.input}
              onChange={(e) => setFile(e.target.files[0])}
              required
            />
          </div>
          <div className="mb-4 text-start">
            <label className="form-label fw-bold" style={{ color: '#8d6e63' }}>Title (optional)</label>
            <input
              type="text"
              className="form-control"
              style={styles.input}
              placeholder="e.g. Festival Season Sale"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <button
            type="submit"
            style={styles.uploadBtn}
            disabled={loading}
          >
            {loading ? 'Uploading...' : '🌟 Upload to Gallery'}
          </button>
        </form>

        {message && (
          <div className={`alert mt-4 ${message.includes('✅') ? 'alert-success' : 'alert-danger'}`} style={styles.alert}>
            {message}
          </div>
        )}
      </div>

      <div style={styles.galleryCard}>
        <h5 style={styles.title}>🖼️ Current Carousel Gallery</h5>
        {images.length === 0 ? (
          <div className="text-muted mt-3 italic">No images uploaded yet. Begin the journey! ✨</div>
        ) : (
          <div className="row mt-4 g-4">
            {images.map(img => (
              <div key={img._id} className="col-md-4 col-sm-6">
                <div style={styles.imageCard}>
                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL}${img.url}`}
                    alt={img.title}
                    style={styles.imagePreview}
                  />
                  <div style={styles.imageInfo}>
                    <strong style={{ color: '#5d4037' }}>{img.title || 'Untitled'}</strong>
                    <button
                      style={styles.deleteBtn}
                      onClick={() => handleDelete(img._id)}
                      title="Delete Image"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  page: {
    padding: '20px',
    background: 'transparent',
    fontFamily: 'Roboto, sans-serif',
  },
  card: {
    background: '#fff3e0',
    padding: '30px',
    borderRadius: '15px',
    boxShadow: '0 4px 15px rgba(212, 175, 55, 0.1)',
    border: '1px solid #ffe0b2',
    maxWidth: '600px',
    margin: '0 auto 30px',
  },
  galleryCard: {
    background: '#fff8e1',
    padding: '30px',
    borderRadius: '15px',
    boxShadow: '0 4px 15px rgba(212, 175, 55, 0.05)',
    border: '1px solid #ffe0b2',
  },
  title: {
    fontFamily: 'Great Vibes, cursive',
    fontSize: '2rem',
    color: '#d4af37',
    marginBottom: '10px',
    textAlign: 'center',
  },
  subtitle: {
    color: '#8d6e63',
    textAlign: 'center',
    fontSize: '0.9rem',
    marginBottom: '20px',
    fontStyle: 'italic',
  },
  input: {
    borderRadius: '10px',
    border: '1px solid #ffe0b2',
    padding: '10px',
  },
  uploadBtn: {
    background: 'linear-gradient(to right, #d4af37, #ffcc80)',
    border: 'none',
    color: 'white',
    padding: '12px 30px',
    fontSize: '1.1rem',
    borderRadius: '30px',
    width: '100%',
    fontWeight: 'bold',
    cursor: 'pointer',
    boxShadow: '0 4px 10px rgba(212, 175, 55, 0.3)',
    transition: 'transform 0.2s',
  },
  alert: {
    borderRadius: '10px',
    border: 'none',
    fontWeight: '500',
  },
  imageCard: {
    background: 'white',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    border: '1px solid #ffe0b2',
    transition: 'transform 0.2s',
  },
  imagePreview: {
    width: '100%',
    height: '150px',
    objectFit: 'cover',
  },
  imageInfo: {
    padding: '12px',
    display: 'flex',
    justifyContent: 'between',
    alignItems: 'center',
    gap: '10px',
  },
  deleteBtn: {
    background: '#fee2e2',
    border: 'none',
    borderRadius: '50%',
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    marginLeft: 'auto',
    transition: 'background 0.2s',
  }
};

export default AdminImageUpload;