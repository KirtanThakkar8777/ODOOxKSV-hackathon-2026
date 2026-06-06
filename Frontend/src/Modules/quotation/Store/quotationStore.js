import { create } from 'zustand';

export const useQuotationStore = create((set, get) => ({
  quotations: [],
  selectedQuotation: null,
  comparisonData: null,
  isLoading: false,
  error: null,

  setQuotations: (quotations) => set({ quotations }),
  setSelectedQuotation: (quotation) => set({ selectedQuotation: quotation }),
  setComparisonData: (data) => set({ comparisonData: data }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),

  addQuotation: (quotation) => set((state) => ({ quotations: [...state.quotations, quotation] })),
  updateQuotation: (id, data) => set((state) => ({
    quotations: state.quotations.map(q => q.id === id ? { ...q, ...data } : q)
  })),
  removeQuotation: (id) => set((state) => ({
    quotations: state.quotations.filter(q => q.id !== id)
  })),

  getQuotationById: (id) => get().quotations.find(q => q.id === id),
}));