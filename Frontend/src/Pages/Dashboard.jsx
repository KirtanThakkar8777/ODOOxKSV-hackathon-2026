import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Building2,
  FileText,
  Quote,
  ShoppingCart,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  DollarSign,
  Users,
  Package,
  Activity,
  CheckCircle,
  Clock,
  AlertTriangle,
} from 'lucide-react';
import StatCard from '../components/cards/StatCard';
import AnalyticsCard from '../components/cards/AnalyticsCard';
import ExecutiveCard from '../components/cards/ExecutiveCard';
import LineChart from '../components/charts/LineChart';
import BarChart from '../components/charts/BarChart';
import DonutChart from '../components/charts/DonutChart';
import ActivityTimeline from '../components/timeline/ActivityTimeline';
import StatusBadge from '../components/common/StatusBadge';
import DataTable from '../components/common/DataTable';
import Button from '../components/common/Button';
import { activityLogAPI, reportAPI, rfqAPI } from '../services/api';
import { formatCompactNumber, formatCurrency } from '../utils/formatCurrency';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [apiRFQs, setApiRFQs] = useState([]);
  const [apiActivities, setApiActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadDashboard = async () => {
      setIsLoading(true);
      try {
        const [dashboardResponse, rfqResponse, activityResponse] = await Promise.all([
          reportAPI.getDashboard(),
          rfqAPI.getAll(),
          activityLogAPI.getAll({ limit: 5 }),
        ]);
        setDashboardData(dashboardResponse.data || null);
        setApiRFQs(rfqResponse.data || []);
        setApiActivities(activityResponse.data || []);
      } catch (error) {
        console.error('Failed to load dashboard data', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboard();
  }, []);

  const stats = dashboardData?.stats || {};

  const spendData = [
    { name: 'Jan', actual: 420000, projected: 400000 },
    { name: 'Feb', actual: 380000, projected: 420000 },
    { name: 'Mar', actual: 450000, projected: 440000 },
    { name: 'Apr', actual: 410000, projected: 430000 },
    { name: 'May', actual: 485000, projected: 460000 },
    { name: 'Jun', actual: 390000, projected: 450000 },
  ];

  const liveSpendData = dashboardData?.spendTrend?.length
    ? dashboardData.spendTrend.map((item) => ({
        name: item.name,
        actual: item.spend || 0,
        projected: item.spend || 0,
      }))
    : spendData;

  const vendorData = [
    { name: 'TechCorp', value: 35 },
    { name: 'GlobalSupply', value: 25 },
    { name: 'PrimeParts', value: 20 },
    { name: 'FastShip', value: 15 },
    { name: 'Others', value: 5 },
  ];

  const rfqStatusData = [
    { name: 'Open', value: 12, color: '#3b82f6' },
    { name: 'Closed', value: 8, color: '#10b981' },
    { name: 'Draft', value: 3, color: '#f59e0b' },
  ];

  const recentRFQs = [
    { id: 'RFQ-2024-001', title: 'IT Equipment Procurement', vendor: 'TechCorp', amount: '$125,000', status: 'pending', date: '2024-06-05' },
    { id: 'RFQ-2024-002', title: 'Office Furniture Supply', vendor: 'GlobalSupply', amount: '$45,000', status: 'approved', date: '2024-06-04' },
    { id: 'RFQ-2024-003', title: 'Network Infrastructure', vendor: 'PrimeParts', amount: '$280,000', status: 'in_progress', date: '2024-06-03' },
    { id: 'RFQ-2024-004', title: 'Security Systems', vendor: 'FastShip', amount: '$75,000', status: 'completed', date: '2024-06-02' },
    { id: 'RFQ-2024-005', title: 'Cloud Services', vendor: 'TechCorp', amount: '$95,000', status: 'pending', date: '2024-06-01' },
  ];

  const liveRecentRFQs = apiRFQs.length
    ? apiRFQs.slice(0, 5).map((rfq) => ({
        id: rfq._id,
        title: rfq.title,
        vendor: rfq.assignedVendors?.[0]?.name || '-',
        amount: rfq.items?.length ? `${rfq.items.length} items` : '-',
        status: rfq.status,
        date: rfq.createdAt ? new Date(rfq.createdAt).toLocaleDateString() : '-',
      }))
    : recentRFQs;

  const activities = [
    { title: 'RFQ Approved', description: 'RFQ-2024-002 approved by John Doe', timestamp: '2024-06-06T10:30:00', icon: 'check', color: 'green', user: 'John Doe' },
    { title: 'New Quotation', description: 'TechCorp submitted quotation for RFQ-2024-001', timestamp: '2024-06-06T09:15:00', icon: 'file', color: 'blue', user: 'TechCorp' },
    { title: 'PO Created', description: 'Purchase Order PO-2024-045 created', timestamp: '2024-06-05T16:45:00', icon: 'cart', color: 'purple', user: 'Sarah Smith' },
    { title: 'Invoice Generated', description: 'Invoice INV-2024-089 generated for PO-2024-042', timestamp: '2024-06-05T14:20:00', icon: 'dollar', color: 'yellow', user: 'System' },
    { title: 'Vendor Updated', description: 'TechCorp profile information updated', timestamp: '2024-06-05T11:00:00', icon: 'user', color: 'blue', user: 'Admin' },
  ];

  const liveActivities = apiActivities.length
    ? apiActivities.map((log) => {
        const entity = (log.entity || '').toLowerCase();
        return {
          title: log.action || 'Activity',
          description: `${log.action || 'Activity'}${log.entity ? ` on ${log.entity}` : ''}`,
          timestamp: log.createdAt,
          icon: entity.includes('purchase') ? 'cart' : entity.includes('invoice') ? 'dollar' : entity.includes('vendor') ? 'user' : 'file',
          color: entity.includes('purchase') ? 'purple' : entity.includes('invoice') ? 'yellow' : entity.includes('vendor') ? 'green' : 'blue',
          user: log.user?.name || 'System',
        };
      })
    : activities;

  const rfqColumns = [
    { key: 'id', title: 'RFQ ID', width: '120px' },
    { key: 'title', title: 'Title' },
    { key: 'vendor', title: 'Vendor' },
    { key: 'amount', title: 'Amount', width: '120px' },
    { key: 'status', title: 'Status', width: '120px', render: (val) => <StatusBadge status={val} /> },
    { key: 'date', title: 'Date', width: '120px' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-black">Dashboard</h1>
          <p className="text-sm text-slate-500 dark:text-black mt-1">Welcome back! Here's what's happening today.</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-slate-500 dark:text-black ">Last updated: Just now</span>
          <Button variant="secondary" size="sm">Refresh</Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total Vendors" 
          value={stats.totalVendors ?? 0}
          change={isLoading ? 'Loading' : undefined}
          changeType="neutral"
          icon={Building2}
          color="blue"
          subtitle="vs last month"
        />
        <StatCard 
          title="Active RFQs" 
          value={stats.activeRFQs ?? 0}
          change={undefined}
          changeType="neutral"
          icon={FileText}
          color="purple"
          subtitle="3 pending approval"
        />
        <StatCard 
          title="Pending Quotations" 
          value={stats.quotations ?? 0}
          change={undefined}
          changeType="neutral"
          icon={Quote}
          color="orange"
          subtitle="12 new this week"
        />
        <StatCard 
          title="Total Spend (YTD)" 
          value={formatCompactNumber(stats.totalSpend ?? 0)}
          change={undefined}
          changeType="neutral"
          icon={DollarSign}
          color="green"
          subtitle="Budget: $3.2M"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <AnalyticsCard title="Spend Analysis" className="lg:col-span-2">
          <LineChart 
            data={liveSpendData} 
            lines={[
              { key: 'actual', name: 'Actual Spend', color: '#3b82f6' },
              { key: 'projected', name: 'Projected', color: '#94a3b8' },
            ]}
            height={280}
          />
        </AnalyticsCard>

        <AnalyticsCard title="RFQ Status">
          <div className="flex items-center justify-center">
            <DonutChart data={rfqStatusData} height={220} />
          </div>
          <div className="mt-4 space-y-2">
            {rfqStatusData.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm text-slate-600 dark:text-black">{item.name}</span>
                </div>
                <span className="text-sm font-medium text-slate-900 dark:text-black">{item.value}</span>
              </div>
            ))}
          </div>
        </AnalyticsCard>
      </div>

      {/* Middle Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnalyticsCard 
          title="Recent RFQs" 
          action={<Link to="/rfqs" className="text-sm text-primary-600 hover:text-primary-700">View All</Link>}
        >
          <DataTable 
            columns={rfqColumns} 
            data={liveRecentRFQs} 
            pagination={false}
            pageSize={5}
          />
        </AnalyticsCard>

        <AnalyticsCard 
          title="Recent Activity" 
          action={<Link to="/activity-logs" className="text-sm text-primary-600 hover:text-primary-700">View All</Link>}
        >
          <ActivityTimeline activities={liveActivities} />
        </AnalyticsCard>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ExecutiveCard 
          title="Procurement Overview"
          metrics={[
            { icon: ShoppingCart, label: 'Total POs', value: stats.purchaseOrders ?? 0, changeType: 'neutral' },
            { icon: DollarSign, label: 'Total Spend', value: formatCurrency(stats.totalSpend ?? 0), changeType: 'neutral' },
            { icon: Package, label: 'Invoices', value: stats.invoices ?? 0, changeType: 'neutral' },
            { icon: Users, label: 'Active Vendors', value: stats.activeVendors ?? 0, changeType: 'neutral' },
          ]}
        />

        <AnalyticsCard title="Top Vendors by Spend">
          <BarChart 
            data={vendorData}
            bars={[{ key: 'value', name: 'Spend %' }]}
            height={220}
          />
        </AnalyticsCard>

        <AnalyticsCard title="Quick Actions">
          <div className="space-y-3">
            <Link to="/rfqs/create" className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-dark-700/50 hover:bg-slate-100 dark:hover:bg-dark-700 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-900 dark:text-black">Create New RFQ</p>
                <p className="text-xs text-slate-500 dark:text-black">Start a new procurement request</p>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </Link>
            <Link to="/vendors/add" className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-dark-700/50 hover:bg-slate-100 dark:hover:bg-dark-700 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-900 dark:text-black">Add Vendor</p>
                <p className="text-xs text-slate-500 dark:text-black-400">Onboard a new supplier</p>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </Link>
            <Link to="/purchase-orders/create" className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-dark-700/50 hover:bg-slate-100 dark:hover:bg-dark-700 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <ShoppingCart className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-900 dark:text-black">Create Purchase Order</p>
                <p className="text-xs text-slate-500 dark:text-black-400">Generate a new PO</p>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </Link>
            <Link to="/reports" className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-dark-700/50 hover:bg-slate-100 dark:hover:bg-dark-700 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-900 dark:text-black">View Reports</p>
                <p className="text-xs text-slate-500 dark:text-black-400">Analytics and insights</p>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </Link>
          </div>
        </AnalyticsCard>
      </div>
    </div>
  );
};

export default Dashboard;
