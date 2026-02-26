import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import avatar from '../../assets/images/bg_7.jpg';
import { AuthContext } from '../../context/AuthContext';
import { BiMenu, BiArrowBack } from 'react-icons/bi';
import { IoClose } from 'react-icons/io5';

const DashboardHeader = ({ onToggleSidebar, onToggleTheme, isCollapsed }) => {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const handleLogout = () => {
    // ✅ Clear localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('userName');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');

    // ✅ Reset context
    setUser(null);

    // ✅ Redirect to login
    navigate('/login');
  };

  return (
    <header className="d-flex justify-content-between align-items-center p-3 shadow-sm" style={styles.header}>
      <div className="d-flex align-items-center gap-3">
        <button
          onClick={onToggleSidebar}
          style={styles.toggleBtn}
          aria-label="Toggle Sidebar"
        >
          {isCollapsed ? <BiMenu size={24} color="white" /> : <IoClose size={24} color="white" />}
        </button>
        <span style={styles.dashboardTitle}>Dashboard Control Panel</span>
      </div>

      <div className="d-flex align-items-center gap-3">
        <div style={styles.userInfo}>
          <img
            src={avatar}
            alt="Admin"
            style={styles.avatar}
          />
          <span style={styles.userName}>Admin Portal</span>
        </div>
        <button style={styles.logoutBtn} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
};

const styles = {
  header: {
    background: '#fffdf9',
    borderBottom: '2px solid #ffe0b2',
    position: 'sticky',
    top: 0,
    zIndex: 1100,
  },
  toggleBtn: {
    background: 'linear-gradient(to right, #d4af37, #ffcc80)',
    border: 'none',
    color: 'white',
    width: '40px',
    height: '40px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.5rem',
    cursor: 'pointer',
    boxShadow: '0 2px 6px rgba(212, 175, 55, 0.3)',
    zIndex: 1100, // Ensure it's above the sidebar on mobile
  },
  dashboardTitle: {
    color: '#8d6e63',
    fontWeight: 'bold',
    fontSize: '1.1rem',
    fontFamily: 'serif',
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '5px 15px',
    borderRadius: '25px',
    background: '#fff3e0',
    border: '1px solid #ffe0b2',
  },
  avatar: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    border: '2px solid #d4af37',
  },
  userName: {
    color: '#5d4037',
    fontSize: '0.9rem',
    fontWeight: '500',
  },
  logoutBtn: {
    background: 'none',
    border: '1px solid #d4af37',
    color: '#d4af37',
    padding: '6px 15px',
    borderRadius: '20px',
    fontSize: '0.9rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  }
};

export default DashboardHeader;