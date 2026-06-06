import { useState, useEffect, useCallback } from 'react';
import { purchaseOrderAPI } from '../../../services/api';

export const usePurchaseOrder = () => {
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPurchaseOrders = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await purchaseOrderAPI.getAll(params);
      setPurchaseOrders(response.data);
      return response.data;
    } catch (err) {
      setError(err.message || 'Failed to fetch purchase orders');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const createPurchaseOrder = useCallback(async (data) => {
    try {
      const response = await purchaseOrderAPI.create(data);
      setPurchaseOrders(prev => [...prev, response.data]);
      return response.data;
    } catch (err) {
      setError(err.message || 'Failed to create purchase order');
      throw err;
    }
  }, []);

  const updatePurchaseOrder = useCallback(async (id, data) => {
    try {
      const response = await purchaseOrderAPI.update(id, data);
      setPurchaseOrders(prev => prev.map(po => po.id === id ? response.data : po));
      return response.data;
    } catch (err) {
      setError(err.message || 'Failed to update purchase order');
      throw err;
    }
  }, []);

  const deletePurchaseOrder = useCallback(async (id) => {
    try {
      await purchaseOrderAPI.delete(id);
      setPurchaseOrders(prev => prev.filter(po => po.id !== id));
    } catch (err) {
      setError(err.message || 'Failed to delete purchase order');
      throw err;
    }
  }, []);

  return {
    purchaseOrders,
    loading,
    error,
    fetchPurchaseOrders,
    createPurchaseOrder,
    updatePurchaseOrder,
    deletePurchaseOrder,
  };
};