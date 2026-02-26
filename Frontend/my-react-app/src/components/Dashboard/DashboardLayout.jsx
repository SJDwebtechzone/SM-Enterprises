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
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (mobile) setIsCollapsed(true);
    };

    const handleToggle = () => setIsCollapsed(prev => !prev);

    window.addEventListener('resize', handleResize);
    window.addEventListener('toggle-sidebar', handleToggle);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('toggle-sidebar', handleToggle);
    };
  }, []);

  return (
    <div style={styles.layout}>
      <DashboardSidebar isCollapsed={isCollapsed} isMobile={isMobile} />
      <div
        style={{
          marginLeft: !isMobile ? (isCollapsed ? '70px' : '240px') : '0',
          transition: 'margin-left 0.3s ease-in-out',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <DashboardHeader
          onToggleSidebar={toggleSidebar}
          onToggleTheme={toggleTheme}
          isCollapsed={isCollapsed}
        />
        <main className="p-4 flex-grow-1" style={styles.main}>
          <div className="container-fluid">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

const styles = {
  layout: {
    background: '#fffdf9',
    minHeight: '100vh',
    color: '#5d4037',
    fontFamily: 'Roboto, sans-serif'
  },
  main: {
    background: '#fffdf9'
  }
};

export default DashboardLayout;