import React from 'react';
import { Nav } from 'react-bootstrap';
import {
  BiHome,BiArrowBack, BiBox, BiBullseye, BiCart, BiStar, BiPackage,
  BiUpload,
  BiCommentDetail,
  BiCategoryAlt
} from 'react-icons/bi';

const SidebarItem = ({ icon, label, isCollapsed, href }) => (
  <Nav.Link
    href={href}
    className={`text-white d-flex align-items-center py-2 px-2 sidebar-item ${isCollapsed ? 'justify-content-center' : 'gap-2'}`}
    title={isCollapsed ? label : ''}
  >
    {icon}
    {!isCollapsed && <span>{label}</span>}
  </Nav.Link>
);

const DashboardSidebar = ({ isCollapsed, isMobile }) => {
  return (
    <div
      className={`sidebar-glow ${isMobile && isCollapsed ? 'open' : ''}`}
      style={{
        position: isMobile ? 'fixed' : 'fixed',
        top: 0,
        left: 0,
        height: '100%',
        width: isMobile ? '100%' : isCollapsed ? '70px' : '200px',
        backgroundColor: '#212529',
        zIndex: 1050,
        transform: isMobile && !isCollapsed ? 'translateX(-100%)' : 'translateX(0)',
        transition: 'transform 0.3s ease-in-out, width 0.3s ease-in-out',
      }}
    >

      {!isCollapsed && (
        <h5 className="text-center py-3" style={{
          color: '#FFD700',
          textShadow: '0 0 8px #FFD700',
          fontFamily: 'serif',
        }}>
          ✨ Admin Menu ✨
        </h5>
      )}
      <Nav className="flex-column">
        <SidebarItem icon={<BiHome />} label="Dashboard" isCollapsed={isCollapsed} href="/admin/dashboard" />
        <SidebarItem icon={<BiArrowBack />} label="Home" isCollapsed={isCollapsed} href="/" />
        <SidebarItem icon={<BiBox />} label="Product Manager" isCollapsed={isCollapsed} href="/admin/products" />
        <SidebarItem icon={<BiBullseye />} label="Promo Banner" isCollapsed={isCollapsed} href="/admin/promos" />
        <SidebarItem icon={<BiCart />} label="Order Manager" isCollapsed={isCollapsed} href="/admin/order" />
        <SidebarItem icon={<BiStar />} label="Best Seller" isCollapsed={isCollapsed} href="/admin/bestseller" />
        <SidebarItem icon={<BiPackage />} label="Stock Availability" isCollapsed={isCollapsed} href="/admin/stocks" />
       
        <SidebarItem icon={<BiUpload />} label="Upload Image" isCollapsed={isCollapsed} href="/admin/images/upload" />
        <SidebarItem icon={<BiCommentDetail/>} label="Review Panel" isCollapsed={isCollapsed} href="/admin/reviews" />
         <SidebarItem icon={<BiCategoryAlt />} label="Category Manager" isCollapsed={isCollapsed} href="/admin/category" />
      


      </Nav>
    </div>
  );
};

export default DashboardSidebar;