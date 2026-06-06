import React from 'react';
import { Activity, FileText, ShoppingCart, CheckCircle, User, DollarSign } from 'lucide-react';
import DataTable from '../../../components/common/DataTable';

const ActivityTable = ({ activities }) => {
  const iconMap = {
    rfq: FileText,
    quotation: DollarSign,
    po: ShoppingCart,
    invoice: DollarSign,
    vendor: User,
    user: User,
  };

  const colorMap = {
    rfq: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
    quotation: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
    po: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
    invoice: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400',
    vendor: 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400',
    user: 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400',
  };

  const columns = [
    { key: 'action', title: 'Action', render: (val, row) => {
      const Icon = iconMap[row.type] || Activity;
      return (
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${colorMap[row.type] || colorMap.user}`}>
            <Icon className="w-4 h-4" />
          </div>
          <div>
            <p className="font-medium text-slate-900 dark:text-white">{val}</p>
            <p className="text-xs text-slate-500">{row.description}</p>
          </div>
        </div>
      );
    }},
    { key: 'type', title: 'Type', width: '120px', render: (val) => (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800 dark:bg-dark-700 dark:text-slate-300 capitalize">
        {val}
      </span>
    )},
    { key: 'user', title: 'User', width: '150px', render: (val) => (
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
          <span className="text-xs font-semibold text-primary-700 dark:text-primary-400">{val[0]}</span>
        </div>
        <span className="text-sm text-slate-700 dark:text-slate-300">{val}</span>
      </div>
    )},
    { key: 'timestamp', title: 'Time', width: '180px', render: (val) => (
      <span className="text-sm text-slate-500">{new Date(val).toLocaleString()}</span>
    )},
  ];

  return <DataTable columns={columns} data={activities} pageSize={10} />;
};

export default ActivityTable;