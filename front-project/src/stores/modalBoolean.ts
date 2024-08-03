import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useModalBooleanStore = defineStore('modal', () => {
  const isModalNewPostOpen = ref(false);

  const openModal = () => {
    isModalNewPostOpen.value = true;
  };

  const closeModal = () => {
    isModalNewPostOpen.value = false;
  };

  return { isModalNewPostOpen, openModal, closeModal };
});
