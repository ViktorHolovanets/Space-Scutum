<script setup lang="ts">
import type { Comment } from '@/types';
import { useAuthStore } from '@/stores/auth';
import { usePostsStore } from '@/stores/posts';
import { computed } from 'vue';

const props = defineProps<{
    comment: Comment;
}>();
const authStore = useAuthStore();
const posthStore = usePostsStore();
const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
};
const handleDelete = () => {
    posthStore.deleteCommentFromPost(props.comment.id, props.comment.post_id)
}
const isDelete = computed(() => {
    return authStore.userId === props.comment.user_id
})
</script>

<template>
    <div class="p-4 border-b">
        <div v-if="isDelete" @click="handleDelete" class=" absolute top-1 right-1 hover:text-red-400">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M12 9.75 14.25 12m0 0 2.25 2.25M14.25 12l2.25-2.25M14.25 12 12 14.25m-2.58 4.92-6.374-6.375a1.125 1.125 0 0 1 0-1.59L9.42 4.83c.21-.211.497-.33.795-.33H19.5a2.25 2.25 0 0 1 2.25 2.25v10.5a2.25 2.25 0 0 1-2.25 2.25h-9.284c-.298 0-.585-.119-.795-.33Z" />
            </svg>
        </div>
        <div class="flex ">
            <p class="font-semibold text-gray-700">{{ props.comment.user }}</p>
            <p class="text-xs text-gray-500 ml-2">{{ formatDate(props.comment.updated_at) }}</p>
        </div>

        <p class="text-gray-800">{{ props.comment.body }}</p>

    </div>
</template>

<style scoped></style>
