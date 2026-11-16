<template>
  <nav class="bg-white text-gray-800 p-4 sticky top-0 z-50 shadow-sm border-b border-gray-100">
    <div class="container mx-auto flex justify-between items-center">
      
      <router-link to="/" class="flex items-center gap-2 text-arreda-green transition hover:opacity-80">
        <Car :size="32" class="fill-current" />
        <h1 class="text-3xl font-extrabold tracking-tight">arreda</h1>
      </router-link>

      <router-link v-if="isAuthenticated" to="/perfil" class="ml-auto md:hidden" aria-label="Abrir meu perfil">
        <AvatarUsuario :nome="user?.nome" :foto-url="user?.fotoUrl" :size="40" />
      </router-link>

      <div class="hidden md:flex items-center gap-6">
        
        <router-link to="/buscar-caronas" class="font-bold text-gray-600 hover:text-arreda-green transition">
          Buscar Caronas
        </router-link>

        <router-link v-if="isAuthenticated" to="/oferecer-carona" class="font-bold text-gray-600 hover:text-arreda-green transition">
          Oferecer Carona
        </router-link>
        
        <router-link v-if="isAuthenticated" to="/minhas-reservas" class="font-bold text-gray-600 hover:text-arreda-green transition">
          Minhas Reservas
        </router-link>

        <template v-if="!isAuthenticated">
          <router-link to="/login" class="flex items-center gap-2 text-gray-600 font-medium hover:text-arreda-green transition">
            <UserCircle :size="24" />
            <span>Entrar</span>
          </router-link>
        </template>
        <template v-else>
          <div class="relative group flex items-center gap-2 text-gray-600 font-medium transition">
            <AvatarUsuario :nome="user?.nome" :foto-url="user?.fotoUrl" :size="36" />
            <span>{{ userPrimeiroNome }}</span>
            <div class="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-all duration-200 overflow-hidden">
              <router-link to="/perfil" class="block w-full px-4 py-3 font-bold text-gray-700 hover:bg-gray-50 transition">
                Meu perfil
              </router-link>
              <button @click="logout" class="w-full text-left px-4 py-3 text-red-500 hover:bg-red-50 font-bold transition flex items-center gap-2">
                <LogOut :size="18"/> Sair
              </button>
            </div>
          </div>
        </template>
        
        <router-link v-if="isAuthenticated" to="/painel-motorista" class="bg-arreda-green text-white px-5 py-2.5 rounded-full font-bold hover:bg-arreda-dark transition shadow-md">
          Área do Motorista
        </router-link>
      </div>
      
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { Car, LogOut } from 'lucide-vue-next';
import AvatarUsuario from './AvatarUsuario.vue'
import { useAuth } from '../composables/useAuth.js'

const { isAuthenticated, user, logout } = useAuth()

const userPrimeiroNome = computed(() => {
  if (!user.value || !user.value.nome) return 'Perfil'
  return user.value.nome.split(' ')[0]
})
</script>
