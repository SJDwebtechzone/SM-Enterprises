import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Form, Modal } from 'react-bootstrap';
import InvoiceSummary from '../../paymentGateway/InvoiceSummary';

const OrderManager = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);

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

  const handleShowInvoice = (order) => {
    // Map order fields to match InvoiceSummary expectations
    const mappedInvoice = {
      invoiceId: order.orderId,
      date: new Date(order.date).toLocaleDateString('en-IN'),
      paymentId: order.paymentId,
      total: order.total,
      customer: order.customer,
      items: order.items,
      pdfUrl: order.pdfUrl
    };
    setSelectedOrder(mappedInvoice);
    setShowModal(true);
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>📦 Order Management</h3>
      <div style={styles.tableWrapper}>
        <Table hover responsive style={styles.table}>
          <thead style={styles.thead}>
            <tr>
              <th style={styles.th}>Order ID</th>
              <th style={styles.th}>Customer</th>
              <th style={styles.th}>Items</th>
              <th style={styles.th}>Total</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Update</th>
              <th style={styles.th}>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-4">No orders found.</td>
              </tr>
            ) : (
              orders.map(order => (
                <tr key={order._id} style={styles.tr}>
                  <td className="fw-bold" style={{ color: '#d4af37' }}>{order.orderId || '—'}</td>
                  <td>
                    <div className="fw-bold">{order.customer?.name || '—'}</div>
                    <small className="text-muted">{order.customer?.email}</small>
                  </td>
                  <td>
                    <ul className="list-unstyled mb-0 small">
                      {(order.items || []).map((item, idx) => (
                        <li key={idx} style={{ color: '#5d4037' }}>{item.name} × {item.quantity}</li>
                      ))}
                    </ul>
                  </td>
                  <td className="fw-bold" style={{ color: '#5d4037' }}>₹{order.total || 0}</td>
                  <td>
                    <span style={{
                      ...styles.statusBadge,
                      backgroundColor: order.status === 'Paid' ? '#e8f5e9' : '#fff3e0',
                      color: order.status === 'Paid' ? '#2e7d32' : '#ef6c00'
                    }}>
                      {order.status || 'Pending'}
                    </span>
                  </td>
                  <td>
                    <Form.Select
                      value={order.status}
                      onChange={(e) => updateStatus(order._id, e.target.value)}
                      size="sm"
                      style={styles.select}
                    >
                      <option>Pending</option>
                      <option>Shipped</option>
                      <option>Delivered</option>
                      <option>Paid</option>
                    </Form.Select>
                  </td>
                  <td className="text-nowrap">
                    <Button
                      variant="outline-warning"
                      size="sm"
                      onClick={() => handleShowInvoice(order)}
                      style={styles.viewBtn}
                    >
                      Invoice
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>

      {/* Invoice Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
        <Modal.Header closeButton style={{ borderBottom: 'none', background: '#fffdf9' }}>
          <Modal.Title style={{ fontFamily: 'Great Vibes, cursive', color: '#d4af37' }}>Order Invoice Detail</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ background: '#fffdf9', padding: '0 20px 20px' }}>
          {selectedOrder && <InvoiceSummary invoice={selectedOrder} />}
        </Modal.Body>
      </Modal>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    background: '#fffdf9',
    minHeight: '100vh',
    borderRadius: '15px'
  },
  title: {
    fontFamily: 'Great Vibes, cursive',
    fontSize: '2.5rem',
    color: '#d4af37',
    marginBottom: '25px',
    textAlign: 'center'
  },
  tableWrapper: {
    background: '#fff',
    borderRadius: '15px',
    overflow: 'hidden',
    boxShadow: '0 4px 15px rgba(212, 175, 55, 0.1)',
    border: '1px solid #ffe0b2'
  },
  table: {
    marginBottom: 0,
    verticalAlign: 'middle'
  },
  thead: {
    background: 'linear-gradient(to right, #d4af37, #ffcc80)',
    color: '#fff',
  },
  th: {
    padding: '15px',
    fontWeight: 'bold',
    border: 'none'
  },
  tr: {
    transition: 'all 0.2s ease',
    cursor: 'default',
    borderBottom: '1px solid #fef3e3'
  },
  statusBadge: {
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '0.8rem',
    fontWeight: 'bold',
    display: 'inline-block'
  },
  select: {
    borderRadius: '8px',
    border: '1px solid #ffe0b2',
    color: '#5d4037'
  },
  viewBtn: {
    borderRadius: '20px',
    fontWeight: 'bold',
    fontSize: '0.8rem',
    transition: 'all 0.2s ease',
  },
  downloadLink: {
    borderRadius: '20px',
    fontWeight: 'bold',
    fontSize: '0.8rem',
    textDecoration: 'none',
    display: 'inline-block'
  }
};

export default OrderManager;