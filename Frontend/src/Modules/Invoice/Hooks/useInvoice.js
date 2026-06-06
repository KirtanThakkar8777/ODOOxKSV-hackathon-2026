import { useState, useEffect, useCallback } from 'react';
import { invoiceAPI } from '../../../services/api';

export const useInvoice = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchInvoices = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await invoiceAPI.getAll(params);
      setInvoices(response.data);
      return response.data;
    } catch (err) {
      setError(err.message || 'Failed to fetch invoices');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const createInvoice = useCallback(async (data) => {
    try {
      const response = await invoiceAPI.create(data);
      setInvoices(prev => [...prev, response.data]);
      return response.data;
    } catch (err) {
      setError(err.message || 'Failed to create invoice');
      throw err;
    }
  }, []);

  const updateInvoice = useCallback(async (id, data) => {
    try {
      const response = await invoiceAPI.update(id, data);
      setInvoices(prev => prev.map(i => i.id === id ? response.data : i));
      return response.data;
    } catch (err) {
      setError(err.message || 'Failed to update invoice');
      throw err;
    }
  }, []);

  const deleteInvoice = useCallback(async (id) => {
    try {
      await invoiceAPI.delete(id);
      setInvoices(prev => prev.filter(i => i.id !== id));
    } catch (err) {
      setError(err.message || 'Failed to delete invoice');
      throw err;
    }
  }, []);

  return {
    invoices,
    loading,
    error,
    fetchInvoices,
    createInvoice,
    updateInvoice,
    deleteInvoice,
  };
};