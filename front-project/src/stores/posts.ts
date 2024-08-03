import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Post } from '@/types';
import { getPosts } from '@/api/posts';

export const usePostsStore = defineStore('posts', () => {
  const posts = ref<Post[]>([]);
  const currentPage = ref(1);
  const totalPages = ref(1);
  const totalPosts = ref(0);
  const pageSize = 10; // Number of posts per page

  const loadPosts = async (page: number = 1) => {
    try {
      const response = await getPosts(page);
      posts.value = response.data;
      currentPage.value = page;
      totalPages.value = Math.ceil(response.total / pageSize); // Adjust as needed
      totalPosts.value = response.total;
    } catch (error) {
      console.error('Failed to load posts:', error);
    }
  };

  const nextPage = () => {
    if (currentPage.value < totalPages.value) {
      loadPosts(currentPage.value + 1);
    }
  };

  const previousPage = () => {
    if (currentPage.value > 1) {
      loadPosts(currentPage.value - 1);
    }
  };

  return { posts, currentPage, totalPages, totalPosts, loadPosts, nextPage, previousPage };
});

