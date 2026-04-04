import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import Sidebar from './Sidebar';
import Header from './Header';

export default function Layout({ children }) {
  const { sidebarCollapsed } = useAppContext();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="app-layout">
      <Sidebar
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />
      <div className={`main-area ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        <Header
          pathname={location.pathname}
          onMenuClick={() => setMobileOpen(true)}
        />
        <main className="main-content">
          {children}
        </main>
      </div>
    </div>
  );
}
