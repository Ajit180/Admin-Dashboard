import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isLoading: true,

  setAuth: ({ user, token }) => set({ user, token, isLoading: false }),

  logout: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    set({ user: null, token: null, isLoading: false });
  },

  loadUserFromLocalStorage: () => {
    try {
      const user = localStorage.getItem("user");
      const token = localStorage.getItem("token");

      // If user is "undefined", treat as invalid
      if (!user || user === "undefined" || !token) {
        throw new Error("Invalid user or token in localStorage");
      }

      if (user && token) {
        set({ user: JSON.parse(user), token, isLoading: false });
      } else {
        set({ user: null, token: null, isLoading: false });
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      set({ user: null, token: null, isLoading: false });
    }
  },
}));

export default useAuthStore;
