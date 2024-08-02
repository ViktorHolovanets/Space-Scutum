import { defineStore } from 'pinia';
import { ref } from 'vue';
import { login, register, logout, refresh } from '@/api/auth';
import type { User } from '@/types';


export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null);
  const token = ref<string | null>(null);
  const status = ref<string>('idle'); // idle, loading, success, error

  const loginUser = async (email: string, password: string) => {
    status.value = 'loading';
    try {
      const response = await login(email, password);
      console.log(response);
      user.value = response.user;
      token.value = response.authorisation?.token || null;
      localStorage.setItem('token', token.value || '');
      status.value = 'success';
    } catch (error) {
      status.value = 'error';
      console.error('Login error:', error);
    }
  };

  const registerUser = async (name: string, email: string, password: string) => {
    status.value = 'loading';
    try {
      const response = await register(name, email, password);
      user.value = response.user;
      token.value = response.authorisation?.token || null;
      localStorage.setItem('token', token.value || '');
      status.value = 'success';
    } catch (error) {
      status.value = 'error';
      console.error('Registration error:', error);
    }
  };

  const logoutUser = async () => {
    status.value = 'loading';
    try {
      await logout();
      user.value = null;
      token.value = null;
      localStorage.removeItem('token');
      status.value = 'success';
    } catch (error) {
      status.value = 'error';
      console.error('Logout error:', error);
    }
  };

  const refreshToken = async () => {
    status.value = 'loading';
    try {
      const response = await refresh();
      user.value = response?.user??null;
      token.value = response?.authorisation?.token || null;
      localStorage.setItem('token', token.value || '');
      status.value = 'success';
    } catch (error) {
      status.value = 'error';
      console.error('Token refresh error:', error);
    }
  };

  return { user, token, status, loginUser, registerUser, logoutUser, refreshToken };
});
