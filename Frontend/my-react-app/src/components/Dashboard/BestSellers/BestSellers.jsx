import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, ListGroup, Image } from 'react-bootstrap';

const BestSellers = () => {
  const [topProducts, setTopProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/bestandstock/bestsellers`)
      .then(res => setTopProducts(res.data))
      .catch(err => console.error('Failed to fetch bestsellers:', err));
  }, []);

  return (
    <Card className="mb-4 shadow-sm">
      <Card.Header>🔥 Best-Selling Products</Card.Header>
      <ListGroup variant="flush">
        {topProducts.map(p => (
          <ListGroup.Item key={p.productId} className="d-flex align-items-center">
            <Image
              src={`${import.meta.env.VITE_BACKEND_URL}${p.image}`}
              alt={p.name}
              rounded
              style={{ width: '50px', height: 'auto', marginRight: '12px' }}
              onError={(e) => { e.target.src = '/default.jpg'; }}
            />
            <div>
              <strong>{p.name}</strong><br />
              ₹{p.sale} — <span style={{ color: 'green' }}>{p.totalSold} sold</span>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Card>
  );
};

export default BestSellers;