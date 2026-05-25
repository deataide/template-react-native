import { http } from '@services/http/client'
import type { Post } from '../types/post.types'

type PostApiResponse = {
  id?: string | number
  title?: string
  createdAt?: string
}

function normalizePost(raw: PostApiResponse): Post {
  return {
    id: String(raw.id ?? ''),
    title: raw.title ?? '',
    createdAt: raw.createdAt ?? new Date(0).toISOString(),
  }
}

export const postApi = {
  getAll: () =>
    http.get<PostApiResponse[]>('/posts').then((r) => {
      const data = r.data
      if (!Array.isArray(data)) return []
      return data.map(normalizePost)
    }),

  getById: (id: string) =>
    http.get<PostApiResponse>(`/posts/${id}`).then((r) => normalizePost(r.data ?? {})),
}
