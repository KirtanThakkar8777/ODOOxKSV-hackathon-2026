import React from 'react';
import { Activity, FileText, ShoppingCart, CheckCircle, User, DollarSign, Clock } from 'lucide-react';
import { formatDateTime } from '../../../utils/helpers';

const iconMap = {
  rfq: FileText,
  quotation: DollarSign,
  po: ShoppingCart,
  invoice: DollarSign,
  vendor: User,
  user: User,
  check: CheckCircle,
  file: FileText,
  cart: ShoppingCart,
  dollar: DollarSign,
};

const colorMap = {
  blue: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
  green: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
  purple: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
  yellow: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400',
  orange: 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400',
  red: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400',
};

const ActivityCard = ({ activity }) => {
  const Icon = iconMap[activity.icon || activity.type] || Activity;
  const colorClass = colorMap[activity.color] || colorMap.blue;

  return (
    <div className="card p-4 hover:shadow-md transition-all">
      <div className="flex items-start gap-3">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${colorClass}`}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="font-medium text-slate-900 dark:text-white">{activity.title || activity.action}</p>
              <p className="text-sm text-slate-500 mt-0.5">{activity.description}</p>
            </div>
            <span className="text-xs text-slate-400 whitespace-nowrap">
              {formatDateTime(activity.timestamp)}
            </span>
          </div>
          {activity.user && (
            <div className="flex items-center gap-2 mt-2">
              <div className="w-5 h-5 rounded-full bg-slate-200 dark:bg-dark-600 flex items-center justify-center">
                <span className="text-xs font-medium text-slate-600 dark:text-slate-300">{activity.user.charAt(0)}</span>
              </div>
              <span className="text-xs text-slate-500">{activity.user}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;