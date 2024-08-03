<template>
    <div class="pagination">
      <button 
        @click="previousPage" 
        :disabled="currentPage === 1" 
        class="px-4 py-2 bg-gray-300 text-gray-800 rounded">
        Previous
      </button>
      <span class="px-4 py-2">{{ currentPage }}</span>
      <button 
        @click="nextPage" 
        class="px-4 py-2 bg-gray-300 text-gray-800 rounded">
        Next
      </button>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue';
  import { usePostsStore } from '@/stores/posts';
  
  const store = usePostsStore();
  const { currentPage, nextPage, previousPage } = store;
  
  const totalPages = computed(() => {
    // Assuming that you have a logic to determine total pages if needed
    return Infinity; // or set a limit if you have some predefined logic
  });
  </script>
  
  <style scoped>
  .pagination {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  button:disabled {
    background-color: #e0e0e0;
    cursor: not-allowed;
  }
  </style>
  