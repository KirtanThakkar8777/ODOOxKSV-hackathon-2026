import React from 'react';
import { CheckCircle, Clock, AlertCircle, FileText, ShoppingCart, User, DollarSign } from 'lucide-react';
import { formatDateTime } from '../../utils/helpers';
import { cn } from '../../utils/helpers';

const iconMap = {
  check: CheckCircle,
  clock: Clock,
  alert: AlertCircle,
  file: FileText,
  cart: ShoppingCart,
  user: User,
  dollar: DollarSign,
};

const colorMap = {
  blue: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
  green: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
  yellow: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400',
  red: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400',
  purple: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
};

const ActivityTimeline = ({ activities, className = '' }) => {
  return (
    <div className={cn('space-y-4', className)}>
      {activities.map((activity, index) => {
        const Icon = iconMap[activity.icon] || FileText;
        const colorClass = colorMap[activity.color] || colorMap.blue;

        return (
          <div key={index} className="flex gap-4">
            {/* Timeline line */}
            <div className="flex flex-col items-center">
              <div className={cn('w-8 h-8 rounded-full flex items-center justify-center', colorClass)}>
                <Icon className="w-4 h-4" />
              </div>
              {index < activities.length - 1 && (
                <div className="w-0.5 flex-1 bg-slate-200 dark:bg-dark-600 mt-2" />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 pb-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">{activity.title}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{activity.description}</p>
                </div>
                <span className="text-xs text-slate-400 dark:text-slate-500 whitespace-nowrap">
                  {formatDateTime(activity.timestamp)}
                </span>
              </div>
              {activity.user && (
                <div className="flex items-center gap-2 mt-2">
                  <div className="w-5 h-5 rounded-full bg-slate-200 dark:bg-dark-600 flex items-center justify-center">
                    <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
                      {activity.user.charAt(0)}
                    </span>
                  </div>
                  <span className="text-xs text-slate-500 dark:text-slate-400">{activity.user}</span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ActivityTimeline;