import { create } from 'zustand';

export const useUserStore = create((set, get) => ({
  users: [],
  currentUser: null,
  isLoading: false,
  error: null,

  setUsers: (users) => set({ users }),
  setCurrentUser: (user) => set({ currentUser: user }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),

  addUser: (user) => set((state) => ({ users: [...state.users, user] })),
  updateUser: (id, data) => set((state) => ({
    users: state.users.map(u => u.id === id ? { ...u, ...data } : u)
  })),
  removeUser: (id) => set((state) => ({
    users: state.users.filter(u => u.id !== id)
  })),

  getUserById: (id) => get().users.find(u => u.id === id),
}));