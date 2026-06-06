import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Filter, Quote, Calendar, DollarSign, CheckCircle, Clock, Star, MoreHorizontal, Edit2, Trash2, Eye, ArrowRightLeft } from 'lucide-react';
import Button from '../../../components/common/Button';
import SearchBar from '../../../components/common/SearchBar';
import DataTable from '../../../components/common/DataTable';
import StatusBadge from '../../../components/common/StatusBadge';
import StatCard from '../../../components/cards/StatCard';
import Modal from '../../../components/common/Modal';
import { useQuotation } from '../hooks/useQuotation';
import { formatCompactNumber } from '../../../utils/formatCurrency';

const QuotationManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedQuotation, setSelectedQuotation] = useState(null);
  const { quotations, loading, fetchQuotations, deleteQuotation } = useQuotation();

  useEffect(() => {
    fetchQuotations().catch((error) => console.error('Failed to fetch quotations', error));
  }, [fetchQuotations]);

  const rows = useMemo(() => quotations.map((quotation) => ({
    ...quotation,
    id: quotation._id,
    rfq: quotation.rfq?.title || quotation.rfq?._id || quotation.rfq || '-',
    vendor: quotation.vendor?.name || '-',
    amount: quotation.totalAmount || 0,
    delivery: quotation.deliveryDays ? `${quotation.deliveryDays} days` : '-',
    validity: quotation.createdAt ? new Date(quotation.createdAt).toLocaleDateString() : '-',
    submitted: quotation.createdAt ? new Date(quotation.createdAt).toLocaleDateString() : '-',
    rating: quotation.vendor?.rating || '-',
  })), [quotations]);

  const columns = [
    { key: 'id', title: 'Quotation ID', width: '130px' },
    { key: 'rfq', title: 'RFQ', width: '130px' },
    { key: 'vendor', title: 'Vendor', render: (val) => (
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
          <span className="text-xs font-semibold text-primary-700 dark:text-primary-400">{val[0]}</span>
        </div>
        <span className="text-sm text-slate-700 dark:text-slate-300">{val}</span>
      </div>
    )},
    { key: 'amount', title: 'Amount', width: '130px', render: (val) => (
      <span className="text-sm font-medium text-slate-900 dark:text-white">${val.toLocaleString()}</span>
    )},
    { key: 'delivery', title: 'Delivery', width: '120px', render: (val) => (
      <div className="flex items-center gap-1 text-sm text-slate-600 dark:text-slate-300">
        <Clock className="w-3.5 h-3.5" />
        {val}
      </div>
    )},
    { key: 'validity', title: 'Valid Until', width: '120px', render: (val) => (
      <div className="flex items-center gap-1 text-sm text-slate-600 dark:text-slate-300">
        <Calendar className="w-3.5 h-3.5" />
        {val}
      </div>
    )},
    { key: 'status', title: 'Status', width: '120px', render: (val) => <StatusBadge status={val} /> },
    { key: 'actions', title: '', width: '120px', render: (_, row) => (
      <div className="flex items-center gap-1">
        <Link to={`/quotations/${row._id}`} className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-dark-700 text-slate-400 hover:text-slate-600">
          <Eye className="w-4 h-4" />
        </Link>
        <button className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-dark-700 text-slate-400 hover:text-slate-600">
          <Edit2 className="w-4 h-4" />
        </button>
        <button 
          onClick={() => { setSelectedQuotation(row); setShowDeleteModal(true); }}
          className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-slate-400 hover:text-red-600"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    )},
  ];

  const filteredQuotations = rows.filter(q => 
    q.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    q.vendor.toLowerCase().includes(searchQuery.toLowerCase()) ||
    q.rfq.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const totalAmount = rows.reduce((sum, quotation) => sum + quotation.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Quotation Management</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Review and compare vendor quotations.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/quotations/compare">
            <Button variant="secondary" leftIcon={<ArrowRightLeft className="w-4 h-4" />}>Compare</Button>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Quotations" value={rows.length} change={loading ? 'Loading' : undefined} changeType="neutral" icon={Quote} color="blue" />
        <StatCard title="Pending Review" value={rows.filter((q) => q.status === 'submitted').length} icon={Clock} color="orange" />
        <StatCard title="Accepted" value={rows.filter((q) => q.status === 'accepted').length} icon={CheckCircle} color="green" />
        <StatCard title="Total Quoted" value={formatCompactNumber(totalAmount)} icon={DollarSign} color="purple" />
      </div>

      {/* Filters */}
      <div className="card p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder="Search quotations..." className="flex-1" />
          <Button variant="secondary" leftIcon={<Filter className="w-4 h-4" />}>Filter</Button>
        </div>
      </div>

      {/* Quotations Table */}
      <div className="card overflow-hidden">
        <DataTable columns={columns} data={filteredQuotations} pageSize={10} />
      </div>

      {/* Delete Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Quotation"
        footer={
          <>
            <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
            <Button variant="danger" onClick={async () => {
              if (selectedQuotation?._id) await deleteQuotation(selectedQuotation._id);
              setShowDeleteModal(false);
            }}>Delete</Button>
          </>
        }
      >
        <p className="text-slate-600 dark:text-slate-300">
          Are you sure you want to delete <strong>{selectedQuotation?.id}</strong>? This action cannot be undone.
        </p>
      </Modal>
    </div>
  );
};

export default QuotationManagement;
