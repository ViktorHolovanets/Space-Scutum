<script setup lang="ts">
import cardPostComponent from './cardPostComponent.vue';
import { usePostsStore } from '@/stores/posts';

const postsStore = usePostsStore();
postsStore.loadPosts();

</script>
<template>
    <div class="content  flex flex-wrap justify-around mx-auto">        
        <cardPostComponent v-for="item in postsStore.posts" :key="item.id" :author="item.user.name" :title="item.title" :comments="item.comments.length"/>
    </div>
    <div></div>
</template>
<style scoped>
.content {
    max-width: 1320px;
    background-color: rgba(255, 255, 255, 0.4);
    -webkit-backdrop-filter: blur(5px);
    backdrop-filter: blur(5px);
}
</style>