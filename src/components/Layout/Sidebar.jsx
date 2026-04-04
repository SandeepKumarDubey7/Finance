import { NavLink, useLocation } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import {
  LayoutDashboard,
  ArrowLeftRight,
  Lightbulb,
  ChevronLeft,
  ChevronRight,
  Wallet,
} from 'lucide-react';

const navItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/transactions', label: 'Transactions', icon: ArrowLeftRight },
  { path: '/insights', label: 'Insights', icon: Lightbulb },
];

export default function Sidebar({ mobileOpen, onCloseMobile }) {
  const { sidebarCollapsed, toggleSidebar } = useAppContext();
  const location = useLocation();

  const classes = [
    'sidebar',
    sidebarCollapsed ? 'collapsed' : '',
    mobileOpen ? 'mobile-open' : '',
  ].filter(Boolean).join(' ');

  return (
    <>
      {mobileOpen && <div className="mobile-overlay" onClick={onCloseMobile} />}
      <aside className={classes}>
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">
            <Wallet size={18} />
          </div>
          <span className="sidebar-logo-text">FinanceHub</span>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`sidebar-link ${isActive ? 'active' : ''}`}
                onClick={onCloseMobile}
              >
                <Icon size={20} />
                <span className="sidebar-link-text">{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <button className="sidebar-collapse-btn" onClick={toggleSidebar}>
            {sidebarCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            {!sidebarCollapsed && <span className="sidebar-link-text">Collapse</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
