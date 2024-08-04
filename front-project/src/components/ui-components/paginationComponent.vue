<script setup lang="ts">
import { usePostsStore } from '@/stores/posts';
import { computed } from 'vue';
const store = usePostsStore();



</script>
<template>
  <div class="pagination flex items-center justify-center sticky top-16 z-10 mb-2">
    <button @click="store.previousPage" :disabled="store.currentPage === 1" class="px-4 py-2 bg-teal-300 text-gray-800 rounded ">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
        class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M21 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061A1.125 1.125 0 0 1 21 8.689v8.122ZM11.25 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061a1.125 1.125 0 0 1 1.683.977v8.122Z" />
      </svg>

    </button>
    <span class="px-4 py-2 text-gray-50 shadow-red-400">{{ store.currentPage }}</span>
    <button @click="store.nextPage" class="px-4 py-2 bg-teal-300 text-gray-800 rounded">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
        class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811V8.69ZM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061a1.125 1.125 0 0 1-1.683-.977V8.69Z" />
      </svg>

    </button>
  </div>
</template>


<style scoped>
 
</style>