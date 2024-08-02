<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { ref } from 'vue';

const email = ref('');
const name = ref('');
const password = ref('');
const authStore = useAuthStore();
const handleRegister = () => {
    authStore.registerUser(name.value, email.value, password.value)
}
</script>
<template>
    <div class="flex flex-col gap-4 max-w-md p-6 rounded-lg bg-gray-900 w-[315px] text-white border border-gray-800">
      <p class="text-2xl font-semibold text-blue-400 relative pl-8">
        Register
        <span class="absolute inset-y-0 left-0 flex items-center">
          <span class="h-4 w-4 rounded-full bg-blue-400 animate-pulse"></span>
        </span>
      </p>
      <label class="relative">
        <input class="w-full p-3 bg-gray-800 text-white border border-gray-600 rounded-md focus:outline-none focus:border-blue-400" 
               type="email" placeholder="Email" v-model="email">
        <span class="absolute left-2 top-2 text-gray-400 transition-transform duration-300 ease-in-out transform -translate-y-2 scale-75 origin-top-left">Email</span>
      </label>
      <label class="relative">
        <input class="w-full p-3 bg-gray-800 text-white border border-gray-600 rounded-md focus:outline-none focus:border-blue-400"
               placeholder="Name" v-model="name">
        <span class="absolute left-2 top-2 text-gray-400 transition-transform duration-300 ease-in-out transform -translate-y-2 scale-75 origin-top-left">Name</span>
      </label>
      <label class="relative">
        <input class="w-full p-3 bg-gray-800 text-white border border-gray-600 rounded-md focus:outline-none focus:border-blue-400"
               type="password" placeholder="Password" v-model="password">
        <span class="absolute left-2 top-2 text-gray-400 transition-transform duration-300 ease-in-out transform -translate-y-2 scale-75 origin-top-left">Password</span>
      </label>
      <button class="w-full py-3 bg-blue-500 text-white font-semibold rounded-md transition-transform duration-300 ease-in-out hover:bg-blue-400">
        Submit
      </button>
    </div>
  </template>
