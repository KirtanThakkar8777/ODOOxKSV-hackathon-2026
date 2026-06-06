import api from "../../../services/api";

const purchaseOrderService = {
  getPurchaseOrders: async () => {
    const response = await api.get(
      "/purchase-orders"
    );

    return response.data;
  },

  getPurchaseOrderById: async (
    id
  ) => {
    const response = await api.get(
      `/purchase-orders/${id}`
    );

    return response.data;
  },

  createPurchaseOrder: async (
    payload
  ) => {
    const response = await api.post(
      "/purchase-orders",
      payload
    );

    return response.data;
  },

  updatePurchaseOrder: async (
    id,
    payload
  ) => {
    const response = await api.put(
      `/purchase-orders/${id}`,
      payload
    );

    return response.data;
  },

  deletePurchaseOrder: async (
    id
  ) => {
    const response = await api.delete(
      `/purchase-orders/${id}`
    );

    return response.data;
  },
};

export default purchaseOrderService;