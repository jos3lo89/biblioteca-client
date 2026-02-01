import type { UserRole } from "@/common/types/user-role";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface UserState {
  id: string;
  name: string;
  lastName: string;
  role: UserRole;
  dni: string;
}

interface AuthStore {
  user: UserState | null;
  isAuthenticated: boolean;
  setUser: (user: UserState) => void;
  logout: () => void;
}

const STORAGE_NAME = "auth-store";

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setUser: (user: UserState) =>
        set({
          user,
          isAuthenticated: true,
        }),

      logout: () => {
        localStorage.removeItem(STORAGE_NAME);
        set({
          user: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: STORAGE_NAME,
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
