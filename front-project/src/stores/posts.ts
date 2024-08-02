import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Post } from '@/types';
import { fetchPosts } from '@/api/posts';

export const usePostsStore = defineStore('posts', () => {
    const posts = ref<Post[]>([]);

    const loadPosts = async () => {
      try {
        posts.value = await fetchPosts();
      } catch (error) {
        console.error('Failed to load posts:', error);
      }
    };
  
    return { posts, loadPosts };
});
