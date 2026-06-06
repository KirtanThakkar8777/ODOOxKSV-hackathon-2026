import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const breadcrumbMap = {
  '/': 'Dashboard',
  '/dashboard': 'Dashboard',
  '/vendors': 'Vendor Management',
  '/vendors/add': 'Add Vendor',
  '/rfqs': 'RFQ Management',
  '/rfqs/create': 'Create RFQ',
  '/quotations': 'Quotation Management',
  '/quotations/compare': 'Compare Quotations',
  '/purchase-orders': 'Purchase Orders',
  '/purchase-orders/create': 'Create Purchase Order',
  '/invoices': 'Invoice Management',
  '/invoices/generate': 'Generate Invoice',
  '/activity-logs': 'Activity Logs',
  '/audit-trail': 'Audit Trail',
  '/reports': 'Reports & Analytics',
  '/notifications': 'Notifications',
  '/settings': 'Settings',
  '/profile': 'Profile',
  '/users': 'User Management',
};

const Header = () => {
  const location = useLocation();
  const path = location.pathname;

  // Get page title
  const title = breadcrumbMap[path] || 'Page';

  return (
    <div className="bg-white dark:bg-dark-800 border-b border-slate-200 dark:border-dark-700 px-4 lg:px-6 py-3">
      <div className="flex items-center gap-2 text-sm">
        <Link to="/" className="text-slate-500 hover:text-primary-600 dark:text-slate-400 dark:hover:text-primary-400">
          <Home className="w-4 h-4" />
        </Link>
        <ChevronRight className="w-4 h-4 text-slate-400" />
        <span className="text-slate-900 dark:text-Black font-medium">{title}</span>
      </div>
    </div>
  );
};

export default Header;