<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { usePostsStore } from '@/stores/posts';

const isMenuOpen = ref(false);
const isSettingsMenuOpen = ref(false);
const useStore = useAuthStore();
const postStore = usePostsStore();

const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
};

const toggleSettingsMenu = () => {
    isSettingsMenuOpen.value = !isSettingsMenuOpen.value;
};

const handleOpenModal = () => {
    postStore.setCurrentPost(null);
    postStore.openModal()
}
</script>
<template>
    <div class="relative">

        <button @click="toggleMenu" class="text-white px-4 py-2 rounded-md focus:outline-none flex">

            {{ useStore?.userName }}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="size-6 mx-2">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
            </svg>
        </button>

        <div v-if="isMenuOpen" @click.self="toggleMenu"
            class="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
            <ul class="py-1">
                <li>
                    <button @click="handleOpenModal" class="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100">
                        New post
                    </button>
                </li>
                <li class="relative">

                    <button @click="toggleSettingsMenu"
                        class="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100">
                        Settings
                    </button>
                    <div v-if="isSettingsMenuOpen" @click.self="toggleSettingsMenu"
                        class="absolute right-0 mt-2 w-48 bg-slate-400 border border-gray-200 rounded-lg shadow-lg">
                        <ul class="py-1">
                            <li>
                                <button @click="useStore.DeleteUser"
                                    class="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100">
                                    Delete Acount
                                </button>
                            </li>
                            <li>
                                <button @click="useStore.logoutUser"
                                    class="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100">
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped></style>