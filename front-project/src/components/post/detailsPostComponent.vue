<script setup lang="ts">
import { computed, ref } from 'vue'
import { usePostsStore } from '@/stores/posts';

const storePost = usePostsStore();
const post = computed(() => {
    return storePost.currentPost;
})

const close = () => {
    storePost.changeShow();
}
</script>

<template>
    <div v-if="storePost.showDetails"
        class="fixed bottom-0 left-0 w-full bg-white shadow-lg rounded-t-lg transition-transform transform"
        :class="{ 'translate-y-0': storePost.showDetails, 'translate-y-full': !storePost.showDetails }">
        <div class="flex justify-between items-center p-4 border-b">
            <h2 class="text-xl font-semibold"><strong>{{ post?.user.name }}</strong></h2>
            <button @click="close" class="text-gray-500 hover:text-gray-700">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12">
                    </path>
                </svg>
            </button>
        </div>
        <div class="p-4">
            <div class="mb-4">
                <h3 class="text-lg font-bold">{{ post?.title }}</h3>
                <p>{{ post?.body }}</p>
            </div>
            <div class="mt-4">
                <h4 class="text-md font-semibold">Comments</h4>
                <div v-for="comment in post?.comments" :key="comment.id" class="border-b py-2">
                    <p><strong>{{ comment.user }}:</strong> {{ comment.body }}</p>
                </div>
            </div>
        </div>
    </div>
</template>



<style scoped></style>