import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Calendar, DollarSign, Users } from 'lucide-react';
import DataTable from '../../../components/common/DataTable';
import StatusBadge from '../../../components/common/StatusBadge';

const RFQTable = ({ rfqs }) => {
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
  ];

  return <DataTable columns={columns} data={rfqs} pageSize={10} />;
};

export default RFQTable;