import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Calendar, DollarSign, Users, ArrowRight } from 'lucide-react';
import { cn } from '../../../utils/helpers';
import StatusBadge from '../../../components/common/StatusBadge';

const RFQCard = ({ rfq, className = '' }) => {
  return (
    <div className={cn('card p-5 hover:shadow-md transition-all group', className)}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
            <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
              {rfq.id}
            </h3>
            <p className="text-sm text-slate-500">{rfq.title}</p>
          </div>
        </div>
        <StatusBadge status={rfq.status} />
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <p className="text-xs text-slate-500 mb-1">Budget</p>
          <div className="flex items-center gap-1">
            <DollarSign className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-sm font-medium text-slate-900 dark:text-white">{rfq.budget.toLocaleString()}</span>
          </div>
        </div>
        <div>
          <p className="text-xs text-slate-500 mb-1">Deadline</p>
          <div className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-sm text-slate-600 dark:text-slate-300">{rfq.deadline}</span>
          </div>
        </div>
        <div>
          <p className="text-xs text-slate-500 mb-1">Responses</p>
          <div className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-sm text-slate-600 dark:text-slate-300">{rfq.responses}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-dark-700">
        <span className="text-sm text-slate-500">{rfq.vendor}</span>
        <Link to={`/rfqs/${rfq.id}`} className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 flex items-center gap-1">
          View Details <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

export default RFQCard;