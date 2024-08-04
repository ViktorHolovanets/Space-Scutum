import axios from 'axios';
import type { AxiosInstance } from 'axios';
import { useModalBooleanStore } from '@/stores/modalBoolean';
import { useAuthStore } from '@/stores/auth';

const api: AxiosInstance = axios.create({
  baseURL: 'http://localhost/api',
  headers: {
    'Content-Type': 'application/json',
  },
});


api.interceptors.request.use(
  (config) => {
    useModalBooleanStore().setLoading(true);
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    useModalBooleanStore().setLoading(false);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    useModalBooleanStore().setLoading(false);
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const authStore = useAuthStore();
    useModalBooleanStore().setLoading(false);

    if (error.response?.status === 401) {
      try {    
        await authStore.refreshToken();  
        const newToken = authStore.token;
        if (newToken) { 
          originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
          return api(originalRequest);
        } else {
          console.error('Failed to refresh token: No new token available.');
        }
      } catch (refreshError) {
        console.error('Failed to refresh token:', refreshError);
        authStore.NullableUser();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);


export default api;