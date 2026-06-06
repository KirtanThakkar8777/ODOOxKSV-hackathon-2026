import { useState, useEffect, useCallback } from 'react';
import { userAPI } from '../../../services/api';

export const useUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUsers = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await userAPI.getAll(params);
      setUsers(response.data);
      return response.data;
    } catch (err) {
      setError(err.message || 'Failed to fetch users');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const createUser = useCallback(async (data) => {
    try {
      const response = await userAPI.create(data);
      setUsers(prev => [...prev, response.data]);
      return response.data;
    } catch (err) {
      setError(err.message || 'Failed to create user');
      throw err;
    }
  }, []);

  const updateUser = useCallback(async (id, data) => {
    try {
      const response = await userAPI.update(id, data);
      setUsers(prev => prev.map(u => u.id === id ? response.data : u));
      return response.data;
    } catch (err) {
      setError(err.message || 'Failed to update user');
      throw err;
    }
  }, []);

  const deleteUser = useCallback(async (id) => {
    try {
      await userAPI.delete(id);
      setUsers(prev => prev.filter(u => u.id !== id));
    } catch (err) {
      setError(err.message || 'Failed to delete user');
      throw err;
    }
  }, []);

  return {
    users,
    loading,
    error,
    fetchUsers,
    createUser,
    updateUser,
    deleteUser,
  };
};