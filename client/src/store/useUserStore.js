import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const useUserStore = create(
  devtools(
    persist(
      (set) => ({
        setUser: (userData) => set({ user: userData }),
        logout: () => set({ user: null }),
      }),
      {
        name: "user-storage",
      }
    ),
    {
      name: "UserStore",
    }
  )
);

export default useUserStore;
