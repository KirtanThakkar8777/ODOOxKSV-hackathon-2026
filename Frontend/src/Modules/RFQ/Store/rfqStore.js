import { create } from 'zustand';

export const useRFQStore = create((set, get) => ({
  rfqs: [],
  selectedRFQ: null,
  isLoading: false,
  error: null,

  setRFQs: (rfqs) => set({ rfqs }),
  setSelectedRFQ: (rfq) => set({ selectedRFQ: rfq }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),

  addRFQ: (rfq) => set((state) => ({ rfqs: [...state.rfqs, rfq] })),
  updateRFQ: (id, data) => set((state) => ({
    rfqs: state.rfqs.map(r => r.id === id ? { ...r, ...data } : r)
  })),
  removeRFQ: (id) => set((state) => ({
    rfqs: state.rfqs.filter(r => r.id !== id)
  })),

  getRFQById: (id) => get().rfqs.find(r => r.id === id),
}));