<template>
  <div class="flex-1 flex items-center justify-center bg-gray-50">
    <div class="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 max-w-md w-full">
      <h2 class="text-2xl font-bold text-gray-800 text-center mb-6">Acesse sua Conta</h2>
      
      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label class="block text-sm font-bold text-gray-700 mb-1">E-mail Acadêmico</label>
          <input 
            v-model="email" 
            type="email" 
            placeholder="exemplo@academico.ifmg.edu.br" 
            class="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-arreda-green"
          />
        </div>
        
        <button type="submit" class="w-full bg-arreda-green text-white font-bold px-4 py-3 rounded-xl hover:bg-arreda-dark transition">
          Entrar
        </button>
         <div class="mt-6 text-center text-sm text-gray-600">
          Não tem uma conta? 
          <router-link to="/cadastro" class="text-arreda-green font-bold hover:underline">
           Cadastre-se aqui
          </router-link>
</div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const router = useRouter()

const handleLogin = () => {
  console.log('Tentativa de login com:', email.value)
  // Futuramente, se o login for sucesso e tiver PERFIL-MOTORISTA, mandamos para o Painel!
  router.push('/')
}
</script>