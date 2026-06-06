import { create } from "zustand";

const useInvoiceStore = create((set) => ({
  invoices: [],
  selectedInvoice: null,
  loading: false,

  setInvoices: (invoices) =>
    set({ invoices }),

  setSelectedInvoice: (
    selectedInvoice
  ) =>
    set({
      selectedInvoice,
    }),

  setLoading: (loading) =>
    set({ loading }),
}));

export default useInvoiceStore;