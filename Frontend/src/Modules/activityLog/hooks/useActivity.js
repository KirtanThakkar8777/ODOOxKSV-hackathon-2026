import { useState, useEffect, useCallback } from 'react';
import { activityLogAPI } from '../../../services/api';

export const useActivity = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchActivities = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await activityLogAPI.getAll(params);
      setActivities(response.data);
      return response.data;
    } catch (err) {
      setError(err.message || 'Failed to fetch activities');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchAuditTrail = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await activityLogAPI.getAuditTrail(params);
      setActivities(response.data);
      return response.data;
    } catch (err) {
      setError(err.message || 'Failed to fetch audit trail');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    activities,
    loading,
    error,
    fetchActivities,
    fetchAuditTrail,
  };
};