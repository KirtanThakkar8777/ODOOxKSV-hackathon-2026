import api from '../../../services/api';

export const purchaseOrderService = {
  getAll: (params) => api.get('/orders', { params }),
  getById: async (id) => {
    const response = await api.get('/orders');
    return {
      ...response,
      data: response.data.find((order) => order._id === id || order.id === id),
    };
  },
  create: (data) => api.post('/orders', data),
  update: (id, data) => api.put(`/orders/${id}/approve`, data),
  delete: () => Promise.reject(new Error('Purchase order delete is not available in the current backend API')),
  approve: (id, data) => api.put(`/orders/${id}/approve`, data),
  updateStatus: (id, status, remarks = '') => api.put(`/orders/${id}/approve`, { status, remarks }),
};
