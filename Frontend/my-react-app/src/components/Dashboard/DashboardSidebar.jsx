import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {
  BiHome, BiArrowBack, BiBox, BiBullseye, BiCart, BiStar, BiPackage,
  BiUpload,
  BiCommentDetail,
  BiCategoryAlt
} from 'react-icons/bi';

const SidebarItem = ({ icon, label, isCollapsed, to }) => (
  <Nav.Link
    as={Link}
    to={to}
    className={`d-flex align-items-center py-2 px-3 sidebar-item ${isCollapsed ? 'justify-content-center' : 'gap-2'}`}
    title={isCollapsed ? label : ''}
    style={{ textDecoration: 'none', color: '#5d4037' }}
  >
    <span style={{ fontSize: '1.2rem' }}>{icon}</span>
    {!isCollapsed && <span style={{ fontWeight: '500' }}>{label}</span>}
  </Nav.Link>
);

const DashboardSidebar = ({ isCollapsed, isMobile }) => {
  const triggerToggle = () => {
    window.dispatchEvent(new CustomEvent('toggle-sidebar'));
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobile && !isCollapsed && (
        <div
          onClick={triggerToggle}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0,0,0,0.3)',
            zIndex: 1040,
            backdropFilter: 'blur(2px)'
          }}
        />
      )}

      {/* Sidebar Container */}
      <div
        className={`sidebar-glow`}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100%',
          width: isMobile ? '280px' : isCollapsed ? '70px' : '240px',
          background: 'linear-gradient(to bottom, #fff3e0, #ffe0b2)',
          zIndex: 1050,
          transform: isMobile && isCollapsed ? 'translateX(-100%)' : 'translateX(0)',
          transition: 'transform 0.3s ease-in-out, width 0.3s ease-in-out',
          borderRight: '1px solid #d4af37',
          boxShadow: '4px 0 15px rgba(212, 175, 55, 0.1)',
          overflowY: 'auto',
          overflowX: 'hidden'
        }}
      >
        {/* Sidebar Header */}
        <div className="d-flex justify-content-between align-items-center px-3 py-4">
          {!isCollapsed && (
            <h5 className="mb-0" style={{
              color: '#d4af37',
              fontFamily: 'Great Vibes, cursive',
              fontSize: '1.8rem',
              flex: 1,
              textAlign: 'center'
            }}>
              Admin Menu
            </h5>
          )}
          {isMobile && !isCollapsed && (
            <button
              onClick={triggerToggle}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '1.5rem',
                color: '#d4af37',
                padding: '0 5px'
              }}
            >
              ✖
            </button>
          )}
        </div>

        {!isCollapsed && <div style={{ borderBottom: '1px solid #ffe0b2', margin: '0 20px 15px' }} />}

        {/* Navigation Items */}
        <Nav className="flex-column" style={{ padding: '0 10px' }}>
          <SidebarItem icon={<BiHome />} label="Dashboard" isCollapsed={isCollapsed} to="/admin/dashboard" />
          <SidebarItem icon={<BiArrowBack />} label="Home" isCollapsed={isCollapsed} to="/" />
          <SidebarItem icon={<BiBox />} label="Product Manager" isCollapsed={isCollapsed} to="/admin/products" />
          <SidebarItem icon={<BiBullseye />} label="Promo Banner" isCollapsed={isCollapsed} to="/admin/promos" />
          <SidebarItem icon={<BiCart />} label="Order Manager" isCollapsed={isCollapsed} to="/admin/order" />
          <SidebarItem icon={<BiStar />} label="Best Seller" isCollapsed={isCollapsed} to="/admin/bestseller" />
          <SidebarItem icon={<BiPackage />} label="Stock Availability" isCollapsed={isCollapsed} to="/admin/stocks" />
          <SidebarItem icon={<BiUpload />} label="Upload Image" isCollapsed={isCollapsed} to="/admin/images/upload" />
          <SidebarItem icon={<BiCommentDetail />} label="Review Panel" isCollapsed={isCollapsed} to="/admin/reviews" />
          <SidebarItem icon={<BiCategoryAlt />} label="Category Manager" isCollapsed={isCollapsed} to="/admin/category" />
        </Nav>

        {/* Custom Styles */}
        <style dangerouslySetInnerHTML={{
          __html: `
          .sidebar-item {
            transition: all 0.2s ease;
            border-radius: 8px;
            margin-bottom: 5px;
          }
          .sidebar-item:hover {
            background-color: #fff8e1;
            color: #d4af37 !important;
            transform: translateX(5px);
          }
          .sidebar-item svg {
            transition: fill 0.2s ease;
          }
          .sidebar-item:hover svg {
            fill: #d4af37 !important;
          }
        `}} />
      </div>
    </>
  );
};

export default DashboardSidebar;