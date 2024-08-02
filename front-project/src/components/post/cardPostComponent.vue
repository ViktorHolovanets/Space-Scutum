<script setup lang="ts">
import { comment } from 'postcss';
import { ref, watch } from 'vue';

const props = defineProps({
  author: { type: String, required: true },
  title: String,
  comments: Number,
});



</script>
<template>
    <div class="relative drop-shadow-xl w-1/3 h-64 overflow-hidden rounded-xl bg-[#3d3c3d] m-2">
        <div
            class="absolute flex flex-col items-center justify-center rounded-xl inset-0.5 bg-[#323132]">
            <div class=" text-white z-[1] opacity-90 text-lg">{{author}}</div>
            <div class=" text-orange-300 z-[1] opacity-90 text-center">{{ title }}</div>
            <div class="static right-10 bottom-5">Comments: {{ comments }}</div>
        </div>    
    </div>
</template>
<style></style>