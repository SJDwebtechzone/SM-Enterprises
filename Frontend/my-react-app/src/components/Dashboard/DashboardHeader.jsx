import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import avatar from '../../assets/images/bg_7.jpg';
import { AuthContext } from '../../context/AuthContext';

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
    <header className="d-flex justify-content-between align-items-center p-3 bg-light border-bottom">
      <Button variant="outline-primary" onClick={onToggleSidebar} className="toggle-btn">
        {isCollapsed ? '☰' : '✖'}
      </Button>

      <div className="d-flex align-items-center gap-3">
        <Button variant="secondary" onClick={onToggleTheme}>
          Toggle Theme
        </Button>
        <img
          src={avatar}
          alt="Avatar"
          style={{ width: '40px', height: '40px', borderRadius: '50%' }}
        />
        <Button variant="danger" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </header>
  );
};

export default DashboardHeader;