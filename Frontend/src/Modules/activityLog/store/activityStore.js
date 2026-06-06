import { create } from 'zustand';

export const useActivityStore = create((set, get) => ({
  activities: [],
  auditTrail: [],
  isLoading: false,
  error: null,

  setActivities: (activities) => set({ activities }),
  setAuditTrail: (auditTrail) => set({ auditTrail }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),

  addActivity: (activity) => set((state) => ({ activities: [activity, ...state.activities] })),
}));