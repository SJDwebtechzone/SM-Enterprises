import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminImageUpload = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [images, setImages] = useState([]);

  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  // 🔁 Reusable fetch function
  const fetchImages = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/images`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setImages(res.data);
    } catch (err) {
      setMessage('❌ Failed to load images');
    }
  };

  // 🔄 Load images on mount
  useEffect(() => {
    fetchImages();
  }, [token]);

  // 📤 Handle image upload
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return setMessage('Please select a file');
    if (role !== 'admin') return setMessage('Only admins can upload images');

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
      setMessage('✅ Image uploaded successfully');
      setFile(null);
      setTitle('');
      await fetchImages(); // 🔄 Refresh image list
    } catch (err) {
      setMessage(err.response?.data?.message || '❌ Upload failed');
    }
  };

  // 🗑️ Handle image deletion
  const handleDelete = async (id) => {
    if (role !== 'admin') return setMessage('Only admins can delete images');

    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/admin/images/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setImages(images.filter(img => img._id !== id));
      setMessage('🗑️ Image deleted successfully');
    } catch (err) {
      setMessage(err.response?.data?.message || '❌ Delete failed');
    }
  };

  return (
    <div className="container mt-4">
      <h4>📤 Upload Image to Carousel</h4>
      <form onSubmit={handleUpload}>
        <div className="mb-3">
          <label className="form-label">Choose Image File</label>
          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Title (optional)</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-warning">Upload</button>
      </form>

      {message && <div className="alert alert-info mt-3">{message}</div>}

      <hr />
      <h5>🖼️ Uploaded Images</h5>
      {images.length === 0 ? (
        <div className="alert alert-secondary">No images uploaded yet</div>
      ) : (
        <ul className="list-group">
          {images.map(img => (
            <li key={img._id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <strong>{img.title || 'Untitled'}</strong>
                <br />
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}${img.url}`}
                  alt={img.title}
                  style={{ maxHeight: '80px', marginTop: '5px', borderRadius: '4px' }}
                />
              </div>
              <button className="btn btn-danger btn-sm" onClick={() => handleDelete(img._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminImageUpload;