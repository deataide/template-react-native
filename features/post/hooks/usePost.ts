import { useQuery } from '@tanstack/react-query'
import { postApi } from '../api/post.api'

const KEY = ['posts'] as const

export function usePosts() {
  return useQuery({
    queryKey: KEY,
    queryFn: postApi.getAll,
  })
}

export function usePost(id: string) {
  return useQuery({
    queryKey: [...KEY, id],
    queryFn: () => postApi.getById(id),
    enabled: !!id,
  })
}