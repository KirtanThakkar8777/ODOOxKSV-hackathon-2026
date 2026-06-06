import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Building2,
  FileText,
  Quote,
  ShoppingCart,
  Receipt,
  Activity,
  BarChart3,
  Settings,
  Bell,
  ChevronLeft,
  X
} from 'lucide-react';
import { APP_NAME, SIDEBAR_ITEMS } from '../../utils/constants';

const iconMap = {
  LayoutDashboard,
  Building2,
  FileText,
  Quote,
  ShoppingCart,
  Receipt,
  Activity,
  BarChart3,
};

const Sidebar = ({ onClose }) => {
  const location = useLocation();

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/' || location.pathname === '/dashboard';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center justify-between h-16 px-6 border-b border-slate-200 dark:border-dark-700">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center">
            <Building2 className="w-5 h-5 text-Black" />
          </div>
          <span className="text-lg font-bold text-slate-900 dark:text-Black">{APP_NAME}</span>
        </Link>
        {onClose && (
          <button onClick={onClose} className="lg:hidden p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <p className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Main Menu</p>
        {SIDEBAR_ITEMS.map((item) => {
          const Icon = iconMap[item.icon];
          const active = isActive(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={`sidebar-link ${active ? 'active' : ''}`}
            >
              <Icon className={`w-5 h-5 ${active ? 'text-primary-600 dark:text-primary-400' : 'text-slate-400'}`} />
              <span>{item.name}</span>
              {active && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-600" />
              )}
            </Link>
          );
        })}

        <p className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 mt-6">System</p>
        <Link
          to="/notifications"
          onClick={onClose}
          className={`sidebar-link ${isActive('/notifications') ? 'active' : ''}`}
        >
          <Bell className="w-5 h-5 text-slate-400" />
          <span>Notifications</span>
          <span className="ml-auto bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">3</span>
        </Link>
        <Link
          to="/settings"
          onClick={onClose}
          className={`sidebar-link ${isActive('/settings') ? 'active' : ''}`}
        >
          <Settings className="w-5 h-5 text-slate-400" />
          <span>Settings</span>
        </Link>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-slate-200 dark:border-dark-700">
        <Link to="/profile" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-dark-700 transition-colors">
          <div className="w-9 h-9 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
            <span className="text-sm font-semibold text-primary-700 dark:text-primary-400">JD</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-900 dark:text-black truncate">John Doe</p>
            <p className="text-xs text-slate-500 dark:text-black truncate">Procurement Manager</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;