<template>
  <div class="min-h-screen bg-gray-50 font-sans flex flex-col">
    <Navbar />
    
    <main class="flex-1 flex flex-col">
      <router-view></router-view>
    </main>

    <Toast />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import Navbar from './components/Navbar.vue';
import { useAuth } from './composables/useAuth.js'
import Toast from './views/Toast.vue'

const { fetchUser, isAuthenticated } = useAuth()

onMounted(() => {
  if (isAuthenticated.value) {
    fetchUser()
  }
})
</script>