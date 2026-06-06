import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Activity, FileText, ShoppingCart, CheckCircle, User, DollarSign, Building2, AlertTriangle, Download } from 'lucide-react';
import Button from '../../../components/common/Button';
import SearchBar from '../../../components/common/SearchBar';
import DataTable from '../../../components/common/DataTable';
import StatusBadge from '../../../components/common/StatusBadge';
import StatCard from '../../../components/cards/StatCard';
import ActivityTimeline from '../../../components/timeline/ActivityTimeline';
import AnalyticsCard from '../../../components/cards/AnalyticsCard';
import { activityLogAPI } from '../../../services/api';

const ActivityLogs = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [apiActivities, setApiActivities] = useState([]);
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadActivities = async () => {
      setIsLoading(true);
      try {
        const [logsResponse, statsResponse] = await Promise.all([
          activityLogAPI.getAll({ limit: 100 }),
          activityLogAPI.getStats(),
        ]);
        setApiActivities(logsResponse.data || []);
        setStats(statsResponse.data || null);
      } catch (error) {
        console.error('Failed to load activity logs', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadActivities();
  }, []);

  const fallbackActivities = [
    { id: 1, type: 'rfq', action: 'RFQ Created', description: 'RFQ-2024-001 created by John Doe', timestamp: '2024-06-06T10:00:00', user: 'John Doe', icon: 'file', color: 'blue' },
    { id: 2, type: 'quotation', action: 'Quotation Received', description: 'TechCorp submitted quotation for RFQ-2024-001', timestamp: '2024-06-06T09:15:00', user: 'TechCorp', icon: 'dollar', color: 'green' },
    { id: 3, type: 'po', action: 'PO Approved', description: 'Purchase Order PO-2024-045 approved by Sarah Smith', timestamp: '2024-06-06T08:30:00', user: 'Sarah Smith', icon: 'cart', color: 'purple' },
    { id: 4, type: 'invoice', action: 'Invoice Generated', description: 'Invoice INV-2024-089 generated for PO-2024-045', timestamp: '2024-06-06T08:00:00', user: 'System', icon: 'dollar', color: 'yellow' },
    { id: 5, type: 'vendor', action: 'Vendor Updated', description: 'TechCorp profile information updated', timestamp: '2024-06-05T16:45:00', user: 'Admin', icon: 'user', color: 'blue' },
    { id: 6, type: 'user', action: 'User Login', description: 'John Doe logged in from 192.168.1.1', timestamp: '2024-06-05T09:00:00', user: 'John Doe', icon: 'user', color: 'green' },
    { id: 7, type: 'rfq', action: 'RFQ Approved', description: 'RFQ-2024-002 approved by John Doe', timestamp: '2024-06-05T14:00:00', user: 'John Doe', icon: 'check', color: 'green' },
    { id: 8, type: 'po', action: 'Items Received', description: 'All items received for PO-2024-042', timestamp: '2024-06-05T11:00:00', user: 'Warehouse', icon: 'cart', color: 'purple' },
  ];

  const getActivityType = (entity = '') => {
    const normalized = entity.toLowerCase();
    if (normalized.includes('purchase')) return 'po';
    if (normalized.includes('rfq')) return 'rfq';
    if (normalized.includes('quotation')) return 'quotation';
    if (normalized.includes('invoice')) return 'invoice';
    if (normalized.includes('vendor')) return 'vendor';
    if (normalized.includes('user')) return 'user';
    return normalized || 'system';
  };

  const activities = apiActivities.length
    ? apiActivities.map((log) => {
        const type = getActivityType(log.entity);
        const user = log.user?.name || 'System';
        return {
          id: log._id,
          type,
          action: log.action || 'Activity',
          description: `${log.action || 'Activity'}${log.entity ? ` on ${log.entity}` : ''}`,
          timestamp: log.createdAt,
          user,
          icon: type === 'po' ? 'cart' : type === 'invoice' ? 'dollar' : type === 'vendor' || type === 'user' ? 'user' : 'file',
          color: type === 'invoice' ? 'yellow' : type === 'po' ? 'purple' : type === 'vendor' ? 'green' : 'blue',
        };
      })
    : fallbackActivities;

  const timelineActivities = activities.map(a => ({
    title: a.action,
    description: a.description,
    timestamp: a.timestamp,
    icon: a.icon,
    color: a.color,
    user: a.user,
  }));

  const columns = [
    { key: 'action', title: 'Action', render: (val, row) => (
      <div>
        <p className="font-medium text-slate-900 dark:text-white">{val}</p>
        <p className="text-xs text-slate-500">{row.description}</p>
      </div>
    )},
    { key: 'type', title: 'Type', width: '120px', render: (val) => (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800 dark:bg-dark-700 dark:text-slate-300 capitalize">
        {val}
      </span>
    )},
    { key: 'user', title: 'User', width: '150px', render: (val) => (
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
          <span className="text-xs font-semibold text-primary-700 dark:text-primary-400">{val[0]}</span>
        </div>
        <span className="text-sm text-slate-700 dark:text-slate-300">{val}</span>
      </div>
    )},
    { key: 'timestamp', title: 'Time', width: '180px', render: (val) => (
      <span className="text-sm text-slate-500">{new Date(val).toLocaleString()}</span>
    )},
  ];

  const filteredActivities = activities.filter(a => 
    (filter === 'all' || a.type === filter) &&
    (a.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.user.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Activity Logs</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Track all activities and changes in the system.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/audit-trail">
            <Button variant="secondary">Audit Trail</Button>
          </Link>
          <Button variant="secondary" leftIcon={<Download className="w-4 h-4" />}>Export</Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Activities" value={stats?.total ?? activities.length} change={isLoading ? 'Loading' : undefined} changeType="neutral" icon={Activity} color="blue" />
        <StatCard title="Today" value={stats?.today ?? activities.length} icon={Activity} color="green" />
        <StatCard title="RFQ Activities" value={stats?.byEntity?.RFQ ?? activities.filter((a) => a.type === 'rfq').length} icon={FileText} color="orange" />
        <StatCard title="PO Activities" value={stats?.byEntity?.PurchaseOrder ?? activities.filter((a) => a.type === 'po').length} icon={ShoppingCart} color="purple" />
      </div>

      {/* Filters */}
      <div className="card p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder="Search activities..." className="flex-1" />
          <select 
            className="input-field w-40"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="rfq">RFQ</option>
            <option value="quotation">Quotation</option>
            <option value="po">Purchase Order</option>
            <option value="invoice">Invoice</option>
            <option value="vendor">Vendor</option>
            <option value="user">User</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnalyticsCard title="Activity Timeline" action={<span className="text-sm text-slate-500">Last 24 hours</span>}>
          <ActivityTimeline activities={timelineActivities.slice(0, 6)} />
        </AnalyticsCard>

        <AnalyticsCard title="Detailed Log">
          <DataTable columns={columns} data={filteredActivities} pageSize={10} />
        </AnalyticsCard>
      </div>
    </div>
  );
};

export default ActivityLogs;
