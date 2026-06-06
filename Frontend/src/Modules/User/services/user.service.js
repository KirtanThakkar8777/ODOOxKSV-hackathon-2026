import api from '../../../services/api';

export const userService = {
  getAll: async () => {
    const response = await api.get('/auth/me');
    return { ...response, data: response.data ? [response.data] : [] };
  },
  getById: () => api.get('/auth/me'),
  create: (data) => api.post('/auth/register', data),
  getProfile: () => api.get('/auth/me'),
};
