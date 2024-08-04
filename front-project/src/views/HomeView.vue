<script setup lang="ts">
import backgroundComponent from '@/components/ui-components/backgroundComponent.vue';
import headComponent from '@/components/header/headerComponent.vue';
import LoaderComponent from '@/components/ui-components/loaderComponent.vue';
import PaginationComponent from '@/components/ui-components/paginationComponent.vue';
import allPostComponent from '@/components/post/allPostComponent.vue';
import DetailsPostComponent from '@/components/post/detailsPostComponent.vue';
import NewPostComponent from '@/components/post/windowPostComponent.vue';

</script>

<template>
  <backgroundComponent />
  <div class="max-w-screen-xl my-8 mx-auto">
    <headComponent />
    <PaginationComponent/>
    <allPostComponent />
    <NewPostComponent/>
    <LoaderComponent />
    <DetailsPostComponent/>
  </div>
</template>
