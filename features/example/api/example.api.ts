import http from '@/services/http'
import type { Example, ExamplePayload } from '../types/example.types'

export const exampleApi = {
  getAll: () =>
    http.get<Example[]>('/examples').then((r) => r.data),

  getById: (id: string) =>
    http.get<Example>(`/examples/${id}`).then((r) => r.data),

  create: (data: ExamplePayload) =>
    http.post<Example>('/examples', data).then((r) => r.data),

  update: (id: string, data: Partial<ExamplePayload>) =>
    http.put<Example>(`/examples/${id}`, data).then((r) => r.data),

  remove: (id: string) =>
    http.delete(`/examples/${id}`),
}
