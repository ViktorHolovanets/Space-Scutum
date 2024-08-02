<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import LoginComponent from '../user/loginComponent.vue';
import RegisterComponet from '../user/registerComponet.vue';
const isMenuOpen = ref(false);
const isLoginOpen = ref(false);
const isRegisterOpen = ref(false);
const useStore = useAuthStore();
const isAuth = ref(useStore.user == null);
const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
};
const toggleLogin = () => {
    isLoginOpen.value = !isLoginOpen.value;
    isRegisterOpen.value = false;
};
const toggleRegister = () => {
    isRegisterOpen.value = !isRegisterOpen.value;
    isLoginOpen.value = false;
};
</script>

<template>

    <header class="sticky top-0 z-20 flex  w-full justify-between shadow-md rounded-sm" >
        <img src="../../assets/My blog.png" class="w-[35px] " alt="logo">

        <div v-if="isAuth" class="flex">
            <button @click="toggleLogin" class="text-white px-4 py-2 rounded-md focus:outline-none">Login</button>
            <button @click="toggleRegister" class="text-white px-4 py-2 rounded-md focus:outline-none">Rtgister</button>
            <div v-if="isLoginOpen" class="absolute right-0 mt-2 top-10  shadow-lg">
                <LoginComponent/>
            </div>
            <div v-if="isRegisterOpen" class="absolute right-0 mt-2 top-10  shadow-lg">
                <RegisterComponet/>
            </div>
        </div>
        <div v-else>
            <div class="relative">
                <!-- Menu Toggle Button -->
                <button @click="toggleMenu" class=" text-white px-4 py-2 rounded-md focus:outline-none">
                    Menu
                </button>

                <!-- Dropdown Menu -->
                <div v-if="isMenuOpen" @click.self="toggleMenu"
                    class="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
                    <ul class="py-1">
                        <li>
                            <button class="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100">Login</button>
                        </li>
                        <li>
                            <button class="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100">Register</button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </header>

</template>
<style scoped>
header {
    background-color: cornflowerblue;
    backdrop-filter: blur(10px);
}
</style>