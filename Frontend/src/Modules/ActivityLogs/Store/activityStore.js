import { create } from "zustand";

const useActivityStore = create((set) => ({
  activities: [],
  loading: false,

  setActivities: (activities) =>
    set({ activities }),

  setLoading: (loading) =>
    set({ loading }),
}));

export default useActivityStore;