import { create } from 'zustand';

export const useInvoiceStore = create((set, get) => ({
  invoices: [],
  selectedInvoice: null,
  isLoading: false,
  error: null,

  setInvoices: (invoices) => set({ invoices }),
  setSelectedInvoice: (invoice) => set({ selectedInvoice: invoice }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),

  addInvoice: (invoice) => set((state) => ({ invoices: [...state.invoices, invoice] })),
  updateInvoice: (id, data) => set((state) => ({
    invoices: state.invoices.map(i => i.id === id ? { ...i, ...data } : i)
  })),
  removeInvoice: (id) => set((state) => ({
    invoices: state.invoices.filter(i => i.id !== id)
  })),

  getInvoiceById: (id) => get().invoices.find(i => i.id === id),
}));