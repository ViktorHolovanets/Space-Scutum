<script setup lang="ts">
import { defineProps, computed } from 'vue';
import type { Post } from '@/types';
import { useAuthStore } from '@/stores/auth';
import EditDeleteComponent from '../editDeleteComponent.vue';
import { usePostsStore } from '@/stores/posts';
const storePost = usePostsStore();
const props = defineProps<{
    post: Post;
}>();
const store = useAuthStore();

const isAuthor = computed(() => {
    let res = store.userId === props.post.user?.id;
    return res;
});
const handleDelete = () => {
    storePost.removePost(props.post.id)
}
const handleEdit = () => {
    storePost.setCurrentPost(props.post);
    storePost.openModal();
}
const showPost=()=>{
    storePost.setCurrentPost(props.post)
    storePost.changeShow();
}
</script>
<template>
    <div :class="[
        'relative drop-shadow-xl w-1/3 h-64 overflow-hidden rounded-xl m-2',
        isAuthor ? 'bg-green-500' : 'bg-red-500'
    ]">
        <div @click="showPost" class="absolute flex flex-col items-center justify-center rounded-xl inset-0.5 bg-[#323132]">
            <EditDeleteComponent v-if="isAuthor" :onDelete="handleDelete" :onEdit="handleEdit" />
            <div class=" text-white z-[1] opacity-90 text-lg">{{ post.user.name }}</div>
            <div class=" text-orange-300 z-[1] opacity-90 text-center">{{ post.title }}</div>
            <div class=" flex absolute right-1 bottom-5">
                <div class="text-gray-50">Comments: {{ post.comments.length }}</div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="size-6 stroke-blue-500 mx-1">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                </svg>

            </div>

        </div>
    </div>
</template>
<style></style>