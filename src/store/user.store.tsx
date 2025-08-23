import { create } from "zustand";

interface UserStoreState {
  name: string;
  email: string;
  role: string;
  setUserProfile: (name:string,email:string,role:string) => void;
}

const userProfileStore = create<UserStoreState>((set) => ({
  name: "",
  email: "",
  role: "",

  setUserProfile: (name: string,email:string,role:string) => set({ name, email,role}),
}));

export default userProfileStore;