import { create } from "zustand";

const useRFQStore = create((set) => ({
  rfqs: [],
  selectedRFQ: null,
  loading: false,

  setRFQs: (rfqs) =>
    set({ rfqs }),

  setSelectedRFQ: (rfq) =>
    set({ selectedRFQ: rfq }),

  setLoading: (loading) =>
    set({ loading }),
}));

export default useRFQStore;