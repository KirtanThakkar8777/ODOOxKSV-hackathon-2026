import { create } from "zustand";

const useVendorStore = create((set) => ({
  vendors: [],
  selectedVendor: null,
  loading: false,

  setVendors: (vendors) =>
    set({ vendors }),

  setSelectedVendor: (vendor) =>
    set({ selectedVendor: vendor }),

  setLoading: (loading) =>
    set({ loading }),
}));

export default useVendorStore;