import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, MapPin, Star, Phone, Mail, ArrowRight } from 'lucide-react';
import { cn } from '../../../utils/helpers';
import StatusBadge from '../../../components/common/StatusBadge';

const VendorCard = ({ vendor, className = '' }) => {
  return (
    <div className={cn('card p-5 hover:shadow-md transition-all group', className)}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
            <Building2 className="w-6 h-6 text-primary-600 dark:text-primary-400" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
              {vendor.name}
            </h3>
            <p className="text-sm text-slate-500">{vendor.category}</p>
          </div>
        </div>
        <StatusBadge status={vendor.status} />
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
          <MapPin className="w-4 h-4 text-slate-400" />
          {vendor.location}
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
          <Phone className="w-4 h-4 text-slate-400" />
          {vendor.phone}
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
          <Mail className="w-4 h-4 text-slate-400" />
          {vendor.email}
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-dark-700">
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{vendor.rating}</span>
        </div>
        <Link to={`/vendors/${vendor.id}`} className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 flex items-center gap-1">
          View Details <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

export default VendorCard;