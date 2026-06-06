export const APP_NAME = 'VendorBridge';

export const ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  PROCUREMENT: 'procurement',
  VENDOR: 'vendor',
  VIEWER: 'viewer'
};

export const STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  COMPLETED: 'completed',
  DRAFT: 'draft',
  CANCELLED: 'cancelled',
  IN_PROGRESS: 'in_progress'
};

export const PRIORITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  URGENT: 'urgent'
};

export const SIDEBAR_ITEMS = [
  { name: 'Dashboard', path: '/', icon: 'LayoutDashboard' },
  { name: 'Vendors', path: '/vendors', icon: 'Building2' },
  { name: 'RFQs', path: '/rfqs', icon: 'FileText' },
  { name: 'Quotations', path: '/quotations', icon: 'Quote' },
  { name: 'Purchase Orders', path: '/purchase-orders', icon: 'ShoppingCart' },
  { name: 'Invoices', path: '/invoices', icon: 'Receipt' },
  { name: 'Activity Logs', path: '/activity-logs', icon: 'Activity' },
  { name: 'Reports', path: '/reports', icon: 'BarChart3' },
];

export const DEMO_DATA = {
  stats: {
    totalVendors: 124,
    activeRFQs: 18,
    pendingQuotations: 32,
    totalSpend: '$2.4M',
    monthlySpend: '$485K',
    savings: '12.5%'
  }
};