import axios from 'axios';
import type { AxiosInstance } from 'axios';
import { useModalBooleanStore } from '@/stores/modalBoolean';


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
  (error) => {
    useModalBooleanStore().setLoading(false);
    return Promise.reject(error);
  }
);
export default api;
