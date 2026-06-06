import React from 'react';
import { ArrowUpRight, ArrowDownRight, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '../../utils/helpers';

const StatCard = ({ 
  title, 
  value, 
  change, 
  changeType = 'neutral',
  icon: Icon,
  color = 'blue',
  subtitle,
}) => {
  const colorConfig = {
    blue: { bg: 'bg-blue-50 dark:bg-blue-900/20', icon: 'text-blue-600 dark:text-blue-400', text: 'text-blue-700 dark:text-blue-300' },
    green: { bg: 'bg-green-50 dark:bg-green-900/20', icon: 'text-green-600 dark:text-green-400', text: 'text-green-700 dark:text-green-300' },
    purple: { bg: 'bg-purple-50 dark:bg-purple-900/20', icon: 'text-purple-600 dark:text-purple-400', text: 'text-purple-700 dark:text-purple-300' },
    orange: { bg: 'bg-orange-50 dark:bg-orange-900/20', icon: 'text-orange-600 dark:text-orange-400', text: 'text-orange-700 dark:text-orange-300' },
    red: { bg: 'bg-red-50 dark:bg-red-900/20', icon: 'text-red-600 dark:text-red-400', text: 'text-red-700 dark:text-red-300' },
    teal: { bg: 'bg-teal-50 dark:bg-teal-900/20', icon: 'text-teal-600 dark:text-teal-400', text: 'text-teal-700 dark:text-teal-300' },
  };

  const config = colorConfig[color] || colorConfig.blue;
  const isPositive = changeType === 'positive';
  const isNegative = changeType === 'negative';

  return (
    <div className="card p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-black mt-1">{value}</h3>

          {(change || subtitle) && (
            <div className="flex items-center gap-2 mt-2">
              {change && (
                <div className={cn(
                  'flex items-center gap-1 text-sm font-medium',
                  isPositive ? 'text-green-600 dark:text-green-400' : 
                  isNegative ? 'text-red-600 dark:text-red-400' : 'text-slate-500 dark:text-slate-400'
                )}>
                  {isPositive ? <TrendingUp className="w-4 h-4" /> : 
                   isNegative ? <TrendingDown className="w-4 h-4" /> : null}
                  <span>{change}</span>
                </div>
              )}
              {subtitle && (
                <span className="text-xs text-slate-400 dark:text-slate-500">{subtitle}</span>
              )}
            </div>
          )}
        </div>

        {Icon && (
          <div className={cn('p-3 rounded-xl', config.bg)}>
            <Icon className={cn('w-5 h-5', config.icon)} />
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;