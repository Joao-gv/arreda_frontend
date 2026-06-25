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
            required
          />
        </div>

        <div>
          <label class="block text-sm font-bold text-gray-700 mb-1">Senha</label>
          <input 
            v-model="senha" 
            type="password" 
            placeholder="Sua senha" 
            class="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-arreda-green"
            required
          />
        </div>
        
        <button type="submit" :disabled="loading" class="w-full bg-arreda-green text-white font-bold px-4 py-3 rounded-xl hover:bg-arreda-dark transition disabled:opacity-50">
          {{ loading ? 'Entrando...' : 'Entrar' }}
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
import { authService } from '../services/authService'
import { useToast } from '../composables/useToast'
import { useAuth } from '../composables/useAuth.js'

const email = ref('')
const senha = ref('')
const loading = ref(false)
const router = useRouter()
const { dispararToast } = useToast()
const { setToken, fetchUser } = useAuth()

const handleLogin = async () => {
  loading.value = true
  try {
    const data = await authService.login(email.value, senha.value)
    setToken(data.accessToken, data.refreshToken)
    await fetchUser() // Busca dados e checa se é motorista
    dispararToast('Login realizado com sucesso!', 'success')
    router.push('/')
  } catch (error) {
    const dadosErro = error.response?.data;

    let errorMessage = 'Erro ao realizar login.';
    
    if (dadosErro) {
      if (Array.isArray(dadosErro) && dadosErro.length > 0) {
        errorMessage = dadosErro[0].mensagem || errorMessage;
      } else if (dadosErro.erro) {
        errorMessage = dadosErro.erro;
      } else if (dadosErro.message) {
        errorMessage = dadosErro.message;
      }
    }
    dispararToast(errorMessage, 'error')
  } finally {
    loading.value = false
  }
}
</script>