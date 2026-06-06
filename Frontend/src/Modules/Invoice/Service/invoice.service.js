import api from "../../../services/api";

const invoiceService = {
  getInvoices: async () => {
    const response = await api.get(
      "/invoices"
    );

    return response.data;
  },

  getInvoiceById: async (id) => {
    const response = await api.get(
      `/invoices/${id}`
    );

    return response.data;
  },

  createInvoice: async (
    payload
  ) => {
    const response = await api.post(
      "/invoices",
      payload
    );

    return response.data;
  },

  updateInvoice: async (
    id,
    payload
  ) => {
    const response = await api.put(
      `/invoices/${id}`,
      payload
    );

    return response.data;
  },

  deleteInvoice: async (id) => {
    const response = await api.delete(
      `/invoices/${id}`
    );

    return response.data;
  },
};

export default invoiceService;