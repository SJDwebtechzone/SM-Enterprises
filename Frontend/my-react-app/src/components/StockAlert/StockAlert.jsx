import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, ListGroup, Badge } from 'react-bootstrap';

const StockAlerts = () => {
  const [lowStock, setLowStock] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/bestandstock/lowstock`)
      .then(res => setLowStock(Array.isArray(res.data) ? res.data : []))
      .catch(err => {
        console.error('Failed to fetch low stock items:', err);
        setLowStock([]);
      });
  }, []);

  return (
    <Card className="mb-4 shadow-sm">
      <Card.Header>⚠️ Low Stock Alerts</Card.Header>
      <ListGroup variant="flush">
        {Array.isArray(lowStock) && lowStock.map(p => (
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