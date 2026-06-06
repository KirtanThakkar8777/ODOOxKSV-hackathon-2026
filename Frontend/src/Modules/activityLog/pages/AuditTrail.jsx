import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search, Filter, Shield, AlertTriangle, CheckCircle, Clock, Download, Eye } from 'lucide-react';
import Button from '../../../components/common/Button';
import SearchBar from '../../../components/common/SearchBar';
import DataTable from '../../../components/common/DataTable';
import AnalyticsCard from '../../../components/cards/AnalyticsCard';
import StatCard from '../../../components/cards/StatCard';
import { activityLogAPI } from '../../../services/api';

const AuditTrail = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [apiAudits, setApiAudits] = useState([]);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const loadAuditTrail = async () => {
      try {
        const [auditResponse, statsResponse] = await Promise.all([
          activityLogAPI.getAuditTrail({ limit: 200 }),
          activityLogAPI.getStats(),
        ]);
        setApiAudits(auditResponse.data || []);
        setStats(statsResponse.data || null);
      } catch (error) {
        console.error('Failed to load audit trail', error);
      }
    };

    loadAuditTrail();
  }, []);

  const fallbackAudits = [
    { id: 1, entity: 'RFQ-2024-001', entityType: 'RFQ', action: 'Created', field: null, oldValue: null, newValue: null, user: 'John Doe', timestamp: '2024-06-06T10:00:00', ip: '192.168.1.100' },
    { id: 2, entity: 'RFQ-2024-001', entityType: 'RFQ', action: 'Updated', field: 'status', oldValue: 'draft', newValue: 'pending', user: 'John Doe', timestamp: '2024-06-06T10:05:00', ip: '192.168.1.100' },
    { id: 3, entity: 'QT-2024-045', entityType: 'Quotation', action: 'Created', field: null, oldValue: null, newValue: null, user: 'TechCorp', timestamp: '2024-06-06T09:15:00', ip: '203.0.113.1' },
    { id: 4, entity: 'PO-2024-045', entityType: 'PO', action: 'Created', field: null, oldValue: null, newValue: null, user: 'Sarah Smith', timestamp: '2024-06-06T08:30:00', ip: '192.168.1.101' },
    { id: 5, entity: 'PO-2024-045', entityType: 'PO', action: 'Updated', field: 'status', oldValue: 'pending', newValue: 'approved', user: 'Sarah Smith', timestamp: '2024-06-06T08:35:00', ip: '192.168.1.101' },
    { id: 6, entity: 'User-001', entityType: 'User', action: 'Login', field: null, oldValue: null, newValue: null, user: 'John Doe', timestamp: '2024-06-06T08:00:00', ip: '192.168.1.100' },
    { id: 7, entity: 'Vendor-001', entityType: 'Vendor', action: 'Updated', field: 'rating', oldValue: '4.5', newValue: '4.8', user: 'Admin', timestamp: '2024-06-05T16:45:00', ip: '192.168.1.102' },
  ];

  const audits = apiAudits.length
    ? apiAudits.map((log) => ({
        id: log._id,
        entity: log.entityId || log.entity || 'System',
        entityType: log.entity || 'System',
        action: log.action || 'Activity',
        field: null,
        oldValue: null,
        newValue: null,
        user: log.user?.name || 'System',
        timestamp: log.createdAt,
        ip: '-',
      }))
    : fallbackAudits;

  const columns = [
    { key: 'timestamp', title: 'Timestamp', width: '180px', render: (val) => (
      <span className="text-sm text-slate-500">{new Date(val).toLocaleString()}</span>
    )},
    { key: 'entity', title: 'Entity', render: (val, row) => (
      <div>
        <p className="font-medium text-slate-900 dark:text-white">{val}</p>
        <p className="text-xs text-slate-500">{row.entityType}</p>
      </div>
    )},
    { key: 'action', title: 'Action', width: '100px', render: (val) => (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        val === 'Created' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
        val === 'Updated' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' :
        val === 'Deleted' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' :
        'bg-slate-100 text-slate-800 dark:bg-dark-700 dark:text-slate-300'
      }`}>
        {val}
      </span>
    )},
    { key: 'field', title: 'Field', width: '120px', render: (val) => val ? <span className="text-sm text-slate-600">{val}</span> : <span className="text-sm text-slate-400">-</span> },
    { key: 'oldValue', title: 'Old Value', width: '120px', render: (val) => val ? <span className="text-sm text-red-600 line-through">{val}</span> : <span className="text-sm text-slate-400">-</span> },
    { key: 'newValue', title: 'New Value', width: '120px', render: (val) => val ? <span className="text-sm text-green-600 font-medium">{val}</span> : <span className="text-sm text-slate-400">-</span> },
    { key: 'user', title: 'User', width: '150px', render: (val) => (
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
          <span className="text-xs font-semibold text-primary-700 dark:text-primary-400">{val[0]}</span>
        </div>
        <span className="text-sm text-slate-700 dark:text-slate-300">{val}</span>
      </div>
    )},
    { key: 'ip', title: 'IP Address', width: '120px', render: (val) => <span className="text-sm text-slate-500 font-mono">{val}</span> },
  ];

  const filteredAudits = audits.filter(a => 
    a.entity.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.action.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/activity-logs" className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-dark-700 text-slate-500 dark:text-slate-400">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Audit Trail</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Complete audit history of all changes.</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Events" value={stats?.total ?? audits.length} icon={Shield} color="blue" />
        <StatCard title="Created" value={audits.filter((a) => a.action.toLowerCase().includes('created')).length} icon={CheckCircle} color="green" />
        <StatCard title="Updated" value={audits.filter((a) => a.action.toLowerCase().includes('updated')).length} icon={Clock} color="orange" />
        <StatCard title="Deleted" value={audits.filter((a) => a.action.toLowerCase().includes('deleted')).length} icon={AlertTriangle} color="red" />
      </div>

      {/* Filters */}
      <div className="card p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder="Search audit records..." className="flex-1" />
          <Button variant="secondary" leftIcon={<Filter className="w-4 h-4" />}>Filter</Button>
          <Button variant="secondary" leftIcon={<Download className="w-4 h-4" />}>Export</Button>
        </div>
      </div>

      <AnalyticsCard title="Audit Records">
        <DataTable columns={columns} data={filteredAudits} pageSize={10} />
      </AnalyticsCard>
    </div>
  );
};

export default AuditTrail;
