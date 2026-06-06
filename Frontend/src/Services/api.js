import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

/* ===========================
   TOKEN HELPERS
=========================== */

export const tokenService = {
  getToken: () => localStorage.getItem('token'),

  setToken: (token) => {
    localStorage.setItem('token', token);
  },

  removeToken: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  isAuthenticated: () => !!localStorage.getItem('token'),
};

/* ===========================
   AXIOS INSTANCE
=========================== */

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/* ===========================
   REQUEST INTERCEPTOR
=========================== */

api.interceptors.request.use(
  (config) => {
    const token = tokenService.getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    console.log(
      `[API] ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`
    );

    return config;
  },
  (error) => Promise.reject(error)
);

/* ===========================
   RESPONSE INTERCEPTOR
=========================== */

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('[API ERROR]', error);

    if (error.response?.status === 401) {
      tokenService.removeToken();

      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

/* ===========================
   HELPERS
=========================== */

const unsupportedEndpoint = (name) =>
  Promise.reject(
    new Error(`${name} is not available in the current backend API`)
  );

const findById = (items, id) =>
  items.find(
    (item) =>
      item?._id?.toString() === id?.toString() ||
      item?.id?.toString() === id?.toString()
  );

/* ===========================
   AUTH API
=========================== */

export const authAPI = {
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);

    const token =
      response.data?.token ||
      response.data?.accessToken ||
      response.data?.data?.token;

    if (token) {
      tokenService.setToken(token);
    }

    return response;
  },

  register: (data) => api.post('/auth/register', data),

  logout: async () => {
    tokenService.removeToken();

    return {
      data: {
        success: true,
        message: 'Logged out successfully',
      },
    };
  },

  me: () => api.get('/auth/me'),
};

/* ===========================
   USER API
=========================== */

export const userAPI = {
  getAll: async () => {
    const response = await api.get('/auth/me');

    return {
      ...response,
      data: response.data ? [response.data] : [],
    };
  },

  getById: () => api.get('/auth/me'),

  create: (data) => api.post('/auth/register', data),

  update: () => unsupportedEndpoint('User update'),

  delete: () => unsupportedEndpoint('User delete'),

  me: () => api.get('/auth/me'),
};

/* ===========================
   VENDOR API
=========================== */

export const vendorAPI = {
  getAll: (params = {}) => api.get('/vendors', { params }),

  getById: async (id) => {
    const response = await api.get('/vendors');

    return {
      ...response,
      data: findById(response.data, id),
    };
  },

  create: (data) => api.post('/vendors', data),

  update: (id, data) => api.put(`/vendors/${id}`, data),

  delete: (id) => api.delete(`/vendors/${id}`),

  getStats: async () => {
    const response = await api.get('/vendors');

    const vendors = response.data || [];

    return {
      ...response,
      data: {
        total: vendors.length,
        active: vendors.filter((v) => v.status === 'active').length,
        inactive: vendors.filter((v) => v.status === 'inactive').length,
      },
    };
  },
};

/* ===========================
   RFQ API
=========================== */

export const rfqAPI = {
  getAll: (params = {}) => api.get('/rfqs', { params }),

  getById: (id) => api.get(`/rfqs/${id}`),

  create: (data) => api.post('/rfqs', data),

  update: (id, data) => api.put(`/rfqs/${id}`, data),

  delete: (id) => api.delete(`/rfqs/${id}`),

  updateStatus: (id, status) =>
    api.put(`/rfqs/${id}`, { status }),
};

/* ===========================
   QUOTATION API
=========================== */

export const quotationAPI = {
  getAll: ({ rfqId, ...params } = {}) =>
    rfqId
      ? api.get(`/quotations/rfq/${rfqId}`, { params })
      : api.get('/quotations', { params }),

  getById: (id) => api.get(`/quotations/${id}`),

  create: (data) => api.post('/quotations', data),

  update: (id, data) => api.put(`/quotations/${id}`, data),

  delete: (id) => api.delete(`/quotations/${id}`),

  accept: (id) => api.put(`/quotations/${id}/accept`),

  compare: (rfqId) =>
    api.get(`/quotations/rfq/${rfqId}`),
};

/* ===========================
   PURCHASE ORDER API
=========================== */

export const purchaseOrderAPI = {
  getAll: (params = {}) =>
    api.get('/orders', { params }),

  getById: async (id) => {
    const response = await api.get('/orders');

    return {
      ...response,
      data: findById(response.data, id),
    };
  },

  create: (data) => api.post('/orders', data),

  update: (id, data) =>
    api.put(`/orders/${id}/approve`, data),

  delete: (id) =>
    api.delete(`/orders/${id}`),

  approve: (id, data) =>
    api.put(`/orders/${id}/approve`, data),

  updateStatus: (id, status, remarks = '') =>
    api.put(`/orders/${id}/approve`, {
      status,
      remarks,
    }),
};

/* ===========================
   INVOICE API
=========================== */

export const invoiceAPI = {
  getAll: (params = {}) =>
    api.get('/invoices', { params }),

  getById: async (id) => {
    const response = await api.get('/invoices');

    return {
      ...response,
      data: findById(response.data, id),
    };
  },

  create: (data) =>
    api.post('/invoices', data),

  update: unsupportedEndpoint,

  delete: (id) =>
    api.delete(`/invoices/${id}`),

  generate: (purchaseOrderId) =>
    api.post('/invoices', {
      purchaseOrderId,
    }),

  send: (id) =>
    api.post(`/invoices/${id}/send`),
};

/* ===========================
   ACTIVITY LOG API
=========================== */

export const activityLogAPI = {
  getAll: (params = {}) =>
    api.get('/activity-logs', { params }),

  getAuditTrail: (params = {}) =>
    api.get('/activity-logs/audit', { params }),

  getStats: () =>
    api.get('/activity-logs/stats'),
};

/* ===========================
   REPORT API
=========================== */

export const reportAPI = {
  getDashboard: () =>
    api.get('/reports/dashboard'),

  getProcurement: (params = {}) =>
    api.get('/reports/procurement', { params }),

  getVendor: (params = {}) =>
    api.get('/reports/vendor', { params }),

  getSpend: (params = {}) =>
    api.get('/reports/spend', { params }),

  export: (type, params = {}) =>
    api.get(`/reports/export/${type}`, {
      params,
      responseType: 'blob',
    }),
};

export default api;