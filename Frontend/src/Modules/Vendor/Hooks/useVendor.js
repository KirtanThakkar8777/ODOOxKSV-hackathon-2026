import { useState, useEffect, useCallback } from 'react';
import { vendorAPI } from '../../../services/api';

export const useVendor = () => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchVendors = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await vendorAPI.getAll(params);
      setVendors(response.data);
      return response.data;
    } catch (err) {
      setError(err.message || 'Failed to fetch vendors');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const createVendor = useCallback(async (data) => {
    try {
      const response = await vendorAPI.create(data);
      setVendors(prev => [...prev, response.data]);
      return response.data;
    } catch (err) {
      setError(err.message || 'Failed to create vendor');
      throw err;
    }
  }, []);

  const updateVendor = useCallback(async (id, data) => {
    try {
      const response = await vendorAPI.update(id, data);
      setVendors(prev => prev.map(v => v.id === id ? response.data : v));
      return response.data;
    } catch (err) {
      setError(err.message || 'Failed to update vendor');
      throw err;
    }
  }, []);

  const deleteVendor = useCallback(async (id) => {
    try {
      await vendorAPI.delete(id);
      setVendors(prev => prev.filter(v => v.id !== id));
    } catch (err) {
      setError(err.message || 'Failed to delete vendor');
      throw err;
    }
  }, []);

  return {
    vendors,
    loading,
    error,
    fetchVendors,
    createVendor,
    updateVendor,
    deleteVendor,
  };
};