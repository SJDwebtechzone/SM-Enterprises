import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import DashboardSidebar from './DashboardSidebar';
import DashboardHeader from './DashboardHeader';



const DashboardLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [darkTheme, setDarkTheme] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);
  const toggleTheme = () => setDarkTheme(!darkTheme);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={darkTheme ? 'bg-dark text-light' : 'bg-white text-dark'}>
      <DashboardSidebar isCollapsed={isCollapsed} isMobile={isMobile} />
      <div
        style={{
          marginLeft: !isMobile ? (isCollapsed ? '70px' : '200px') : '0',
          transition: 'margin-left 0.3s',
        }}
      >
        <DashboardHeader
          onToggleSidebar={toggleSidebar}
          onToggleTheme={toggleTheme}
          isCollapsed={isCollapsed}
        />
        <main className="p-4 position-relative">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;