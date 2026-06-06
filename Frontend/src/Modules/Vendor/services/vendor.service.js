import api from "../../../services/api";

const vendorService = {
  getVendors: async () => {
    const response = await api.get("/vendors");
    return response.data;
  },

  getVendorById: async (id) => {
    const response = await api.get(
      `/vendors/${id}`
    );

    return response.data;
  },

  createVendor: async (payload) => {
    const response = await api.post(
      "/vendors",
      payload
    );

    return response.data;
  },

  updateVendor: async (
    id,
    payload
  ) => {
    const response = await api.put(
      `/vendors/${id}`,
      payload
    );

    return response.data;
  },

  deleteVendor: async (id) => {
    const response = await api.delete(
      `/vendors/${id}`
    );

    return response.data;
  },
};

export default vendorService;