import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');
 

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/orderhistory/history`, {
    headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
    }
    })
    .then(res => setOrders(res.data))
    .catch(err => {
      console.error('❌ Fetch error:', err.message);
      setError('Failed to load order history');
    });
  }, []);

  if (error) return <div className="alert alert-danger mt-3">{error}</div>;
  if (orders.length === 0) return <div className="alert alert-info mt-3">No orders yet</div>;

  return (
    <div className="container mt-4">
      <h3 className="mb-4 text-center text-primary">🧾 Your Order History</h3>
      <div className="row gy-3">
        {orders.map(order => (
          <div key={order._id} className="col-md-6">
            <div className="card shadow-sm border-primary">
              <div className="card-header bg-light">
                <strong>Order ID:</strong> {order.orderId}
              </div>
              <div className="card-body">
                <ul className="list-group mb-2">
                  {order.items.map((item, idx) => (
                    <li key={idx} className="list-group-item d-flex justify-content-between">
                      <span>{item.name} × {item.quantity}</span>
                      {/* <span>₹{item.price}</span> */}
                    </li>
                  ))}
                </ul>
                <p><strong>Total:</strong> ₹{order.total}</p>
                <p><strong>Status:</strong> <span className="badge bg-success">{order.status}</span></p>
                <p className="text-muted"><small>{new Date(order.createdAt).toLocaleString()}</small></p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;