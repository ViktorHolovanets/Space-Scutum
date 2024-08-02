<script setup lang="ts">
import backgroundComponent from '@/components/backgroundComponent.vue';
import headComponent from '@/components/header/headerComponent.vue';
import allPostComponent from '@/components/post/allPostComponent.vue';

</script>

<template>
  <backgroundComponent />
  <div class="max-w-screen-xl my-8 mx-auto">
    <headComponent />
    <allPostComponent />
  </div>
</template>
