import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '../../utils/helpers';

const Drawer = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  position = 'right',
  size = 'md',
  footer,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const sizes = {
    sm: 'w-96',
    md: 'w-[480px]',
    lg: 'w-[560px]',
    xl: 'w-[640px]',
  };

  const positions = {
    left: 'left-0',
    right: 'right-0',
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className={cn(
        'fixed top-0 h-full bg-white dark:bg-dark-800 shadow-xl transform transition-transform duration-300 ease-in-out',
        positions[position],
        sizes[size],
        position === 'right' ? 'translate-x-0' : 'translate-x-0'
      )}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-dark-700">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-dark-700 text-slate-500 dark:text-slate-400 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-4 overflow-y-auto" style={{ height: 'calc(100% - 140px)' }}>
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="absolute bottom-0 left-0 right-0 flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-200 dark:border-dark-700 bg-white dark:bg-dark-800">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Drawer;