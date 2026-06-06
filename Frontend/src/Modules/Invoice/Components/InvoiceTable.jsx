import React from 'react';
import { Link } from 'react-router-dom';
import { Receipt, Calendar, DollarSign, CheckCircle } from 'lucide-react';
import DataTable from '../../../components/common/DataTable';
import StatusBadge from '../../../components/common/StatusBadge';

const InvoiceTable = ({ invoices }) => {
  const columns = [
    { key: 'id', title: 'Invoice ID', width: '130px' },
    { key: 'po', title: 'PO', width: '130px', render: (val) => (
      <Link to={`/purchase-orders/${val}`} className="text-sm text-primary-600 hover:underline">{val}</Link>
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
  ];

  return <DataTable columns={columns} data={invoices} pageSize={10} />;
};

export default InvoiceTable;