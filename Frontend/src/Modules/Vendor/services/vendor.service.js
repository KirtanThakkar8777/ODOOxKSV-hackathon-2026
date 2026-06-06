import api from '../../../services/api';

export const vendorService = {
  getAll: (params) => api.get('/vendors', { params }),
  getById: async (id) => {
    const response = await api.get('/vendors');
    return {
      ...response,
      data: response.data.find((vendor) => vendor._id === id || vendor.id === id),
    };
  },
  create: (data) => api.post('/vendors', data),
  update: (id, data) => api.put(`/vendors/${id}`, data),
  delete: (id) => api.delete(`/vendors/${id}`),
  getStats: async () => {
    const response = await api.get('/vendors');
    const vendors = response.data;
    return {
      ...response,
      data: {
        total: vendors.length,
        active: vendors.filter((vendor) => vendor.status === 'active').length,
        inactive: vendors.filter((vendor) => vendor.status === 'inactive').length,
      },
    };
  },
};
