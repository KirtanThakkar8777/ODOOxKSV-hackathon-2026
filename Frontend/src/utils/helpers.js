import { format } from 'date-fns';

export const formatDate = (date, formatStr = 'MMM dd, yyyy') => {
  if (!date) return '-';
  try {
    return format(new Date(date), formatStr);
  } catch {
    return '-';
  }
};

export const formatDateTime = (date) => {
  return formatDate(date, 'MMM dd, yyyy HH:mm');
};

export const getInitials = (name) => {
  if (!name) return '?';
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

export const cn = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

export const generateId = (prefix = 'id') => {
  return `${prefix}_${Math.random().toString(36).substr(2, 9)}_${Date.now()}`;
};

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};