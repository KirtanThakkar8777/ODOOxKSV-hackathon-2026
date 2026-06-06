import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Menu,
  Search,
  Bell,
  MessageSquare,
  ChevronDown,
  Sun,
  Moon,
  LogOut,
  User,
  Settings
} from 'lucide-react';

const Navbar = ({ sidebarOpen, setSidebarOpen, setMobileMenuOpen }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUserMenuOpen(false);
    navigate('/login', { replace: true });
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const notifications = [
    { id: 1, title: 'New RFQ Response', message: 'TechCorp submitted a quotation', time: '5 min ago', type: 'info' },
    { id: 2, title: 'PO Approved', message: 'Purchase Order #PO-2024-001 approved', time: '1 hour ago', type: 'success' },
    { id: 3, title: 'Invoice Due', message: 'Invoice #INV-2024-045 due tomorrow', time: '3 hours ago', type: 'warning' },
  ];

  return (
    <header className="h-16 bg-white dark:bg-dark-800 border-b border-slate-200 dark:border-dark-700 flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-dark-700 rounded-lg"
        >
          <Menu className="w-5 h-5" />
        </button>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="hidden lg:flex p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-dark-700 rounded-lg"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Search */}
        <div className="hidden md:flex items-center relative">
          <Search className="w-4 h-4 absolute left-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search vendors, RFQs, orders..."
            className="pl-10 pr-4 py-2 w-80 bg-slate-100 dark:bg-dark-700 border-none rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:text-white placeholder-slate-400"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-dark-700 rounded-lg"
        >
          {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        {/* Messages */}
        <button className="p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-dark-700 rounded-lg relative">
          <MessageSquare className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary-500 rounded-full" />
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-dark-700 rounded-lg relative"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-dark-800 rounded-xl shadow-lg border border-slate-200 dark:border-dark-700 py-2 z-50">
              <div className="px-4 py-2 border-b border-slate-200 dark:border-dark-700 flex items-center justify-between">
                <h3 className="font-semibold text-slate-900 dark:text-white">Notifications</h3>
                <Link to="/notifications" className="text-xs text-primary-600 hover:text-primary-700">View All</Link>
              </div>
              {notifications.map((notif) => (
                <div key={notif.id} className="px-4 py-3 hover:bg-slate-50 dark:hover:bg-dark-700 cursor-pointer">
                  <p className="text-sm font-medium text-slate-900 dark:text-white">{notif.title}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{notif.message}</p>
                  <p className="text-xs text-slate-400 mt-1">{notif.time}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-dark-700"
          >
            <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
              <span className="text-xs font-semibold text-primary-700 dark:text-primary-400">JD</span>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-500 dark:text-slate-400 hidden sm:block" />
          </button>

          {userMenuOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-dark-800 rounded-xl shadow-lg border border-slate-200 dark:border-dark-700 py-2 z-50">
              <div className="px-4 py-2 border-b border-slate-200 dark:border-dark-700">
                <p className="font-semibold text-slate-900 dark:text-white">John Doe</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">john@company.com</p>
              </div>
              <Link to="/profile" className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-dark-700">
                <User className="w-4 h-4" />
                Profile
              </Link>
              <Link to="/settings" className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-dark-700">
                <Settings className="w-4 h-4" />
                Settings
              </Link>
              <div className="border-t border-slate-200 dark:border-dark-700 mt-1">
                <button
  onClick={handleLogout}
  className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 w-full"
>
  <LogOut className="w-4 h-4" />
  Sign Out
</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;