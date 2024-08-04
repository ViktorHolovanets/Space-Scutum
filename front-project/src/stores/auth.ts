import { defineStore } from 'pinia'
import { ref } from 'vue'
import { login, register, logout, refresh } from '@/api/auth'
import type { LoginResponse, User } from '@/types'
import { deleteUser } from '@/api/user'

export const useAuthStore = defineStore('auth', () => {
  const userId = ref<string | null>(localStorage.getItem('id') ?? null)
  const userName = ref<string | null>(localStorage.getItem('name') ?? null)
  const token = ref<string | null>(localStorage.getItem('token') ?? null)
  const status = ref<string>('idle') // idle, loading, success, error

  const loginUser = async (email: string, password: string) => {
    status.value = 'loading'
    try {
      const response = await login(email, password)
      writeUser(response);
      status.value = 'success'
    } catch (error) {
      status.value = 'error'
      console.error('Login error:', error)
    }
  }

  const registerUser = async (name: string, email: string, password: string) => {
    status.value = 'loading'
    try {
      const response = await register(name, email, password)
      writeUser(response);
      status.value = 'success'
    } catch (error) {
      status.value = 'error'
      console.error('Registration error:', error)
    }
  }

  const logoutUser = async () => {
    status.value = 'loading'
    try {
      await logout()

      status.value = 'success'
    } catch (error) {
      status.value = 'error'
      console.error('Logout error:', error)
    }
    NullableUser()
  }

  const DeleteUser = async () => {
    status.value = 'loading'
    try {
      await deleteUser()
      NullableUser()
      status.value = 'success'
    } catch (error) {
      status.value = 'error'
      console.error('Logout error:', error)
    }
  }

  const refreshToken = async () => {
    status.value = 'loading'
    try {
      const response = await refresh()
      token.value = response.authorisation?.token??null;
      localStorage.setItem('token', `${response.authorisation?.token}`)
      status.value = 'success'
    } catch (error) {
      NullableUser()
      status.value = 'error'
    }
  }

  const NullableUser = async () => {
    userId.value = null
    userName.value = null
    token.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('id')
    localStorage.removeItem('name')
  }
  const writeUser = async (response: LoginResponse) => {
    userId.value = response?.user.id??null
    userName.value = response?.user.name??null
    token.value = response?.authorisation?.token || null
  
    localStorage.setItem('token', token.value || '')
    localStorage.setItem('id', userId.value || '')
    localStorage.setItem('name', userName.value || '')
  }
  return {
    userId,
    userName,
    token,
    status,
    NullableUser,
    loginUser,
    registerUser,
    logoutUser,
    refreshToken,
    DeleteUser
  }
})
