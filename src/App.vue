<template>
  <div class="min-h-screen bg-gray-50 font-sans flex flex-col">
    <Navbar />
    
    <main class="flex-1 flex flex-col">
      <router-view></router-view>
    </main>
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue';
</script>