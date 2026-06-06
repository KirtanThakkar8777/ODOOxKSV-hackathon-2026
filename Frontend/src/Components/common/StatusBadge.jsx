import React from 'react';
import { cn } from '../../utils/helpers';

const StatusBadge = ({ status, className = '' }) => {
  const statusConfig = {
    pending: { label: 'Pending', className: 'status-pending' },
    approved: { label: 'Approved', className: 'status-approved' },
    rejected: { label: 'Rejected', className: 'status-rejected' },
    completed: { label: 'Completed', className: 'status-completed' },
    draft: { label: 'Draft', className: 'status-draft' },
    cancelled: { label: 'Cancelled', className: 'status-rejected' },
    in_progress: { label: 'In Progress', className: 'status-pending' },
    active: { label: 'Active', className: 'status-approved' },
    inactive: { label: 'Inactive', className: 'status-draft' },
    paid: { label: 'Paid', className: 'status-approved' },
    unpaid: { label: 'Unpaid', className: 'status-pending' },
    overdue: { label: 'Overdue', className: 'status-rejected' },
  };

  const config = statusConfig[status?.toLowerCase()] || { label: status, className: 'status-draft' };

  return (
    <span className={cn('status-badge', config.className, className)}>
      {config.label}
    </span>
  );
};

export default StatusBadge;