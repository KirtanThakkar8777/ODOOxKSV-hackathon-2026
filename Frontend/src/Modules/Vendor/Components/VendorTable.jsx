import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Star, MapPin, MoreHorizontal } from 'lucide-react';
import DataTable from '../../../components/common/DataTable';
import StatusBadge from '../../../components/common/StatusBadge';

const VendorTable = ({ vendors, onDelete }) => {
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
    { key: 'status', title: 'Status', render: (val) => <StatusBadge status={val} /> },
    { key: 'actions', title: '', width: '100px', render: (_, row) => (
      <div className="flex items-center gap-1">
        <Link to={`/vendors/${row.id}`} className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-dark-700 text-slate-400">
          View
        </Link>
      </div>
    )},
  ];

  return <DataTable columns={columns} data={vendors} pageSize={10} />;
};

export default VendorTable;