<script setup lang="ts">
import { computed, ref, watch, nextTick } from 'vue'
import { usePostsStore } from '@/stores/posts'
import ButtonAddComponent from '../ui-components/buttonAddComponent.vue'
import DetailsComment from '../comment/detailsComment.vue'
import { useAuthStore } from '@/stores/auth'

const storePost = usePostsStore()
const post = computed(() => storePost.currentPost)
const newComment = ref('')

const storeAuth = useAuthStore()

const close = () => {
    storePost.changeShow()
}

const addComment = async () => {
    if (newComment.value.trim() !== '' && storePost.currentPost) {
        try {
            await storePost.addCommentToPost(newComment.value, storePost.currentPost.id)
            newComment.value = ''
            await nextTick() 
            scrollToBottom() 
        } catch (error) {
            console.error('Failed to add comment:', error)
        }
    }
}

const scrollToBottom = () => {
    const container = document.querySelector('.max-h-56')
    if (container) {
        container.scrollTop = container.scrollHeight
    }
}

watch(() => {
    const currentPost = post.value
    return currentPost ? currentPost.comments : []
}, () => {
    nextTick(scrollToBottom)
})

</script>

<template>
    <div v-if="storePost.showDetails"
        class="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50 transition-opacity"
        :class="{ 'opacity-100': storePost.showDetails, 'opacity-0': !storePost.showDetails }">
        <div class="w-full max-w-2xl bg-white shadow-lg rounded-lg overflow-hidden max-h-[600px] flex flex-col">
            <div class="flex justify-between items-center p-4 border-b">
                <h2 class="text-xl font-semibold"><strong>{{ post?.user.name }}</strong></h2>
                <button @click="close" class="text-gray-500 hover:text-gray-700">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
            <div class="p-4 flex-1 overflow-auto flex flex-col">
                <div class="mb-4 bg-gray-400 p-3 rounded">
                    <h3 class="text-lg font-bold">{{ post?.title }}</h3>
                    <p>{{ post?.body }}</p>
                </div>
                <div class="flex-1 overflow-auto">
                    <h4 class="text-md font-semibold mb-2">Comments</h4>
                    <div class="max-h-56 overflow-y-auto">
                        <DetailsComment v-for="comment in post?.comments || []" :key="comment.id" :comment="comment"/>                    
                    </div>
                </div>
                <div class="mt-4">
                    <input v-model="newComment" :disabled="storeAuth.token == null" type="text" placeholder="Add a comment"
                        class="w-full px-3 py-2 border rounded outline-red-300" />
                    <ButtonAddComponent :onclickButton="addComment" />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
