import { useState, useEffect, useCallback } from 'react';
import { rfqAPI } from '../../../services/api';

export const useRFQ = () => {
  const [rfqs, setRFQs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRFQs = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await rfqAPI.getAll(params);
      setRFQs(response.data);
      return response.data;
    } catch (err) {
      setError(err.message || 'Failed to fetch RFQs');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const createRFQ = useCallback(async (data) => {
    try {
      const response = await rfqAPI.create(data);
      setRFQs(prev => [...prev, response.data]);
      return response.data;
    } catch (err) {
      setError(err.message || 'Failed to create RFQ');
      throw err;
    }
  }, []);

  const updateRFQ = useCallback(async (id, data) => {
    try {
      const response = await rfqAPI.update(id, data);
      setRFQs(prev => prev.map(r => r.id === id ? response.data : r));
      return response.data;
    } catch (err) {
      setError(err.message || 'Failed to update RFQ');
      throw err;
    }
  }, []);

  const deleteRFQ = useCallback(async (id) => {
    try {
      await rfqAPI.delete(id);
      setRFQs(prev => prev.filter(r => r.id !== id));
    } catch (err) {
      setError(err.message || 'Failed to delete RFQ');
      throw err;
    }
  }, []);

  return {
    rfqs,
    loading,
    error,
    fetchRFQs,
    createRFQ,
    updateRFQ,
    deleteRFQ,
  };
};