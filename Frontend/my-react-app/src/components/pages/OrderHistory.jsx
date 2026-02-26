import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrderHistory = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setError('Please login to view order history');
        return;
      }

      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/orderhistory/history`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        setOrders(res.data || []);
      } catch (err) {
        console.error('❌ Fetch error:', err.message);
        if (err.response?.status === 403 || err.response?.status === 401) {
          setError('Session expired. Please login again.');
          localStorage.removeItem('token');
        } else {
          setError('Failed to load order history');
        }
      }
    };

    fetchOrderHistory();
  }, []);

  if (error) {
    return (
      <div style={styles.page}>
        <div style={styles.card}>
          <div className="alert alert-danger">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>📜 Blessed Order History</h1>

        {orders.length === 0 ? (
          <div style={styles.card}>
            <p style={styles.emptyText}>No divine orders found yet. Start your journey today! ✨</p>
          </div>
        ) : (
          <div style={styles.orderList}>
            {orders.map(order => (
              <div key={order._id} style={styles.card}>
                <div style={styles.orderHeader}>
                  <span style={styles.orderId}>Order ID: {order.orderId}</span>
                  <span style={{ ...styles.status, backgroundColor: order.status === 'Paid' ? '#4caf50' : '#ffa000' }}>
                    {order.status}
                  </span>
                </div>

                <div style={styles.orderBody}>
                  <div style={styles.itemsList}>
                    {order.items.map((item, idx) => (
                      <div key={idx} style={styles.itemRow}>
                        <span style={styles.itemName}>{item.name}</span>
                        <span style={styles.itemQty}>× {item.quantity}</span>
                      </div>
                    ))}
                  </div>

                  <div style={styles.orderFooter}>
                    <div style={styles.totalSection}>
                      <span style={styles.totalLabel}>Total:</span>
                      <span style={styles.totalValue}>₹{order.total}</span>
                    </div>
                    <div style={styles.dateSection}>
                      <small>{new Date(order.createdAt).toLocaleString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}</small>
                    </div>
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
    background: 'linear-gradient(to bottom right, #fff8e1, #ffe0b2)',
    minHeight: '100vh',
    padding: '40px 20px',
    fontFamily: 'Roboto, sans-serif',
    color: '#5d4037',
  },
  container: {
    maxWidth: '800px',
    margin: '0 auto',
  },
  title: {
    fontFamily: 'Great Vibes, cursive',
    fontSize: '3rem',
    color: '#d4af37',
    textAlign: 'center',
    marginBottom: '40px',
    textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
  },
  orderList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  card: {
    background: '#fff3e0',
    padding: '25px',
    borderRadius: '15px',
    boxShadow: '0 4px 15px rgba(212, 175, 55, 0.2)',
    border: '1px solid #ffe0b2',
    transition: 'transform 0.2s ease',
  },
  orderHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #d7ccc8',
    paddingBottom: '15px',
    marginBottom: '15px',
  },
  orderId: {
    fontWeight: 'bold',
    fontSize: '1.1rem',
    color: '#8d6e63',
  },
  status: {
    color: 'white',
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '0.85rem',
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  orderBody: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  itemsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  itemRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '1rem',
  },
  itemName: {
    color: '#5d4037',
  },
  itemQty: {
    color: '#8d6e63',
    fontWeight: '500',
  },
  orderFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: '10px',
    borderTop: '1px dotted #d7ccc8',
    paddingTop: '15px',
  },
  totalSection: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '8px',
  },
  totalLabel: {
    fontSize: '0.9rem',
    color: '#8d6e63',
  },
  totalValue: {
    fontSize: '1.4rem',
    fontWeight: 'bold',
    color: '#d4af37',
  },
  dateSection: {
    color: '#a1887f',
    fontStyle: 'italic',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: '1.2rem',
    color: '#8d6e63',
  }
};

export default OrderHistory;