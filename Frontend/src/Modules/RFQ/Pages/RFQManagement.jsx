import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Filter, FileText, Calendar, DollarSign, Users, Clock, MoreHorizontal, Edit2, Trash2, Eye } from 'lucide-react';
import Button from '../../../components/common/Button';
import SearchBar from '../../../components/common/SearchBar';
import DataTable from '../../../components/common/DataTable';
import StatusBadge from '../../../components/common/StatusBadge';
import StatCard from '../../../components/cards/StatCard';
import Modal from '../../../components/common/Modal';
import { useRFQ } from '../hooks/useRFQ';

const RFQManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedRFQ, setSelectedRFQ] = useState(null);
  const { rfqs, loading, fetchRFQs } = useRFQ();

  useEffect(() => {
    fetchRFQs().catch((error) => console.error('Failed to fetch RFQs', error));
  }, [fetchRFQs]);

  const rows = useMemo(() => rfqs.map((rfq) => ({
    ...rfq,
    id: rfq._id,
    category: rfq.items?.[0]?.unit || '-',
    vendor: rfq.assignedVendors?.map((vendor) => vendor.name).join(', ') || '-',
    deadline: rfq.deadline ? new Date(rfq.deadline).toLocaleDateString() : '-',
    budget: rfq.items?.reduce((sum, item) => sum + (item.quantity || 0), 0) || 0,
    responses: rfq.quotationCount || 0,
    created: rfq.createdAt ? new Date(rfq.createdAt).toLocaleDateString() : '-',
  })), [rfqs]);

  const columns = [
    { key: 'id', title: 'RFQ ID', width: '130px' },
    { key: 'title', title: 'Title', render: (val, row) => (
      <div>
        <p className="font-medium text-slate-900 dark:text-white">{val}</p>
        <p className="text-xs text-slate-500">{row.category}</p>
      </div>
    )},
    { key: 'vendor', title: 'Vendor', render: (val) => (
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
          <span className="text-xs font-semibold text-primary-700 dark:text-primary-400">{val[0]}</span>
        </div>
        <span className="text-sm text-slate-700 dark:text-slate-300">{val}</span>
      </div>
    )},
    { key: 'budget', title: 'Budget', width: '120px', render: (val) => (
      <span className="text-sm font-medium text-slate-900 dark:text-white">${val.toLocaleString()}</span>
    )},
    { key: 'deadline', title: 'Deadline', width: '120px', render: (val) => (
      <div className="flex items-center gap-1 text-sm text-slate-600 dark:text-slate-300">
        <Calendar className="w-3.5 h-3.5" />
        {val}
      </div>
    )},
    { key: 'responses', title: 'Responses', width: '100px', render: (val) => (
      <div className="flex items-center gap-1">
        <Users className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-sm text-slate-600 dark:text-slate-300">{val}</span>
      </div>
    )},
    { key: 'status', title: 'Status', width: '120px', render: (val) => <StatusBadge status={val} /> },
    { key: 'actions', title: '', width: '120px', render: (_, row) => (
      <div className="flex items-center gap-1">
        <Link to={`/rfqs/${row._id}`} className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-dark-700 text-slate-400 hover:text-slate-600">
          <Eye className="w-4 h-4" />
        </Link>
        <button className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-dark-700 text-slate-400 hover:text-slate-600">
          <Edit2 className="w-4 h-4" />
        </button>
        <button 
          onClick={() => { setSelectedRFQ(row); setShowDeleteModal(true); }}
          className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-slate-400 hover:text-red-600"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    )},
  ];

  const filteredRFQs = rows.filter(r => 
    r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.vendor.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const activeRFQs = rows.filter((rfq) => rfq.status === 'open').length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">RFQ Management</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Manage and track your Request for Quotations.</p>
        </div>
        <Link to="/rfqs/create">
          <Button variant="primary" leftIcon={<Plus className="w-4 h-4" />}>Create RFQ</Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total RFQs" value={rows.length} change={loading ? 'Loading' : undefined} changeType="neutral" icon={FileText} color="blue" />
        <StatCard title="Active RFQs" value={activeRFQs} icon={Clock} color="orange" />
        <StatCard title="Closed" value={rows.filter((rfq) => rfq.status === 'closed').length} icon={FileText} color="yellow" />
        <StatCard title="Total Items" value={rows.reduce((sum, rfq) => sum + rfq.budget, 0)} icon={DollarSign} color="green" />
      </div>

      {/* Filters */}
      <div className="card p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder="Search RFQs..." className="flex-1" />
          <Button variant="secondary" leftIcon={<Filter className="w-4 h-4" />}>Filter</Button>
        </div>
      </div>

      {/* RFQs Table */}
      <div className="card overflow-hidden">
        <DataTable columns={columns} data={filteredRFQs} pageSize={10} />
      </div>

      {/* Delete Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete RFQ"
        footer={
          <>
            <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
            <Button variant="danger" onClick={() => setShowDeleteModal(false)}>Delete</Button>
          </>
        }
      >
        <p className="text-slate-600 dark:text-slate-300">
          Are you sure you want to delete <strong>{selectedRFQ?.id}</strong>? This action cannot be undone.
        </p>
      </Modal>
    </div>
  );
};

export default RFQManagement;
