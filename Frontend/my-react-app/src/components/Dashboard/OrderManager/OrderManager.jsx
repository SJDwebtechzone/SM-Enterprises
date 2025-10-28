import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Form } from 'react-bootstrap';

const OrderManager = () => {
  const [orders, setOrders] = useState([]);
  console.log('AdminOrder',orders)

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/orders`);
      setOrders(res.data);
    } catch (err) {
      console.error('❌ Failed to fetch orders:', err.message);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/orders/${id}/status`, { status });
      fetchOrders();
    } catch (err) {
      console.error('❌ Failed to update status:', err.message);
    }
  };

  return (
    <div className="order-manager p-4">
      <h3>📦 Order Management</h3>
      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Items</th>
            <th>Total</th>
            <th>Status</th>
            <th>Update</th>
            <th>Invoice</th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center">No orders found.</td>
            </tr>
          ) : (
            orders.map(order => (
              <tr key={order._id}>
                <td>{order.orderId || '—'}</td>
                <td>{order.customer?.name || '—'}</td>
                <td>
                  <ul className="mb-0">
                    {(order.items || []).map((item, idx) => (
                      <li key={idx}>{item.name} × {item.quantity}</li>
                    ))}
                  </ul>
                </td>
                <td>₹{order.total || 0}</td>
                <td>{order.status || 'Pending'}</td>
                <td>
                  <Form.Select
                    value={order.status}
                    onChange={(e) => updateStatus(order._id, e.target.value)}
                    size="sm"
                  >
                    <option>Pending</option>
                    <option>Shipped</option>
                    <option>Delivered</option>
                  </Form.Select>
                </td>
                <td>
                  {order.pdfUrl ? (
                    <a href={order.pdfUrl} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline-success" size="sm">🧾 View</Button>
                    </a>
                  ) : (
                    <span className="text-muted">—</span>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default OrderManager;