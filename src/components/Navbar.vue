<template>
  <nav class="bg-white text-gray-800 p-4 sticky top-0 z-50 shadow-sm border-b border-gray-100">
    <div class="container mx-auto flex justify-between items-center">
      
      <router-link to="/" class="flex items-center gap-2 text-arreda-green transition hover:opacity-80">
        <Car :size="32" class="fill-current" />
        <h1 class="text-3xl font-extrabold tracking-tight">arreda</h1>
      </router-link>

      <div class="hidden md:flex items-center gap-6">
        
        <router-link to="/buscar-caronas" class="font-bold text-gray-600 hover:text-arreda-green transition">
          Buscar Caronas
        </router-link>

        <router-link to="/oferecer-carona" class="font-bold text-gray-600 hover:text-arreda-green transition">
          Oferecer Carona
        </router-link>
        
        <router-link to="/minhas-reservas" class="font-bold text-gray-600 hover:text-arreda-green transition">
          Minhas Reservas
        </router-link>

        <router-link to="/login" class="flex items-center gap-2 text-gray-600 font-medium hover:text-arreda-green transition">
          <UserCircle :size="24" />
          <span>Entrar</span>
        </router-link>
        
        <router-link to="/painel-motorista" class="bg-arreda-green text-white px-5 py-2.5 rounded-full font-bold hover:bg-arreda-dark transition shadow-md">
          Área do Motorista
        </router-link>
      </div>
      
    </div>
  </nav>
</template>

<script setup>
// No Vue, os ícones do Lucide são importados assim e não precisam ser declarados no template, 
// o `<script setup>` já faz o link automático!
import { Car, UserCircle } from 'lucide-vue-next';
</script>