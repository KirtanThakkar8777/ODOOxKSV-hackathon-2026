import { create } from "zustand";

const usePurchaseOrderStore = create((set) => ({
  purchaseOrders: [],
  selectedPurchaseOrder: null,
  loading: false,

  setPurchaseOrders: (purchaseOrders) =>
    set({ purchaseOrders }),

  setSelectedPurchaseOrder: (
    selectedPurchaseOrder
  ) =>
    set({
      selectedPurchaseOrder,
    }),

  setLoading: (loading) =>
    set({ loading }),
}));

export default usePurchaseOrderStore;