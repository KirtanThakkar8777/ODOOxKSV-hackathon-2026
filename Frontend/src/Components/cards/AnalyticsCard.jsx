import React from 'react';
import { MoreHorizontal, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '../../utils/helpers';

const AnalyticsCard = ({ 
  title, 
  children,
  action,
  className = '',
  headerClassName = '',
}) => {
  return (
    <div className={cn('card overflow-hidden', className)}>
      <div className={cn('flex items-center justify-between px-5 py-4 border-b border-slate-200 dark:border-dark-700', headerClassName)}>
        <h3 className="font-semibold text-slate-900 dark:text-black">{title}</h3>
        {action && (
          <div className="flex items-center gap-2">
            {action}
          </div>
        )}
      </div>
      <div className="p-5">
        {children}
      </div>
    </div>
  );
};

export default AnalyticsCard;