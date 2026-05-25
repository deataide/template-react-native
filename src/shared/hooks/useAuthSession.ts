import { useAuthStore } from "@shared/stores/auth.store";

export function useAuthSession() {
  const hydrated = useAuthStore((state) => state.hydrated);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);

  return {
    hydrated,
    isAuthenticated,
    logout,
  };
}
