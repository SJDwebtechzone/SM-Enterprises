import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Table, Alert, Image } from 'react-bootstrap';

const CategoryManager = () => {
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/categories`);
      setCategories(res.data || []);
    } catch (err) {
      console.error('Fetch failed:', err);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', name);
      if (image) formData.append('image', image);

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/categories/add`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      setMessage(res.data.message || 'Category added');
      setName('');
      setImage(null);
      fetchCategories();
    } catch (err) {
      console.error('Add failed:', err);
      setMessage('Failed to add category');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this category?')) return;
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/categories/${id}`);
      setMessage('Category deleted');
      fetchCategories();
    } catch (err) {
      console.error('Delete failed:', err);
      setMessage('Failed to delete category');
    }
  };

  return (
    <div className="mt-4">
      <h4>Category Manager</h4>
      <Form onSubmit={handleAdd} encType="multipart/form-data">
        <Form.Group className="mb-2">
          <Form.Label>New Category Name</Form.Label>
          <Form.Control
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Category Image</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </Form.Group>

        <Button type="submit" variant="primary">Add Category</Button>
      </Form>

      {message && <Alert variant="info" className="mt-3">{message}</Alert>}

      <Table striped bordered hover responsive className="mt-4">
        <thead>
          <tr>
            <th>Name</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(cat => (
            <tr key={cat._id}>
              <td>{cat.name}</td>
              <td>
                {cat.image && (
                  <Image
                    src={`${import.meta.env.VITE_BACKEND_URL}${cat.image}`}
                    alt={cat.name}
                    thumbnail
                    style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                  />
                )}
              </td>
              <td>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => handleDelete(cat._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default CategoryManager;