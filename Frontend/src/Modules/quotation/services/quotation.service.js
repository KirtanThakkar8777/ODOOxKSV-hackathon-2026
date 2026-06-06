import api from '../../../services/api';

export const quotationService = {
  getAll: ({ rfqId, ...params } = {}) => (
    rfqId ? api.get(`/quotations/rfq/${rfqId}`, { params }) : api.get('/rfqs', { params })
  ),
  getById: async (id, rfqId) => {
    const response = await api.get(rfqId ? `/quotations/rfq/${rfqId}` : '/rfqs');
    return {
      ...response,
      data: response.data.find((quotation) => quotation._id === id || quotation.id === id),
    };
  },
  create: (data) => api.post('/quotations', data),
  update: (id, data) => (data?.status === 'accepted'
    ? api.put(`/quotations/${id}/accept`)
    : Promise.reject(new Error('Quotation update is not available in the current backend API'))),
  delete: () => Promise.reject(new Error('Quotation delete is not available in the current backend API')),
  accept: (id) => api.put(`/quotations/${id}/accept`),
  approve: (id) => api.put(`/quotations/${id}/accept`),
  compare: (rfqId) => api.get(`/quotations/rfq/${rfqId}`),
};
