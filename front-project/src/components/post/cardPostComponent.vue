<script setup lang="ts">
import { defineProps, computed } from 'vue';
import type { Post } from '@/types';
import { useAuthStore } from '@/stores/auth';
const props = defineProps<{
    post: Post; // Указываємо тип пропсу
}>();
const store=useAuthStore();
const isAuthor = computed(() => {
  const userId = store.user?.id;
  return userId !== undefined && userId === props.post.user?.id;
});


</script>
<template>
    <div class="relative drop-shadow-xl w-1/3 h-64 overflow-hidden rounded-xl bg-[#3d3c3d] m-2">
        <div v-if="isAuthor">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="size-6 text-zinc-50">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
            </svg>

        </div>
        <div class="absolute flex flex-col items-center justify-center rounded-xl inset-0.5 bg-[#323132]">
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