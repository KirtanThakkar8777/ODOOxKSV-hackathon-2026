import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Calendar, DollarSign, Truck } from 'lucide-react';
import DataTable from '../../../components/common/DataTable';
import StatusBadge from '../../../components/common/StatusBadge';

const PurchaseOrderTable = ({ orders }) => {
  const columns = [
    { key: 'id', title: 'PO ID', width: '130px' },
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
  ];

  return <DataTable columns={columns} data={orders} pageSize={10} />;
};

export default PurchaseOrderTable;