<script setup lang="ts">
import { usePostsStore } from '@/stores/posts';
import { createPost } from '@/api/posts';
import { computed, ref, watch } from 'vue';


const store = usePostsStore();
const title = ref('');
const body = ref('');
const isUpdate = computed(() => store.currentPost !== null);

watch(
  () => store.currentPost,
  (newPost) => {
    if (newPost) {
      title.value = newPost.title;
      body.value = newPost.body;
    } else {
      title.value = '';
      body.value = '';
    }
  },
  { immediate: true }
);
console.log(store.currentPost)
const createPostHandle = async () => {
  try {
    await createPost(title.value, body.value);
    store.closeModal();
    store.setCurrentPost(null);
  } catch (error) {
    console.error('Failed to create post:', error);
  }
}
const updatePostHandle = async () => {
  try {
    store.updateLocalPost(title.value, body.value);
    await store.update();
    store.closeModal();
  } catch (error) {
    console.error('Failed to create post:', error);
  }
}
</script>

<template>
  <div v-if="store.isModalWindowPostOpen"
    class=" fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
    <div class="modal-content bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative">
      <button @click="store.closeModal" class="absolute z-10 rounded-full top-4 right-4 text-gray-500 hover:bg-red-700">
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
          <button v-if="isUpdate" @click="updatePostHandle"
            class="bg-green-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Update Post
          </button>
          <button v-else @click="createPostHandle" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Create Post
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
