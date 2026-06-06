import React from 'react';
import { ArrowRight, TrendingUp, Users, DollarSign, Package } from 'lucide-react';
import { cn } from '../../utils/helpers';
import { formatCurrency } from '../../utils/formatCurrency';

const ExecutiveCard = ({ 
  title,
  metrics,
  className = '',
}) => {
  return (
    <div className={cn('card p-6', className)}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-slate-900 dark:text-black">{title}</h3>
        <button className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 flex items-center gap-1">
          View Details <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {metrics?.map((metric, index) => (
          <div key={index} className="p-3 rounded-lg bg-slate-50 dark:bg-dark-700/50">
            <div className="flex items-center gap-2 mb-1">
              <metric.icon className="w-4 h-4 text-slate-500 dark:text-black" />
              <span className="text-xs text-slate-500 dark:text-black">{metric.label}</span>
            </div>
            <p className="text-lg font-bold text-slate-900 dark:text-white">{metric.value}</p>
            {metric.change && (
              <span className={cn(
                'text-xs font-medium',
                metric.changeType === 'positive' ? 'text-green-600 dark:text-green-400' :
                metric.changeType === 'negative' ? 'text-red-600 dark:text-red-400' : 'text-slate-500'
              )}>
                {metric.change}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExecutiveCard;