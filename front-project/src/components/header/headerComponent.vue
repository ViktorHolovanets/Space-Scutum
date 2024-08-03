<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import LoginComponent from '../user/loginComponent.vue';
import RegisterComponent from '../user/registerComponet.vue';
import MenuComponent from './menuComponent.vue';
const isLoginOpen = ref(false);
const isRegisterOpen = ref(false);
const useStore = useAuthStore();


const toggleLogin = () => {
    isLoginOpen.value = !isLoginOpen.value;
    if (isLoginOpen.value) isRegisterOpen.value = false;
};
const toggleRegister = () => {
    isRegisterOpen.value = !isRegisterOpen.value;
    if (isRegisterOpen.value) isLoginOpen.value = false;
};
</script>

<template>
    <header
        class="sticky top-0 z-20 flex w-full justify-between shadow-md  backdrop-blur-md mt-8 mb-1 rounded-lg bg-slate-500">
        <img src="../../assets/My blog.png" class="w-[35px] m-2 rounded-lg" alt="logo">
        <div v-if="useStore.token!=null" class="relative">
            <MenuComponent />
        </div>
        <div v-else class="flex">
            <button @click="toggleLogin" class="text-white px-4 py-2 rounded-md focus:outline-none">Login</button>
            <button @click="toggleRegister" class="text-white px-4 py-2 rounded-md focus:outline-none">Register</button>
            <div v-if="isLoginOpen" class="absolute right-0 mt-2 top-10 shadow-lg">
                <LoginComponent />
            </div>
            <div v-if="isRegisterOpen" class="absolute right-0 mt-2 top-10 shadow-lg">
                <RegisterComponent />
            </div>
        </div>
    </header>
</template>

<style scoped></style>
