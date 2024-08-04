import api from './index'
import type { Comment, ApiResponse } from '@/types'
import { handleResponse } from './handleResponse'

export const getComments = async (page: number = 1):Promise<Comment[]> => {
  try {
    const response = await api.get<ApiResponse<Comment[]>>(`/comment?page=${page}`)
    return handleResponse(response)
  } catch (error) {
    console.error('Failed to fetch comments:', error)
    throw error
  }
}

export const getComment = async (id: string): Promise<Comment> => {
  try {
    const response = await api.get<ApiResponse<Comment>>(`/comment/${id}`)
    return handleResponse(response)
  } catch (error) {
    console.error('Failed to fetch comment:', error)
    throw error
  }
}

export const addComment = async (body: string, postId: string): Promise<Comment> => {
  try {
    const response = await api.post<ApiResponse<Comment>>('/comment', { body, post_id: postId })
    return handleResponse(response)
  } catch (error) {
    console.error('Failed to add comment:', error)
    throw error
  }
}

export const updateComment = async (id: string, body: string, postId: string, userId: string):Promise<Comment> => {
  try {
    const response = await api.put<ApiResponse<Comment>>(`/comment/${id}`, { body, post_id: postId, user_id: userId })
    return handleResponse(response)
  } catch (error) {
    console.error('Failed to update comment:', error)
    throw error
  }
}

export const deleteComment = async (id: string) => {
  try {
    await api.delete(`/comment/${id}`)
  } catch (error) {
    console.error('Failed to delete comment:', error)
    throw error
  }
}
