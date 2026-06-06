import { create } from "zustand";

const useUserStore = create((set) => ({
  user: null,
  token: localStorage.getItem("token"),

  login: (user, token) =>
    set(() => {
      localStorage.setItem("token", token);

      return {
        user,
        token,
      };
    }),

  logout: () =>
    set(() => {
      localStorage.removeItem("token");

      return {
        user: null,
        token: null,
      };
    }),
}));

export default useUserStore;