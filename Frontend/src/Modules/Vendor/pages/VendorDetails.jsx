import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star, Building2, MapPin, Phone, Mail, Globe, Calendar, DollarSign, ShoppingCart, FileText, TrendingUp, Edit2 } from 'lucide-react';
import Button from '../../../components/common/Button';
import AnalyticsCard from '../../../components/cards/AnalyticsCard';
import StatCard from '../../../components/cards/StatCard';
import LineChart from '../../../components/charts/LineChart';
import DataTable from '../../../components/common/DataTable';
import StatusBadge from '../../../components/common/StatusBadge';
import ActivityTimeline from '../../../components/timeline/ActivityTimeline';

const VendorDetails = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('overview');

  const vendor = {
    id: 1,
    name: 'TechCorp Solutions',
    category: 'IT Equipment',
    status: 'active',
    rating: 4.8,
    contact: {
      name: 'James Wilson',
      email: 'james@techcorp.com',
      phone: '+1 (555) 234-5678',
    },
    address: '123 Tech Street, San Francisco, CA 94105',
    website: 'www.techcorp.com',
    taxId: '12-3456789',
    paymentTerms: 'Net 30',
    totalSpend: 1250000,
    orders: 45,
    joinDate: '2022-03-15',
    description: 'Leading provider of IT equipment and technology solutions for enterprise businesses.',
  };

  const spendData = [
    { name: 'Jan', spend: 85000, orders: 4 },
    { name: 'Feb', spend: 92000, orders: 5 },
    { name: 'Mar', spend: 78000, orders: 3 },
    { name: 'Apr', spend: 105000, orders: 6 },
    { name: 'May', spend: 98000, orders: 5 },
    { name: 'Jun', spend: 112000, orders: 6 },
  ];

  const recentOrders = [
    { id: 'PO-2024-045', date: '2024-06-05', amount: 45000, status: 'completed', items: 'Laptops & Monitors' },
    { id: 'PO-2024-038', date: '2024-05-28', amount: 32000, status: 'completed', items: 'Network Equipment' },
    { id: 'PO-2024-032', date: '2024-05-20', amount: 28000, status: 'in_progress', items: 'Servers' },
    { id: 'PO-2024-025', date: '2024-05-15', amount: 55000, status: 'completed', items: 'Workstations' },
  ];

  const activities = [
    { title: 'PO Created', description: 'Purchase Order PO-2024-045 created for $45,000', timestamp: '2024-06-05T10:30:00', icon: 'cart', color: 'blue', user: 'John Doe' },
    { title: 'Quotation Submitted', description: 'Submitted quotation for RFQ-2024-012', timestamp: '2024-06-03T14:15:00', icon: 'file', color: 'green', user: 'James Wilson' },
    { title: 'Invoice Paid', description: 'Invoice INV-2024-067 paid - $32,000', timestamp: '2024-05-30T09:00:00', icon: 'dollar', color: 'purple', user: 'Finance Team' },
    { title: 'Rating Updated', description: 'Vendor rating updated to 4.8', timestamp: '2024-05-28T16:45:00', icon: 'check', color: 'yellow', user: 'Admin' },
  ];

  const orderColumns = [
    { key: 'id', title: 'Order ID' },
    { key: 'date', title: 'Date' },
    { key: 'items', title: 'Items' },
    { key: 'amount', title: 'Amount', render: (val) => `$${val.toLocaleString()}` },
    { key: 'status', title: 'Status', render: (val) => <StatusBadge status={val} /> },
  ];

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'orders', label: 'Orders' },
    { id: 'rfqs', label: 'RFQs' },
    { id: 'invoices', label: 'Invoices' },
    { id: 'activity', label: 'Activity' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/vendors" className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-dark-700 text-slate-500 dark:text-slate-400">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{vendor.name}</h1>
              <StatusBadge status={vendor.status} />
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">{vendor.category} • Vendor ID: {vendor.id}</p>
          </div>
        </div>
        <Link to={`/vendors/${id}/edit`}>
          <Button variant="secondary" leftIcon={<Edit2 className="w-4 h-4" />}>Edit Vendor</Button>
        </Link>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200 dark:border-dark-700">
        <nav className="flex gap-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-primary-600 text-primary-600 dark:border-primary-400 dark:text-primary-400'
                  : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard title="Total Spend" value={`$${(vendor.totalSpend/1000).toFixed(0)}K`} change="+15%" changeType="positive" icon={DollarSign} color="green" />
            <StatCard title="Total Orders" value={vendor.orders} change="+8" changeType="positive" icon={ShoppingCart} color="blue" />
            <StatCard title="Rating" value={vendor.rating} change="+0.3" changeType="positive" icon={Star} color="orange" />
            <StatCard title="Avg Order Value" value="$27.8K" change="+5%" changeType="positive" icon={TrendingUp} color="purple" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Contact Info */}
            <AnalyticsCard title="Contact Information">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-dark-700 flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-slate-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">{vendor.contact.name}</p>
                    <p className="text-xs text-slate-500">Primary Contact</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-slate-400" />
                  <span className="text-sm text-slate-600 dark:text-slate-300">{vendor.contact.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-slate-400" />
                  <span className="text-sm text-slate-600 dark:text-slate-300">{vendor.contact.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  <span className="text-sm text-slate-600 dark:text-slate-300">{vendor.address}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="w-4 h-4 text-slate-400" />
                  <span className="text-sm text-slate-600 dark:text-slate-300">{vendor.website}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span className="text-sm text-slate-600 dark:text-slate-300">Vendor since {vendor.joinDate}</span>
                </div>
              </div>
            </AnalyticsCard>

            {/* Spend Trend */}
            <AnalyticsCard title="Spend Trend" className="lg:col-span-2">
              <LineChart 
                data={spendData}
                lines={[{ key: 'spend', name: 'Spend ($)', color: '#3b82f6' }]}
                height={250}
              />
            </AnalyticsCard>
          </div>

          {/* Recent Orders */}
          <AnalyticsCard title="Recent Orders" action={<Link to="/purchase-orders" className="text-sm text-primary-600">View All</Link>}>
            <DataTable columns={orderColumns} data={recentOrders} pagination={false} pageSize={5} />
          </AnalyticsCard>
        </div>
      )}

      {activeTab === 'activity' && (
        <AnalyticsCard title="Activity Timeline">
          <ActivityTimeline activities={activities} />
        </AnalyticsCard>
      )}

      {(activeTab === 'orders' || activeTab === 'rfqs' || activeTab === 'invoices') && (
        <div className="card p-12 text-center">
          <p className="text-slate-500 dark:text-slate-400">Detailed {activeTab} view coming soon</p>
        </div>
      )}
    </div>
  );
};

export default VendorDetails;