import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Filter, Star, Building2, MapPin, Phone, Mail, MoreHorizontal, Edit2, Trash2, Eye } from 'lucide-react';
import Button from '../../../components/common/Button';
import SearchBar from '../../../components/common/SearchBar';
import DataTable from '../../../components/common/DataTable';
import StatusBadge from '../../../components/common/StatusBadge';
import StatCard from '../../../components/cards/StatCard';
import Modal from '../../../components/common/Modal';
import { useVendor } from '../hooks/useVendor';
import { formatCompactNumber } from '../../../utils/formatCurrency';

const VendorManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const { vendors, loading, fetchVendors, deleteVendor } = useVendor();

  useEffect(() => {
    fetchVendors().catch((error) => console.error('Failed to fetch vendors', error));
  }, [fetchVendors]);

  const rows = useMemo(() => vendors.map((vendor) => ({
    ...vendor,
    id: vendor._id,
    contact: vendor.contact || vendor.name,
    location: vendor.address || '-',
    rating: vendor.rating || '-',
    totalSpend: vendor.totalSpend || 0,
    orders: vendor.orders || 0,
  })), [vendors]);

  const columns = [
    { key: 'name', title: 'Vendor', render: (val, row) => (
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
          <Building2 className="w-5 h-5 text-primary-600 dark:text-primary-400" />
        </div>
        <div>
          <p className="font-medium text-slate-900 dark:text-white">{val}</p>
          <p className="text-xs text-slate-500">{row.category}</p>
        </div>
      </div>
    )},
    { key: 'contact', title: 'Contact', render: (val, row) => (
      <div>
        <p className="text-sm text-slate-900 dark:text-white">{val}</p>
        <p className="text-xs text-slate-500">{row.email}</p>
      </div>
    )},
    { key: 'location', title: 'Location', render: (val) => (
      <div className="flex items-center gap-1 text-sm text-slate-600 dark:text-slate-300">
        <MapPin className="w-3.5 h-3.5" />
        {val}
      </div>
    )},
    { key: 'rating', title: 'Rating', render: (val) => (
      <div className="flex items-center gap-1">
        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
        <span className="text-sm font-medium text-slate-900 dark:text-white">{val}</span>
      </div>
    )},
    { key: 'totalSpend', title: 'Total Spend', render: (val) => (
      <span className="text-sm font-medium text-slate-900 dark:text-white">${(val/1000).toFixed(0)}K</span>
    )},
    { key: 'orders', title: 'Orders', render: (val) => (
      <span className="text-sm text-slate-600 dark:text-slate-300">{val}</span>
    )},
    { key: 'status', title: 'Status', render: (val) => <StatusBadge status={val} /> },
    { key: 'actions', title: '', width: '120px', render: (_, row) => (
      <div className="flex items-center gap-1">
        <Link to={`/vendors/${row._id}`} className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-dark-700 text-slate-400 hover:text-slate-600">
          <Eye className="w-4 h-4" />
        </Link>
        <Link to={`/vendors/${row._id}/edit`} className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-dark-700 text-slate-400 hover:text-slate-600">
          <Edit2 className="w-4 h-4" />
        </Link>
        <button 
          onClick={() => { setSelectedVendor(row); setShowDeleteModal(true); }}
          className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-slate-400 hover:text-red-600"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    )},
  ];

  const filteredVendors = rows.filter(v => 
    v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (v.category || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.contact.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const activeVendors = rows.filter((vendor) => vendor.status === 'active').length;
  const totalSpend = rows.reduce((sum, vendor) => sum + (vendor.totalSpend || 0), 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Vendor Management</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Manage your supplier network and relationships.</p>
        </div>
        <Link to="/vendors/add">
          <Button variant="primary" leftIcon={<Plus className="w-4 h-4" />}>Add Vendor</Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Vendors" value={rows.length} change={loading ? 'Loading' : undefined} changeType="neutral" icon={Building2} color="blue" />
        <StatCard title="Active Vendors" value={activeVendors} icon={Building2} color="green" />
        <StatCard title="Categories" value={new Set(rows.map((vendor) => vendor.category).filter(Boolean)).size} icon={Star} color="orange" />
        <StatCard title="Total Spend" value={formatCompactNumber(totalSpend)} icon={Building2} color="purple" />
      </div>

      {/* Filters */}
      <div className="card p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder="Search vendors..." className="flex-1" />
          <Button variant="secondary" leftIcon={<Filter className="w-4 h-4" />}>Filter</Button>
        </div>
      </div>

      {/* Vendors Table */}
      <div className="card overflow-hidden">
        <DataTable columns={columns} data={filteredVendors} pageSize={10} />
      </div>

      {/* Delete Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Vendor"
        footer={
          <>
            <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
            <Button variant="danger" onClick={async () => {
              if (selectedVendor?._id) await deleteVendor(selectedVendor._id);
              setShowDeleteModal(false);
            }}>Delete</Button>
          </>
        }
      >
        <p className="text-slate-600 dark:text-slate-300">
          Are you sure you want to delete <strong>{selectedVendor?.name}</strong>? This action cannot be undone.
        </p>
      </Modal>
    </div>
  );
};

export default VendorManagement;
