import type { LoginPayload, LoginResponse } from '../types/auth.types'

const MOCK_USER = {
  id: 'user-1',
  name: 'Demo User',
  email: 'demo@demo.com',
}

const VALID_CREDENTIALS = {
  email: 'demo@demo.com',
  password: '123456',
}

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const authApi = {
  async login(payload: LoginPayload): Promise<LoginResponse> {
    await wait(500)

    const isValid =
      payload.email.toLowerCase() === VALID_CREDENTIALS.email &&
      payload.password === VALID_CREDENTIALS.password

    if (!isValid) {
      throw new Error('Credenciais inválidas. Use demo@demo.com / 123456')
    }

    return {
      accessToken: 'mock-token-demo',
      user: MOCK_USER,
    }
  },
}
