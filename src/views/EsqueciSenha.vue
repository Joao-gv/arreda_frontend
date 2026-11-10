<template>
  <div class="flex-1 flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6">
    <div class="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 max-w-md w-full">

      <!-- Estado inicial: formulário de solicitação -->
      <template v-if="!enviado">
        <h2 class="text-2xl font-bold text-gray-800 text-center mb-2">Esqueci minha senha</h2>
        <p class="text-sm text-gray-600 text-center mb-6">
          Informe seu e-mail acadêmico e enviaremos um link para você criar uma nova senha.
        </p>

        <form @submit.prevent="handleEsqueciSenha" class="space-y-4">
          <div>
            <label for="esqueci-email" class="block text-sm font-bold text-gray-700 mb-1">E-mail Acadêmico</label>
            <input 
              v-model="email" 
              id="esqueci-email"
              name="email"
              autocomplete="email"
              type="email" 
              placeholder="exemplo@academico.ifmg.edu.br" 
              class="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-arreda-green"
              required
            />
          </div>

          <button type="submit" :disabled="loading" class="w-full bg-arreda-green text-white font-bold px-4 py-3 rounded-xl hover:bg-arreda-dark transition disabled:opacity-50">
            {{ loading ? 'Enviando...' : 'Enviar link de redefinição' }}
          </button>
        </form>

        <div class="mt-6 text-center text-sm text-gray-600">
          Lembrou a senha? 
          <router-link to="/login" class="text-arreda-green font-bold hover:underline">
            Voltar para o login
          </router-link>
        </div>
      </template>

      <!-- Estado de confirmação: mensagem neutra, exista ou não a conta -->
      <template v-else>
        <div class="text-center">
          <div class="mx-auto mb-4 w-14 h-14 rounded-full bg-arreda-light flex items-center justify-center">
            <Mail :size="28" class="text-arreda-green" />
          </div>
          <h2 class="text-2xl font-bold text-gray-800 mb-2">Verifique seu e-mail</h2>
          <p class="text-sm text-gray-600 mb-3">{{ mensagem }}</p>
          <p class="text-xs text-gray-500 mb-6">Confira também a caixa de spam. O link para criar a nova senha é válido por 30 minutos.</p>
          <router-link to="/login" class="inline-block w-full bg-arreda-green text-white font-bold px-4 py-3 rounded-xl hover:bg-arreda-dark transition">
            Voltar para o login
          </router-link>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Mail } from 'lucide-vue-next'
import { authService } from '../services/authService'
import { useToast } from '../composables/useToast'

const email = ref('')
const loading = ref(false)
const enviado = ref(false)
const mensagem = ref('')
const { dispararToast } = useToast()

const handleEsqueciSenha = async () => {
  loading.value = true
  try {
    const data = await authService.esqueciSenha(email.value)
    // Mensagem neutra do backend: não revela se a conta existe
    mensagem.value = data.mensagem || 'Se o e-mail estiver cadastrado, você receberá um link de redefinição.'
    enviado.value = true
  } catch (error) {
    const dadosErro = error.response?.data;

    let errorMessage = 'Erro ao enviar o e-mail de redefinição.';
    
    if (dadosErro) {
      if (Array.isArray(dadosErro) && dadosErro.length > 0) {
        errorMessage = dadosErro[0].mensagem || errorMessage;
      } else if (dadosErro.erro || dadosErro.mensagem) {
        errorMessage = dadosErro.erro || dadosErro.mensagem;
      }
    }
    dispararToast(errorMessage, 'error')
  } finally {
    loading.value = false
  }
}
</script>
