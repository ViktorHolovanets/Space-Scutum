import { defineStore } from 'pinia';
import { ref } from 'vue';
import { login, register, logout, refresh } from '@/api/auth';
import type { User } from '@/types';
import { deleteUser } from '@/api/user';


export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null);
  const token = ref<string | null>(localStorage.getItem('token')??null);
  const IsActive = ref<Boolean>(localStorage.getItem('token')!=null);
  const status = ref<string>('idle'); // idle, loading, success, error

  const loginUser = async (email: string, password: string) => {
    status.value = 'loading';
    try {
      const response = await login(email, password);
      
      user.value = response.user;
      token.value = response.authorisation?.token || null;
      IsActive.value=true;
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
      IsActive.value=true;
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
      NullableUser();
      status.value = 'success';
    } catch (error) {
      status.value = 'error';
      console.error('Logout error:', error);
    }
  };

  const DeleteUser = async () => {
    status.value = 'loading';
    try {
      await deleteUser();
      NullableUser();
      status.value = 'success';
    } catch (error) {
      status.value = 'error';
      console.error('Logout error:', error);
    }
  };
  const NullableUser = async () => {
      user.value = null;
      token.value = null;
      IsActive.value=false;
      localStorage.removeItem('token');
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

  return { user, token, status,IsActive, loginUser, registerUser, logoutUser, refreshToken, DeleteUser };
});
