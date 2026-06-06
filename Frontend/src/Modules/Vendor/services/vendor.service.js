import api from "@/services/api";

export const getVendors = () =>
  api.get("/vendors");

export const getVendorById = (id) =>
  api.get(`/vendors/${id}`);

export const createVendor = (payload) =>
  api.post("/vendors", payload);

export const updateVendor = (id, payload) =>
  api.put(`/vendors/${id}`, payload);

export const deleteVendor = (id) =>
  api.delete(`/vendors/${id}`);