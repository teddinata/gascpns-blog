<template>
  <header class="bg-white w-full shadow">
    <div class="container mx-auto px-4 py-4 flex justify-between items-center">
      <div
        @click="$router.push('/')" 
        class="text-2xl font-bold flex items-center cursor-pointer">
        <img src="../../public/gascpns.png" alt="GASCPNS logo" class="h-16 mr-2">
      </div>
      <nav class="hidden md:flex space-x-4 items-center">
        <a href="https://gascpns.com" class="text-gray-600 hover:text-gray-900">Terbaru</a>
        <a href="https://app.gascpns.com" class="text-gray-600 hover:text-gray-900">Tryout</a>
      </nav>
      <div class="hidden md:flex space-x-4 items-center">
        <button class="bg-[#0BA7E3] rounded-full text-white px-4 py-2">Dashboard</button>
      </div>
      <button class="md:hidden text-gray-600" @click="toggleMenu">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>
    <nav v-if="isMenuOpen" class="md:hidden px-4 pb-4 space-y-2">
      <a href="https://gascpns.com" class="block text-gray-600 hover:text-gray-900">Terbaru</a>
      <a href="https://app.gascpns.com" class="block text-gray-600 hover:text-gray-900">Tryout</a>
      <button class="bg-[#0BA7E3] rounded-full text-white w-full px-4 py-2">Dashboard</button>
    </nav>
  </header>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'Header',
  setup() {
    const isMenuOpen = ref(false);

    const toggleMenu = () => {
      isMenuOpen.value = !isMenuOpen.value;
    };

    return {
      isMenuOpen,
      toggleMenu,
    };
  },
};
</script>

<style scoped>
/* Add any scoped styles here */
</style>
