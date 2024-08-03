import api from './index'
import type { Post, ApiResponse, PaginatedPostsResponse } from '@/types/index'
import { handleResponse } from './handleResponse'

async function getPosts(page: number = 1): Promise<PaginatedPostsResponse> {
  try {
    const response = await api.get<ApiResponse<PaginatedPostsResponse>>(`/post?page=${page}`)
    const posts = handleResponse(response)
    return posts
  } catch (error) {
    throw error
  }
}

async function createPost(title: string, body: string): Promise<Post> {
  try {
    const response = await api.post<ApiResponse<Post>>('/posts', { title, body });
    const post = handleResponse(response);
    return post;
  } catch (error) {
    console.error('Failed to create post:', error);
    throw error;
  }
}

async function getPostById(id: string): Promise<Post> {
  try {
    const response = await api.get<ApiResponse<Post>>(`/posts/${id}`)
    const post = handleResponse(response)
    return post
  } catch (error) {
    throw error
  }
}

async function updatePost(id: string, title?: string, body?: string): Promise<Post> {
  try {
    const response = await api.put<ApiResponse<Post>>(`/posts/${id}`, { title, body })
    const post = handleResponse(response)
    return post
  } catch (error) {
    throw error
  }
}

async function deletePost(id: string): Promise<void> {
  try {
    await api.delete<ApiResponse<null>>(`/posts/${id}`)
  } catch (error) {
    throw error
  }
}

export { getPosts, createPost, getPostById, updatePost, deletePost }
