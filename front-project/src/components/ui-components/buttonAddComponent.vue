<script setup lang="ts">
const props = defineProps<{
  onclickButton: () => void,
}>();

const handleClick = (event: MouseEvent) => {
  props.onclickButton?.();
};
</script>

<template>
  <div class="flex justify-end">
    <button 
      @click="handleClick"
      class="flex items-center bg-purple-600 text-white font-bold py-2 px-4 rounded-md shadow-lg transition-transform transform hover:-translate-y-1 active:translate-y-0 mt-2"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke-width="1.5" 
        stroke="currentColor" 
        class="w-6 h-6 mr-2"
      >
        <path stroke-linecap="round" stroke-linejoin="round"
            d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
      </svg>
      Send
    </button>
  </div>
</template>
