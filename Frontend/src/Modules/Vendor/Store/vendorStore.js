import { create } from 'zustand';

export const useVendorStore = create((set, get) => ({
  vendors: [],
  selectedVendor: null,
  isLoading: false,
  error: null,
  stats: null,

  setVendors: (vendors) => set({ vendors }),
  setSelectedVendor: (vendor) => set({ selectedVendor: vendor }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  setStats: (stats) => set({ stats }),

  addVendor: (vendor) => set((state) => ({ vendors: [...state.vendors, vendor] })),
  updateVendor: (id, data) => set((state) => ({
    vendors: state.vendors.map(v => v.id === id ? { ...v, ...data } : v)
  })),
  removeVendor: (id) => set((state) => ({
    vendors: state.vendors.filter(v => v.id !== id)
  })),

  getVendorById: (id) => get().vendors.find(v => v.id === id),
}));