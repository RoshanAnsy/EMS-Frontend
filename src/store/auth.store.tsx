import { create } from "zustand";

interface AuthStoreState {
  authToken: string;
  setAuthToken: (token:string) => void;
}

const useAuthStore = create<AuthStoreState>((set) => ({
  authToken: "",

  setAuthToken: (token: string) => set({ authToken: token }),
}));

export default useAuthStore;