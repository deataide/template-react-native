import type { AuthUser } from "@shared/stores/auth.store";

export interface LoginPayload {
  email: string
  password: string
}

export interface LoginResponse {
  accessToken: string
  user: AuthUser
}
