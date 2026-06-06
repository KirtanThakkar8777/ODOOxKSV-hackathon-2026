import { create } from 'zustand';

export const usePurchaseOrderStore = create((set, get) => ({
  purchaseOrders: [],
  selectedPurchaseOrder: null,
  isLoading: false,
  error: null,

  setPurchaseOrders: (purchaseOrders) => set({ purchaseOrders }),
  setSelectedPurchaseOrder: (po) => set({ selectedPurchaseOrder: po }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),

  addPurchaseOrder: (po) => set((state) => ({ purchaseOrders: [...state.purchaseOrders, po] })),
  updatePurchaseOrder: (id, data) => set((state) => ({
    purchaseOrders: state.purchaseOrders.map(po => po.id === id ? { ...po, ...data } : po)
  })),
  removePurchaseOrder: (id) => set((state) => ({
    purchaseOrders: state.purchaseOrders.filter(po => po.id !== id)
  })),

  getPurchaseOrderById: (id) => get().purchaseOrders.find(po => po.id === id),
}));