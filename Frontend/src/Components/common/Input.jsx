import React, { forwardRef } from 'react';
import { cn } from '../../utils/helpers';

const Input = forwardRef(({ 
  label, 
  error, 
  helperText,
  className = '',
  labelClassName = '',
  icon,
  ...props 
}, ref) => {
  return (
    <div className={cn('w-full', className)}>
      {label && (
        <label className={cn('block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5', labelClassName)}>
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          className={cn(
            'input-field',
            icon && 'pl-10',
            error && 'border-red-500 focus:ring-red-500 focus:border-red-500',
            props.disabled && 'bg-slate-100 cursor-not-allowed dark:bg-dark-700'
          )}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
      {helperText && !error && (
        <p className="mt-1 text-sm text-slate-500">{helperText}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;