import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Filter, ShoppingCart, Calendar, DollarSign, Truck, CheckCircle, Clock, MoreHorizontal, Edit2, Trash2, Eye, FileText } from 'lucide-react';
import Button from '../../../components/common/Button';
import SearchBar from '../../../components/common/SearchBar';
import DataTable from '../../../components/common/DataTable';
import StatusBadge from '../../../components/common/StatusBadge';
import StatCard from '../../../components/cards/StatCard';
import Modal from '../../../components/common/Modal';
import { usePurchaseOrder } from '../hooks/usePurchaseOrder';
import { formatCompactNumber } from '../../../utils/formatCurrency';

const PurchaseOrders = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPO, setSelectedPO] = useState(null);
  const { purchaseOrders, loading, fetchPurchaseOrders, deletePurchaseOrder } = usePurchaseOrder();

  useEffect(() => {
    fetchPurchaseOrders().catch((error) => console.error('Failed to fetch purchase orders', error));
  }, [fetchPurchaseOrders]);

  const orders = useMemo(() => purchaseOrders.map((order) => ({
    ...order,
    id: order._id,
    poNumber: order.poNumber || order._id,
    vendor: order.vendor?.name || '-',
    rfq: order.rfq?.title || order.rfq?._id || order.rfq || '-',
    amount: order.totalAmount || 0,
    deliveryDate: order.createdAt ? new Date(order.createdAt).toLocaleDateString() : '-',
    items: order.items?.length || 0,
    created: order.createdAt ? new Date(order.createdAt).toLocaleDateString() : '-',
  })), [purchaseOrders]);

  const columns = [
    { key: 'poNumber', title: 'PO ID', width: '130px' },
    { key: 'vendor', title: 'Vendor', render: (val) => (
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
          <span className="text-xs font-semibold text-primary-700 dark:text-primary-400">{val[0]}</span>
        </div>
        <span className="text-sm text-slate-700 dark:text-slate-300">{val}</span>
      </div>
    )},
    { key: 'rfq', title: 'RFQ', width: '130px', render: (val) => (
      <Link to={`/rfqs/${val}`} className="text-sm text-primary-600 hover:underline">{val}</Link>
    )},
    { key: 'amount', title: 'Amount', width: '130px', render: (val) => (
      <span className="text-sm font-medium text-slate-900 dark:text-white">${val.toLocaleString()}</span>
    )},
    { key: 'deliveryDate', title: 'Delivery', width: '120px', render: (val) => (
      <div className="flex items-center gap-1 text-sm text-slate-600 dark:text-slate-300">
        <Truck className="w-3.5 h-3.5" />
        {val}
      </div>
    )},
    { key: 'items', title: 'Items', width: '80px', render: (val) => (
      <span className="text-sm text-slate-600 dark:text-slate-300">{val}</span>
    )},
    { key: 'status', title: 'Status', width: '120px', render: (val) => <StatusBadge status={val} /> },
    { key: 'actions', title: '', width: '120px', render: (_, row) => (
      <div className="flex items-center gap-1">
        <Link to={`/purchase-orders/${row._id}`} className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-dark-700 text-slate-400 hover:text-slate-600">
          <Eye className="w-4 h-4" />
        </Link>
        <button className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-dark-700 text-slate-400 hover:text-slate-600">
          <Edit2 className="w-4 h-4" />
        </button>
        <button 
          onClick={() => { setSelectedPO(row); setShowDeleteModal(true); }}
          className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-slate-400 hover:text-red-600"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    )},
  ];

  const filteredOrders = orders.filter(o => 
    o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.poNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.vendor.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.rfq.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const totalValue = orders.reduce((sum, order) => sum + order.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Purchase Orders</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Manage and track purchase orders.</p>
        </div>
        <Link to="/purchase-orders/create">
          <Button variant="primary" leftIcon={<Plus className="w-4 h-4" />}>Create PO</Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total POs" value={orders.length} change={loading ? 'Loading' : undefined} changeType="neutral" icon={ShoppingCart} color="blue" />
        <StatCard title="Pending" value={orders.filter((order) => order.status === 'pending').length} icon={Clock} color="orange" />
        <StatCard title="Approved" value={orders.filter((order) => order.status === 'approved').length} icon={CheckCircle} color="green" />
        <StatCard title="Total Value" value={formatCompactNumber(totalValue)} icon={DollarSign} color="purple" />
      </div>

      {/* Filters */}
      <div className="card p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder="Search purchase orders..." className="flex-1" />
          <Button variant="secondary" leftIcon={<Filter className="w-4 h-4" />}>Filter</Button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="card overflow-hidden">
        <DataTable columns={columns} data={filteredOrders} pageSize={10} />
      </div>

      {/* Delete Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Purchase Order"
        footer={
          <>
            <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
            <Button variant="danger" onClick={async () => {
              if (selectedPO?._id) await deletePurchaseOrder(selectedPO._id);
              setShowDeleteModal(false);
            }}>Delete</Button>
          </>
        }
      >
        <p className="text-slate-600 dark:text-slate-300">
          Are you sure you want to delete <strong>{selectedPO?.id}</strong>? This action cannot be undone.
        </p>
      </Modal>
    </div>
  );
};

export default PurchaseOrders;
