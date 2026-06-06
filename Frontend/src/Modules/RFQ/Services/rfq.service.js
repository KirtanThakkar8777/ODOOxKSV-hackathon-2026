import api from "../../../services/api";

const rfqService = {
  getRFQs: async () => {
    const response = await api.get("/rfqs");
    return response.data;
  },

  getRFQById: async (id) => {
    const response = await api.get(
      `/rfqs/${id}`
    );

    return response.data;
  },

  createRFQ: async (payload) => {
    const response = await api.post(
      "/rfqs",
      payload
    );

    return response.data;
  },

  updateRFQ: async (
    id,
    payload
  ) => {
    const response = await api.put(
      `/rfqs/${id}`,
      payload
    );

    return response.data;
  },

  deleteRFQ: async (id) => {
    const response = await api.delete(
      `/rfqs/${id}`
    );

    return response.data;
  },
};

export default rfqService;