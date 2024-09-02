import { create } from "zustand";

interface AuthStore {
  token: string;
  isAuthenticated: boolean;
  setToken: (token: string) => void;
  setIsAuthenticated: (condition: boolean) => void;
}

const useAuthStore = create<AuthStore>((set) => ({
  token: "",
  isAuthenticated: false,
  setToken: (token) => set({ token: token }),
  setIsAuthenticated: (condition) => set({ isAuthenticated: !!condition })
}));

export default useAuthStore;
