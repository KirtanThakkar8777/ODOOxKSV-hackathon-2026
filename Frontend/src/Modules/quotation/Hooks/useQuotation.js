import { useState, useEffect, useCallback } from 'react';
import { quotationAPI } from '../../../services/api';

export const useQuotation = () => {
  const [quotations, setQuotations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchQuotations = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await quotationAPI.getAll(params);
      setQuotations(response.data);
      return response.data;
    } catch (err) {
      setError(err.message || 'Failed to fetch quotations');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const createQuotation = useCallback(async (data) => {
    try {
      const response = await quotationAPI.create(data);
      setQuotations(prev => [...prev, response.data]);
      return response.data;
    } catch (err) {
      setError(err.message || 'Failed to create quotation');
      throw err;
    }
  }, []);

  const updateQuotation = useCallback(async (id, data) => {
    try {
      const response = await quotationAPI.update(id, data);
      setQuotations(prev => prev.map(q => q.id === id ? response.data : q));
      return response.data;
    } catch (err) {
      setError(err.message || 'Failed to update quotation');
      throw err;
    }
  }, []);

  const deleteQuotation = useCallback(async (id) => {
    try {
      await quotationAPI.delete(id);
      setQuotations(prev => prev.filter(q => q.id !== id));
    } catch (err) {
      setError(err.message || 'Failed to delete quotation');
      throw err;
    }
  }, []);

  return {
    quotations,
    loading,
    error,
    fetchQuotations,
    createQuotation,
    updateQuotation,
    deleteQuotation,
  };
};