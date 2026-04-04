import { useAppContext } from '../../context/AppContext';
import { Sun, Moon, Menu } from 'lucide-react';

const pageTitles = {
  '/': { title: 'Dashboard', subtitle: 'Your financial overview' },
  '/transactions': { title: 'Transactions', subtitle: 'Manage your transactions' },
  '/insights': { title: 'Insights', subtitle: 'Understand your spending' },
};

export default function Header({ pathname, onMenuClick }) {
  const { role, setRole, toggleTheme, theme, sidebarCollapsed } = useAppContext();
  const page = pageTitles[pathname] || pageTitles['/'];

  return (
    <header className={`header ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      <div className="header-left">
        <button className="mobile-nav-toggle" onClick={onMenuClick}>
          <Menu size={22} />
        </button>
        <div>
          <h1 className="header-title">{page.title}</h1>
          <p className="header-subtitle">{page.subtitle}</p>
        </div>
      </div>

      <div className="header-right">
        <div className="role-switcher">
          <button
            className={`role-option ${role === 'admin' ? 'active' : ''}`}
            onClick={() => setRole('admin')}
          >
            Admin
          </button>
          <button
            className={`role-option ${role === 'viewer' ? 'active' : ''}`}
            onClick={() => setRole('viewer')}
          >
            Viewer
          </button>
        </div>

        <button
          className="theme-toggle"
          onClick={toggleTheme}
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </header>
  );
}
