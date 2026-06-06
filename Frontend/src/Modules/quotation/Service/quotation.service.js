import { create } from "zustand";

const useQuotationStore = create((set) => ({
  quotations: [],
  selectedQuotation: null,
  loading: false,

  setQuotations: (quotations) =>
    set({ quotations }),

  setSelectedQuotation: (quotation) =>
    set({ selectedQuotation: quotation }),

  setLoading: (loading) =>
    set({ loading }),
}));

export default useQuotationStore;