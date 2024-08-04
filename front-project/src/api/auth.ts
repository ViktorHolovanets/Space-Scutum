import api from './index' 
import { handleResponse } from './handleResponse' 
import type { LoginResponse, ApiResponse } from '@/types'

export async function login(email: string, password: string): Promise<LoginResponse> {
  try {
    const response = await api.post<ApiResponse<LoginResponse>>('/login', { email, password })
    return handleResponse(response)
  } catch (error) {
    throw error
  }
}

export async function register(name: string, email: string, password: string) {
  try {
    const response = await api.post<ApiResponse<LoginResponse>>('/register', {
      name,
      email,
      password
    })
    return handleResponse(response)
  } catch (error) {
    throw error
  }
}

export const logout = async () => {
  try {
    const response = await api.post('/logout')
    return handleResponse(response)
  } catch (error) {
    console.error('Logout error:', error)
    throw error
  }
}

export const refresh = async () => {
  try {
    const response = await api.post<ApiResponse<LoginResponse>>('/refresh')
    const res=handleResponse(response);
    return res;
  } catch (error) {
    console.error('Refresh token error:', error)
    throw error
  }
}
