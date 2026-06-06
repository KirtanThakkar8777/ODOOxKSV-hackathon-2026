import api from '../../../services/api';

export const rfqService = {
  getAll: (params) => api.get('/rfqs', { params }),
  getById: (id) => api.get(`/rfqs/${id}`),
  create: (data) => api.post('/rfqs', data),
  update: (id, data) => api.put(`/rfqs/${id}`, data),
  delete: () => Promise.reject(new Error('RFQ delete is not available in the current backend API')),
  updateStatus: (id, status) => api.put(`/rfqs/${id}`, { status }),
};
