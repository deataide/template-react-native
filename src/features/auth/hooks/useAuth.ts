import { useMutation } from '@tanstack/react-query'
import { authApi } from '../api/auth.api'
import type { LoginPayload } from '../types/auth.types'
import { useAuthStore } from '@shared/stores/auth.store'

export function useLogin() {
  const setSession = useAuthStore((state) => state.setSession)
  return useMutation({
    mutationFn: (data: LoginPayload) => authApi.login(data),
    onSuccess: (session) => {
      setSession(session)
    },
  })
}

export function useLogout() {
  return useAuthStore((state) => state.logout)
}
