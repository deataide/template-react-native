import { http } from '@/services/http/client'
import type { Post } from '../types/post.types'

export const postApi = {
  getAll: () =>
    http.get<Post[]>('/posts').then((r) => r.data),

  getById: (id: string) =>
    http.get<Post>(`/posts/${id}`).then((r) => r.data),
}
