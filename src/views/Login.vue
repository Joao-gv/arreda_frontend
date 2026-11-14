<template>
  <div class="flex-1 flex items-center justify-center bg-gray-50 px-4 py-10">
    <div class="bg-white p-6 sm:p-8 rounded-3xl shadow-xl border border-gray-100 max-w-md w-full">
      <h2 class="text-2xl font-bold text-gray-800 text-center mb-6">Acesse sua Conta</h2>

      <div
        v-if="emailNaoVerificado"
        class="mb-6 p-4 rounded-2xl border border-amber-200 bg-amber-50 text-left"
        role="alert"
      >
        <div class="flex items-start gap-3 mb-4">
          <AlertTriangle class="text-amber-500 shrink-0 mt-0.5" :size="20" aria-hidden="true" />
          <div>
            <p class="font-bold text-gray-800">Confirme seu e-mail para entrar</p>
            <p class="text-sm text-gray-600">{{ mensagemNaoVerificado }}</p>
          </div>
        </div>
        <BotaoReenviarConfirmacao :key="emailNaoVerificado" :email="emailNaoVerificado" />
      </div>

      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label for="login-email" class="block text-sm font-bold text-gray-700 mb-1">E-mail Acadêmico</label>
          <input 
            v-model="email" 
            id="login-email"
            name="email"
            autocomplete="email"
            type="email" 
            placeholder="exemplo@academico.ifmg.edu.br" 
            class="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-arreda-green"
            required
          />
        </div>

        <div>
          <label for="login-senha" class="block text-sm font-bold text-gray-700 mb-1">Senha</label>
          <input 
            v-model="senha" 
            id="login-senha"
            name="senha"
            autocomplete="current-password"
            type="password" 
            placeholder="Sua senha" 
            class="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-arreda-green"
            required
          />
          <div class="flex justify-end">
            <router-link to="/esqueci-senha" class="text-sm text-arreda-green font-bold hover:underline">
              Esqueci minha senha
            </router-link>
          </div>
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
import { AlertTriangle } from 'lucide-vue-next'
import BotaoReenviarConfirmacao from '../components/BotaoReenviarConfirmacao.vue'

// Código enviado pelo backend quando a senha está correta mas o e-mail ainda não foi confirmado.
const CODIGO_EMAIL_NAO_VERIFICADO = 'EMAIL_NAO_VERIFICADO'

const email = ref('')
const senha = ref('')
const loading = ref(false)
const emailNaoVerificado = ref('')
const mensagemNaoVerificado = ref('')
const router = useRouter()
const { dispararToast } = useToast()
const { setToken, fetchUser } = useAuth()

const handleLogin = async () => {
  loading.value = true
  emailNaoVerificado.value = ''
  try {
    const data = await authService.login(email.value, senha.value)
    setToken(data.accessToken, data.refreshToken)
    await fetchUser() // Busca dados e checa se é motorista
    dispararToast('Login realizado com sucesso!', 'success')
    router.push('/')
  } catch (error) {
    const dadosErro = error.response?.data;

    if (error.response?.status === 403 && dadosErro?.codigo === CODIGO_EMAIL_NAO_VERIFICADO) {
      emailNaoVerificado.value = email.value.trim()
      mensagemNaoVerificado.value = dadosErro.erro
        || 'Confirme seu e-mail antes de entrar. Verifique sua caixa de entrada e o spam.'
      return
    }

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