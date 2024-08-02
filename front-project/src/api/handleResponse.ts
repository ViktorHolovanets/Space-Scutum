import type { AxiosResponse } from 'axios';
import type { ApiResponse } from '@/types';

export function handleResponse<T>(response: AxiosResponse<ApiResponse<T>>): T {
  if (response.status === 200 && response.data.status === 'success') {
    return response.data.data;
  } else {
    throw new Error(response.data.message || 'Unexpected server response');
  }
}
