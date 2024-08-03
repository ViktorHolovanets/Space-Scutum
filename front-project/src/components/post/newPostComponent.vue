<script setup lang="ts">
import { useModalBooleanStore } from '@/stores/modalBoolean';
import { createPost } from '@/api/posts';
import { ref } from 'vue';

const modal = useModalBooleanStore();

const title = ref('');
const body = ref('');
const createPostHandle = async () => {
  try {
    await createPost(title.value, body.value);
    modal.closeModal(); // Закриваємо модальне вікно після створення посту
    title.value = ''; // Очищаємо поля форми
    body.value = '';
  } catch (error) {
    console.error('Failed to create post:', error);
  }
}
</script>

<template>
  <div v-if="modal.isModalNewPostOpen"
    class="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
    <div class="modal-content bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative">
      <button @click="modal.closeModal" class="absolute z-10 rounded-full top-4 right-4 text-gray-500 hover:bg-red-700">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>

      <h2 class="text-xl font-semibold mb-4">Create Post</h2>
      <div>
        <div class="mb-4">
          <label for="title" class="block text-gray-700 font-medium mb-2">Title</label>
          <input type="text" v-model="title" class="w-full border border-gray-300 p-2 rounded" placeholder="Post Title">
        </div>
        <div class="mb-4">
          <label for="content" class="block text-gray-700 font-medium mb-2">Content</label>
          <textarea id="content" rows="4" v-model="body" class="w-full border border-gray-300 p-2 rounded"
            placeholder="Post Content"></textarea>
        </div>
        <div class="flex justify-end">
          <button @click="createPostHandle" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Create
            Post</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
