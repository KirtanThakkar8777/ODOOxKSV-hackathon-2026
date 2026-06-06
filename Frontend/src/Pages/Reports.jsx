import React, { useEffect, useState } from 'react';
import { Download, Filter, Calendar, TrendingUp, DollarSign, Users, ShoppingCart, Package, Clock } from 'lucide-react';
import StatCard from '../components/cards/StatCard';
import AnalyticsCard from '../components/cards/AnalyticsCard';
import LineChart from '../components/charts/LineChart';
import BarChart from '../components/charts/BarChart';
import PieChart from '../components/charts/PieChart';
import Button from '../components/common/Button';
import DataTable from '../components/common/DataTable';
import StatusBadge from '../components/common/StatusBadge';
import { reportAPI } from '../services/api';
import { formatCompactNumber, formatCurrency } from '../utils/formatCurrency';

const Reports = () => {
  const [dateRange, setDateRange] = useState('last30');
  const [reportType, setReportType] = useState('overview');
  const [dashboardReport, setDashboardReport] = useState(null);
  const [vendorReport, setVendorReport] = useState(null);
  const [spendReport, setSpendReport] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadReports = async () => {
      setIsLoading(true);
      try {
        const [dashboardResponse, vendorResponse, spendResponse] = await Promise.all([
          reportAPI.getDashboard(),
          reportAPI.getVendor(),
          reportAPI.getSpend({ range: dateRange }),
        ]);
        setDashboardReport(dashboardResponse.data || null);
        setVendorReport(vendorResponse.data || null);
        setSpendReport(spendResponse.data || null);
      } catch (error) {
        console.error('Failed to load reports', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadReports();
  }, [dateRange]);

  const stats = dashboardReport?.stats || {};

  const spendTrendData = [
    { name: 'Jan', spend: 420000, savings: 25000 },
    { name: 'Feb', spend: 380000, savings: 32000 },
    { name: 'Mar', spend: 450000, savings: 28000 },
    { name: 'Apr', spend: 410000, savings: 35000 },
    { name: 'May', spend: 485000, savings: 42000 },
    { name: 'Jun', spend: 390000, savings: 31000 },
  ];

  const categorySpendData = [
    { name: 'IT Equipment', value: 35, spend: 840000 },
    { name: 'Office Supplies', value: 20, spend: 480000 },
    { name: 'Services', value: 25, spend: 600000 },
    { name: 'Raw Materials', value: 15, spend: 360000 },
    { name: 'Logistics', value: 5, spend: 120000 },
  ];

  const topVendorsData = [
    { name: 'TechCorp', orders: 45, spend: 1250000, rating: 4.8, status: 'active' },
    { name: 'GlobalSupply', orders: 38, spend: 980000, rating: 4.5, status: 'active' },
    { name: 'PrimeParts', orders: 32, spend: 750000, rating: 4.7, status: 'active' },
    { name: 'FastShip', orders: 28, spend: 520000, rating: 4.2, status: 'active' },
    { name: 'BuildRight', orders: 22, spend: 410000, rating: 4.6, status: 'active' },
  ];

  const liveSpendTrendData = dashboardReport?.spendTrend?.length
    ? dashboardReport.spendTrend.map((item) => ({
        name: item.name,
        spend: item.spend || 0,
        savings: 0,
      }))
    : spendTrendData;

  const liveCategorySpendData = spendReport?.orders?.length
    ? Object.values(spendReport.orders.reduce((acc, order) => {
        const name = order.vendor?.category || 'Uncategorized';
        const existing = acc[name] || { name, value: 0, spend: 0 };
        existing.spend += order.totalAmount || 0;
        existing.value += order.totalAmount || 0;
        acc[name] = existing;
        return acc;
      }, {}))
    : categorySpendData;

  const liveTopVendorsData = vendorReport?.topVendors?.length
    ? vendorReport.topVendors.slice(0, 5).map((item) => ({
        name: item.vendor?.name || 'Unknown vendor',
        orders: item.orders,
        spend: item.spend,
        rating: '-',
        status: item.vendor?.status || 'active',
      }))
    : topVendorsData;

  const vendorColumns = [
    { key: 'name', title: 'Vendor Name' },
    { key: 'orders', title: 'Total Orders', width: '120px' },
    { key: 'spend', title: 'Total Spend', width: '150px', render: (val) => `$${val.toLocaleString()}` },
    { key: 'rating', title: 'Rating', width: '100px', render: (val) => (
      <div className="flex items-center gap-1">
        <span className="text-yellow-500">★</span>
        <span className="text-sm">{val}</span>
      </div>
    )},
    { key: 'status', title: 'Status', width: '120px', render: (val) => <StatusBadge status={val} /> },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Reports & Analytics</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Comprehensive procurement insights and performance metrics.</p>
        </div>
        <div className="flex items-center gap-3">
          <select 
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="input-field text-sm py-2"
          >
            <option value="last7">Last 7 Days</option>
            <option value="last30">Last 30 Days</option>
            <option value="last90">Last 90 Days</option>
            <option value="last365">Last Year</option>
          </select>
          <Button variant="secondary" leftIcon={<Download className="w-4 h-4" />}>Export</Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Spend" value={formatCompactNumber(stats.totalSpend ?? 0)} change={isLoading ? 'Loading' : undefined} changeType="neutral" icon={DollarSign} color="green" />
        <StatCard title="Cost Savings" value={formatCurrency(0)} icon={TrendingUp} color="blue" />
        <StatCard title="Active Vendors" value={stats.activeVendors ?? 0} icon={Users} color="purple" />
        <StatCard title="Total Orders" value={stats.purchaseOrders ?? 0} icon={ShoppingCart} color="orange" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnalyticsCard title="Spend vs Savings Trend">
          <LineChart 
            data={liveSpendTrendData}
            lines={[
              { key: 'spend', name: 'Total Spend', color: '#3b82f6' },
              { key: 'savings', name: 'Cost Savings', color: '#10b981' },
            ]}
            height={300}
          />
        </AnalyticsCard>

        <AnalyticsCard title="Spend by Category">
          <PieChart data={liveCategorySpendData} height={300} />
        </AnalyticsCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnalyticsCard title="Monthly Spend Breakdown">
          <BarChart 
            data={liveSpendTrendData}
            bars={[{ key: 'spend', name: 'Spend', color: '#3b82f6' }]}
            height={300}
          />
        </AnalyticsCard>

        <AnalyticsCard title="Top Performing Vendors">
          <DataTable 
            columns={vendorColumns}
            data={liveTopVendorsData}
            pagination={false}
            pageSize={5}
          />
        </AnalyticsCard>
      </div>

      {/* Procurement Performance */}
      <AnalyticsCard title="Procurement Performance Metrics">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-dark-700/50">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Avg RFQ Response Time</p>
                <p className="text-xl font-bold text-slate-900 dark:text-white">2.4 days</p>
              </div>
            </div>
            <div className="w-full bg-slate-200 dark:bg-dark-600 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: '75%' }} />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-dark-700/50">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <Package className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">On-Time Delivery</p>
                <p className="text-xl font-bold text-slate-900 dark:text-white">94.2%</p>
              </div>
            </div>
            <div className="w-full bg-slate-200 dark:bg-dark-600 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '94%' }} />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-dark-700/50">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Budget Utilization</p>
                <p className="text-xl font-bold text-slate-900 dark:text-white">78.5%</p>
              </div>
            </div>
            <div className="w-full bg-slate-200 dark:bg-dark-600 rounded-full h-2">
              <div className="bg-purple-500 h-2 rounded-full" style={{ width: '78%' }} />
            </div>
          </div>
        </div>
      </AnalyticsCard>
    </div>
  );
};

export default Reports;
