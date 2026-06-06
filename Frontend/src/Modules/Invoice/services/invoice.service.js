import api from '../../../services/api';

export const invoiceService = {
  getAll: (params) => api.get('/invoices', { params }),
  getById: async (id) => {
    const response = await api.get('/invoices');
    return {
      ...response,
      data: response.data.find((invoice) => invoice._id === id || invoice.id === id),
    };
  },
  create: (data) => api.post('/invoices', data),
  update: () => Promise.reject(new Error('Invoice update is not available in the current backend API')),
  delete: () => Promise.reject(new Error('Invoice delete is not available in the current backend API')),
  generate: (poId) => api.post('/invoices', { purchaseOrderId: poId }),
  send: (id) => api.post(`/invoices/${id}/send`),
};
