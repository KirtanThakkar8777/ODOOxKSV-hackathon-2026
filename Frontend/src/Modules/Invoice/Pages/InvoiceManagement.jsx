import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Filter, Receipt, Calendar, DollarSign, CheckCircle, Clock, AlertTriangle, Download, Eye, MoreHorizontal, Edit2, Trash2 } from 'lucide-react';
import Button from '../../../components/common/Button';
import SearchBar from '../../../components/common/SearchBar';
import DataTable from '../../../components/common/DataTable';
import StatusBadge from '../../../components/common/StatusBadge';
import StatCard from '../../../components/cards/StatCard';
import Modal from '../../../components/common/Modal';
import { useInvoice } from '../hooks/useInvoice';
import { formatCompactNumber } from '../../../utils/formatCurrency';

const InvoiceManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const { invoices, loading, fetchInvoices, deleteInvoice } = useInvoice();

  useEffect(() => {
    fetchInvoices().catch((error) => console.error('Failed to fetch invoices', error));
  }, [fetchInvoices]);

  const rows = useMemo(() => invoices.map((invoice) => ({
    ...invoice,
    id: invoice._id,
    invoiceNumber: invoice.invoiceNumber || invoice._id,
    po: invoice.purchaseOrder?.poNumber || invoice.purchaseOrder?._id || '-',
    purchaseOrderId: invoice.purchaseOrder?._id || invoice.purchaseOrder,
    vendor: invoice.vendor?.name || '-',
    amount: invoice.totalAmount || 0,
    dueDate: invoice.createdAt ? new Date(invoice.createdAt).toLocaleDateString() : '-',
    created: invoice.createdAt ? new Date(invoice.createdAt).toLocaleDateString() : '-',
  })), [invoices]);

  const columns = [
    { key: 'invoiceNumber', title: 'Invoice ID', width: '130px' },
    { key: 'po', title: 'PO', width: '130px', render: (val) => (
      <Link to={`/purchase-orders/${row.purchaseOrderId || val}`} className="text-sm text-primary-600 hover:underline">{val}</Link>
    )},
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
    { key: 'dueDate', title: 'Due Date', width: '120px', render: (val) => (
      <div className="flex items-center gap-1 text-sm text-slate-600 dark:text-slate-300">
        <Calendar className="w-3.5 h-3.5" />
        {val}
      </div>
    )},
    { key: 'status', title: 'Status', width: '120px', render: (val) => <StatusBadge status={val} /> },
    { key: 'actions', title: '', width: '120px', render: (_, row) => (
      <div className="flex items-center gap-1">
        <Link to={`/invoices/${row._id}`} className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-dark-700 text-slate-400 hover:text-slate-600">
          <Eye className="w-4 h-4" />
        </Link>
        <button className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-dark-700 text-slate-400 hover:text-slate-600">
          <Download className="w-4 h-4" />
        </button>
        <button 
          onClick={() => { setSelectedInvoice(row); setShowDeleteModal(true); }}
          className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-slate-400 hover:text-red-600"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    )},
  ];

  const filteredInvoices = rows.filter(i => 
    i.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    i.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    i.vendor.toLowerCase().includes(searchQuery.toLowerCase()) ||
    i.po.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const totalAmount = rows.reduce((sum, invoice) => sum + invoice.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Invoice Management</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Manage and track invoices.</p>
        </div>
        <Link to="/invoices/generate">
          <Button variant="primary" leftIcon={<Plus className="w-4 h-4" />}>Generate Invoice</Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Invoices" value={rows.length} change={loading ? 'Loading' : undefined} changeType="neutral" icon={Receipt} color="blue" />
        <StatCard title="Paid" value={rows.filter((invoice) => invoice.status === 'paid').length} icon={CheckCircle} color="green" />
        <StatCard title="Sent" value={rows.filter((invoice) => invoice.status === 'sent').length} icon={Clock} color="orange" />
        <StatCard title="Total Amount" value={formatCompactNumber(totalAmount)} icon={AlertTriangle} color="red" />
      </div>

      {/* Filters */}
      <div className="card p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder="Search invoices..." className="flex-1" />
          <Button variant="secondary" leftIcon={<Filter className="w-4 h-4" />}>Filter</Button>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="card overflow-hidden">
        <DataTable columns={columns} data={filteredInvoices} pageSize={10} />
      </div>

      {/* Delete Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Invoice"
        footer={
          <>
            <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
            <Button variant="danger" onClick={async () => {
              if (selectedInvoice?._id) await deleteInvoice(selectedInvoice._id);
              setShowDeleteModal(false);
            }}>Delete</Button>
          </>
        }
      >
        <p className="text-slate-600 dark:text-slate-300">
          Are you sure you want to delete <strong>{selectedInvoice?.id}</strong>? This action cannot be undone.
        </p>
      </Modal>
    </div>
  );
};

export default InvoiceManagement;
