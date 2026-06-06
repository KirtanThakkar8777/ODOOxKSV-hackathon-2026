import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '../../utils/helpers';

const Loader = ({ size = 'md', className = '', fullScreen = false }) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 dark:bg-dark-900/80 backdrop-blur-sm">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className={cn('animate-spin text-primary-600', sizes[size])} />
          <p className="text-sm text-slate-500 dark:text-slate-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('flex items-center justify-center', className)}>
      <Loader2 className={cn('animate-spin text-primary-600', sizes[size])} />
    </div>
  );
};

export default Loader;