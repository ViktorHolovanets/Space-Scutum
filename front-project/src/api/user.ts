import api from './index'; 
import type { ApiResponse,   User } from '@/types/index';
import { handleResponse } from './handleResponse'; // Файл обробки відповіді

export async function updateUser(data: { name?: string; email?: string; password?: string }): Promise<User> {
  try {
    const response = await api.put<ApiResponse<User>>('/user/update', data);
    return handleResponse(response);
  } catch (error) {
    console.error('Update user error:', error);
    throw error;
  }
}

export async function deleteUser() {
  try {
    const response = await api.delete('/user');
    return handleResponse(response);
  } catch (error) {
    console.error('Delete user error:', error);
    throw error;
  }
}
