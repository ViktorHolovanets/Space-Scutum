import api from './index'
import type { Post, ApiResponse } from '@/types/index'
import { handleResponse } from './handleResponse'
async function fetchPosts(): Promise<Post[]> {
  try {
    const response = await api.get<ApiResponse<Post[]>>('/post')
    const posts = handleResponse(response)
    return posts
  } catch (error) {
    throw error
  }
}

export { fetchPosts }
