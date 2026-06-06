import React from 'react';
import { Search, X } from 'lucide-react';
import { cn } from '../../utils/helpers';

const SearchBar = ({ 
  value, 
  onChange, 
  placeholder = 'Search...',
  className = '',
  onClear,
}) => {
  return (
    <div className={cn('relative', className)}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-10 py-2.5 bg-slate-100 dark:bg-dark-700 border-none rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:text-white placeholder-slate-400"
      />
      {value && (
        <button
          onClick={onClear || (() => onChange(''))}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;