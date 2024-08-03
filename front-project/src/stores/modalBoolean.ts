import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useModalBooleanStore = defineStore('modal', () => {
  const isModalLoader = ref(false)
  const setLoading = (isLoading: boolean) => {
    isModalLoader.value = isLoading
  }

  return { isModalLoader, setLoading }
})
