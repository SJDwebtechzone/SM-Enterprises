import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col, Table } from 'react-bootstrap';
import '../../../assets/css/css/ProductManager.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const ProductManager = () => {
  const [formData, setFormData] = useState({
    name: '', price: '', originalPrice: '', discount: '', sale: '',
    category: '', subcategory: '', sku: '', offers: '',
    material: '', dimensions: '', about: '', image: null,sizes: '', stock: ''

  });
const [categories, setCategories] = useState([]);
  // const [categories, setCategories] = useState([
  //   { name: "Brass Bell" },
  //   { name: "Hundi" },
  //   { name: "Electric Bell" },
  //   { name: "Steel Vilakku" },
  //   { name: "Kalasam" }
  // ]);

  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [previewImage, setPreviewImage] = useState('');

useEffect(() => {
  fetchProducts();
  fetchCategories(); // ✅ fetch categories dynamically
}, []);

const fetchCategories = async () => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/categories`);
    setCategories(res.data || []);
    
  } catch (err) {
    console.error('Category fetch failed:', err);
  }
};

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products`);
      setProducts(res.data || []);
    } catch (err) {
      console.error('Fetch failed:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({ ...prev, image: file }));
    setPreviewImage('');
  };

//   const handleSubmit = async (e) => {
//   e.preventDefault();
//   const data = new FormData();

//   Object.entries(formData).forEach(([key, value]) => {
//     if (key === 'offers') {
//       data.append('offers', JSON.stringify(value.split('\n')));
//     } else if (key === 'image' && value) {
//       data.append('image', value);
//     } else if (key !== 'sizes' && key !== 'stock') {
//       data.append(key, value); // ✅ skip sizes and stock here
//     }
//   });

//   data.append('details', JSON.stringify({
//     Material: formData.material,
//     Dimensions: formData.dimensions,
//     About: formData.about
//   }));

//   data.append('sizes', JSON.stringify(formData.sizes.split(',').map(s => s.trim())));
//   data.append('stock', formData.stock);
// // formData.append('stock', stock); // ✅ add stock
// // formData.append('sizes', JSON.stringify(sizes));

//     try {
//       if (editingId) {
//         await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/products/${editingId}`, data);
//         setMessage('Product updated successfully!');
//       } else {
//         await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/products/upload`, data);
//         setMessage('Product added successfully!');
//       }

//       setFormData({
//         name: '', price: '', originalPrice: '', discount: '', sale: '',
//         category: '', subcategory: '', sku: '', offers: '',
//         material: '', dimensions: '', about: '', image: null
//       });
//       setEditingId(null);
//       setPreviewImage('');
//       fetchProducts();
//     } catch (err) {
//       console.error('Save failed:', err);
//       setMessage('Failed to save product');
//     }
//   };
const handleSubmit = async (e) => {
  e.preventDefault();
  const data = new FormData();

  // ✅ Only append fields that are safe
  Object.entries(formData).forEach(([key, value]) => {
    if (key === 'offers') {
      data.append('offers', JSON.stringify(value.split('\n')));
    } else if (key === 'image' && value) {
      data.append('image', value);
    } else if (!['sizes', 'stock', 'material', 'dimensions', 'about'].includes(key)) {
      data.append(key, value);
    }
  });

  // ✅ Append structured fields separately
  data.append('details', JSON.stringify({
    Material: formData.material,
    Dimensions: formData.dimensions,
    About: formData.about
  }));

  data.append('sizes', JSON.stringify(formData.sizes.split(',').map(s => s.trim())));
  data.append('stock', formData.stock);

  try {
    if (editingId) {
      await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/products/${editingId}`, data);
      setMessage('Product updated successfully!');
    } else {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/products/upload`, data);
      setMessage('Product added successfully!');
    }

    setFormData({
      name: '', price: '', originalPrice: '', discount: '', sale: '',
      category: '', subcategory: '', sku: '', offers: '',
      material: '', dimensions: '', about: '', image: null, sizes: '', stock: ''
    });
    setEditingId(null);
    setPreviewImage('');
    fetchProducts();
  } catch (err) {
    console.error('Save failed:', err);
    setMessage(err.response?.data?.error || 'Failed to save product');
  }
};

  const handleEdit = (product) => {
    setEditingId(product._id);
    setFormData({
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      discount: product.discount,
      sale: product.sale,
      category: product.category,
      sizes: (product.sizes || []).join(', '),
      stock: product.stock ?? '',
      subcategory: product.subcategory || '',
      sku: product.sku,
      offers: (product.offers || []).join('\n'),
      material: product.details?.Material || '',
      dimensions: product.details?.Dimensions || '',
      about: product.details?.About || '',
      image: null
    });
    setPreviewImage(product.image?.startsWith('http') ? product.image : `${import.meta.env.VITE_BACKEND_URL}${product.image}`);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`);
      setMessage('Product deleted');
      fetchProducts();
    } catch (err) {
      console.error('Delete failed:', err);
      setMessage('Failed to delete product');
    }
  };

  return (
    <Container className="mt-4">
      <div className="product-form">
        <h3>{editingId ? 'Edit Product' : 'Add New Product'}</h3>
        <Form onSubmit={handleSubmit} encType="multipart/form-data">
          <Row>
            <Col md={6}>
              <Form.Group className="mb-2">
                <Form.Label>Name</Form.Label>
                <Form.Control name="name" value={formData.name} onChange={handleChange} required />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Price</Form.Label>
                <Form.Control type="number" name="price" value={formData.price} onChange={handleChange} required />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Original Price</Form.Label>
                <Form.Control type="number" name="originalPrice" value={formData.originalPrice} onChange={handleChange} />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Discount</Form.Label>
                <Form.Control name="discount" value={formData.discount} onChange={handleChange} />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Sale Price</Form.Label>
                <Form.Control type="number" name="sale" value={formData.sale} onChange={handleChange} />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>SKU</Form.Label>
                <Form.Control name="sku" value={formData.sku} onChange={handleChange} />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Sizes (comma-separated)</Form.Label>
                <Form.Control
                  name="sizes"
                  value={formData.sizes}
                  onChange={handleChange}
                  placeholder="e.g. S, M, L"
                />
              </Form.Group>


            </Col>

            <Col md={6}>
            <Form.Group className="mb-2">
                <Form.Label>Stock Quantity</Form.Label>
                <Form.Control
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  placeholder="e.g. 50"
                />
              </Form.Group>
              <Form.Group className="mb-2">
                 <Form.Label>Category</Form.Label>
               <Form.Select name="category" value={formData.category} onChange={handleChange} required>
                <option value="">-- Select Category --</option>
                {categories.map(cat => (
                  <option key={cat._id} value={cat._id}>{cat.name}</option>
                ))}
              </Form.Select>

              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Subcategory</Form.Label>
                <Form.Control name="subcategory" value={formData.subcategory} onChange={handleChange} placeholder="Enter subcategory" />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Image</Form.Label>
                <Form.Control type="file" name="image" accept="image/*" onChange={handleImageChange} />
              </Form.Group>
              
              {previewImage && (
                <div className="mb-2">
                  <Form.Label>Current Image</Form.Label>
                  <img
                    src={previewImage}
                    alt="Preview"
                    style={{ width: '100px', height: 'auto', borderRadius: '6px' }}
                    onError={(e) => { e.target.src = '/default.jpg'; }}
                  />
                </div>
              )}
              <Form.Group className="mb-2">
                <Form.Label>Offers (one per line)</Form.Label>
                <Form.Control as="textarea" rows={2} name="offers" value={formData.offers} onChange={handleChange} />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Material</Form.Label>
                <Form.Control name="material" value={formData.material} onChange={handleChange} />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Dimensions</Form.Label>
                <Form.Control name="dimensions" value={formData.dimensions} onChange={handleChange} />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>About</Form.Label>
                <Form.Control as="textarea" rows={2} name="about" value={formData.about} onChange={handleChange} />
              </Form.Group>
              <Button type="submit" variant={editingId ? 'warning' : 'primary'} className="w-100 mt-2">
                {editingId ? 'Update Product' : 'Add Product'}
              </Button>
            </Col>
          </Row>
        </Form>
      </div>

      {message && <div className="alert alert-info mt-3">{message}</div>}

      <h4 className="mt-5">All Products</h4>
      <div style={{ overflowX: 'auto' }}>

      <Table striped bordered hover responsive="sm" className="product-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Subcategory</th>
            <th>Price</th>
            <th>Sale</th>
            <th>Discount</th>
            <th>SKU</th>
            <th>Sizes</th>    
            <th>Stock</th>     
            <th>Sold</th>      
            <th>Offers</th>
            <th>Material</th>
            <th>Dimensions</th>
            <th>About</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(prod => (
            <tr key={prod._id}>
              <td>{prod.name}</td>
              <td>{prod.category?.name || 'Uncategorized'}</td> 
              <td>{prod.subcategory || '-'}</td>
              <td>₹{prod.price}</td>
              <td>₹{prod.sale}</td>
              <td>{prod.discount}</td>
              <td>{prod.sku}</td>
              <td>{(prod.sizes || []).join(', ')}</td>
              <td>{prod.stock ?? 0}</td>
              <td>{prod.sold ?? 0}</td>
              <td>
                <ul style={{ paddingLeft: '1rem' }}>
                  {(prod.offers || []).map((offer, idx) => (
                    <li key={idx}>{offer}</li>
                  ))}
                </ul>
              </td>
              <td>{prod.details?.Material}</td>
              <td>{prod.details?.Dimensions}</td>
              <td>{prod.details?.About}</td>
              <td>
                <img
                  src={prod.image?.startsWith('http') ? prod.image : `http://localhost:5000${prod.image}`}
                  alt={prod.name}
                  style={{ width: '80px', height: 'auto', borderRadius: '6px' }}
                  onError={(e) => { e.target.src = '/default.jpg'; }}
                />
              </td>
              <td>
                {/* <Button variant="warning" size="sm" onClick={() => handleEdit(prod)} className="me-2">
                  Edit
                </Button>
                <Button variant="danger" size="sm" onClick={() => handleDelete(prod._id)}>
                  Delete
                </Button> */}
                <FontAwesomeIcon
  icon={faEdit}
  className="action-icon edit-icon me-3"
  onClick={() => handleEdit(prod)}
/>
<FontAwesomeIcon
  icon={faTrash}
  className="action-icon delete-icon"
  onClick={() => handleDelete(prod._id)}
/>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      </div>
    </Container>
  );
};

export default ProductManager;