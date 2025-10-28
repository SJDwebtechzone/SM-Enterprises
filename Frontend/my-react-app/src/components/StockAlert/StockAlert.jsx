import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, ListGroup, Badge } from 'react-bootstrap';

const StockAlerts = () => {
  const [lowStock, setLowStock] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/bestandstock/lowstock`)
      .then(res => setLowStock(res.data))
      .catch(err => console.error('Failed to fetch low stock items:', err));
  }, []);

  return (
    <Card className="mb-4 shadow-sm">
      <Card.Header>⚠️ Low Stock Alerts</Card.Header>
      <ListGroup variant="flush">
        {lowStock.map(p => (
          <ListGroup.Item key={p._id}>
            {p.name}
            <Badge bg="danger" className="float-end">
              {p.stock} Available
            </Badge>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Card>
  );
};

export default StockAlerts;