import axios from "axios"
import { env } from '@/shared/config/env'
import { setupHttpInterceptors } from "./interceptors"

export const http = axios.create({
  baseURL: env.EXPO_PUBLIC_API_URL,
  timeout: 10000,
})

setupHttpInterceptors(http)