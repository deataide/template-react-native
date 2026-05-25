import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { secureStateStorage } from "@shared/lib/storage/secure-storage";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
}

interface AuthStoreState {
  accessToken: string | null;
  user: AuthUser | null;
  hydrated: boolean;
  isAuthenticated: boolean;
  setSession: (payload: { accessToken: string; user: AuthUser }) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStoreState>()(
  persist(
    (set) => ({
      accessToken: null,
      user: null,
      hydrated: false,
      isAuthenticated: false,
      setSession: ({ accessToken, user }) =>
        set({
          accessToken,
          user,
          isAuthenticated: true,
        }),
      logout: () =>
        set({
          accessToken: null,
          user: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: "app_auth",
      storage: createJSONStorage(() => secureStateStorage),
      partialize: (state) => ({
        accessToken: state.accessToken,
        user: state.user,
      }),
      onRehydrateStorage: () => (state) => {
        if (!state) return;
        state.hydrated = true;
        state.isAuthenticated = Boolean(state.accessToken);
      },
    }
  )
);
