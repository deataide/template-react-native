import { useQuery } from '@tanstack/react-query'
import { postApi } from '../api/post.api'
import { postKeys } from './post.keys'

export function usePosts() {
  return useQuery({
    queryKey: postKeys.all,
    queryFn: postApi.getAll,
    select: (posts) => [...posts].sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
  })
}

export function usePost(id: string) {
  return useQuery({
    queryKey: postKeys.detail(id),
    queryFn: () => postApi.getById(id),
    enabled: !!id,
  })
}
