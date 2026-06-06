import { create } from "zustand";

const useVendorStore = create((set) => ({
  vendors: [],
  selectedVendor: null,
  loading: false,

  setLoading: (value) =>
    set({ loading: value }),

  setVendors: (vendors) =>
    set({ vendors }),

  setSelectedVendor: (vendor) =>
    set({ selectedVendor: vendor }),
}));

export default useVendorStore;