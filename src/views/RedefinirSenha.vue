<template>
  <div class="flex-1 flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6">
    <div class="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 max-w-md w-full">

      <!-- Estado de erro: link ausente, inválido, expirado ou já utilizado -->
      <template v-if="erroToken">
        <div class="text-center">
          <div class="mx-auto mb-4 w-14 h-14 rounded-full bg-red-50 flex items-center justify-center">
            <AlertTriangle :size="28" class="text-red-500" />
          </div>
          <h2 class="text-2xl font-bold text-gray-800 mb-2">Link de redefinição inválido</h2>
          <p class="text-sm text-gray-600 mb-6">{{ erroToken }}</p>
          <router-link to="/esqueci-senha" class="inline-block w-full bg-arreda-green text-white font-bold px-4 py-3 rounded-xl hover:bg-arreda-dark transition">
            Solicitar novo link
          </router-link>
          <div class="mt-6 text-center text-sm text-gray-600">
            Lembrou a senha? 
            <router-link to="/login" class="text-arreda-green font-bold hover:underline">
              Voltar para o login
            </router-link>
          </div>
        </div>
      </template>

      <!-- Formulário de redefinição -->
      <template v-else>
        <h2 class="text-2xl font-bold text-gray-800 text-center mb-2">Criar nova senha</h2>
        <p class="text-sm text-gray-600 text-center mb-6">
          Escolha uma nova senha para sua conta no Arreda.
        </p>

        <form @submit.prevent="handleRedefinirSenha" class="space-y-5">
          <div>
            <label for="nova-senha" class="block text-sm font-bold text-gray-700 mb-1">Nova senha</label>
            <input 
              v-model="novaSenha" 
              id="nova-senha"
              name="novaSenha"
              autocomplete="new-password"
              type="password" 
              placeholder="Digite a nova senha" 
              class="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-arreda-green"
              required
            />

            <!-- Indicador visual de força -->
            <div class="mt-2 flex items-center gap-2">
              <div class="flex flex-1 gap-1.5">
                <div 
                  v-for="i in 3" 
                  :key="i" 
                  class="h-1.5 flex-1 rounded-full transition-colors"
                  :class="i <= forcaSenha.nivel ? forcaSenha.cor : 'bg-gray-200'"
                ></div>
              </div>
              <span v-if="forcaSenha.rotulo" class="text-xs font-bold" :class="forcaSenha.texto">
                {{ forcaSenha.rotulo }}
              </span>
            </div>
            <p class="mt-1.5 text-xs text-gray-500">Mínimo de 8 caracteres, com pelo menos uma letra e um número.</p>
            <p v-if="tentouEnviar && !regraOk" class="mt-1 text-xs font-bold text-red-500">
              A senha deve ter entre 8 e 72 caracteres, com pelo menos uma letra e um número.
            </p>
          </div>

          <div>
            <label for="confirmar-nova-senha" class="block text-sm font-bold text-gray-700 mb-1">Confirmar nova senha</label>
            <input 
              v-model="confirmarSenha" 
              id="confirmar-nova-senha"
              name="confirmarSenha"
              autocomplete="new-password"
              type="password" 
              placeholder="Confirme a nova senha" 
              class="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-arreda-green"
              required
            />
            <p v-if="tentouEnviar && !senhasIguais" class="mt-1 text-xs font-bold text-red-500">
              As senhas não coincidem.
            </p>
          </div>

          <button type="submit" :disabled="loading" class="w-full bg-arreda-green text-white font-bold px-4 py-3 rounded-xl hover:bg-arreda-dark transition disabled:opacity-50">
            {{ loading ? 'Redefinindo...' : 'Redefinir senha' }}
          </button>
        </form>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { AlertTriangle } from 'lucide-vue-next'
import { authService } from '../services/authService'
import { useToast } from '../composables/useToast'
import { useAuth } from '../composables/useAuth'
import { calcularForcaSenha } from '../utils/forcaSenha'

const route = useRoute()
const router = useRouter()
const { dispararToast } = useToast()
const { clearAuth } = useAuth()

const novaSenha = ref('')
const confirmarSenha = ref('')
const loading = ref(false)
const tentouEnviar = ref(false)
const erroToken = ref('')

const token = computed(() => {
  const valor = route.query.token
  return Array.isArray(valor) ? valor[0] : valor
})

// Sem token na query, já abre na tela de erro para solicitar um novo link
if (!token.value) {
  erroToken.value = 'Link de redefinição inválido ou incompleto. Solicite um novo link.'
}

// Mesma regra do backend: 8 a 72 caracteres, com pelo menos uma letra e um número
const regraOk = computed(() =>
  novaSenha.value.length >= 8 &&
  novaSenha.value.length <= 72 &&
  /[A-Za-z]/.test(novaSenha.value) &&
  /\d/.test(novaSenha.value)
)

const senhasIguais = computed(() => novaSenha.value === confirmarSenha.value)

const forcaSenha = computed(() => calcularForcaSenha(novaSenha.value))

const handleRedefinirSenha = async () => {
  tentouEnviar.value = true

  // Bloqueia o envio se as regras da senha não forem atendidas
  if (!regraOk.value) {
    dispararToast('A senha deve ter entre 8 e 72 caracteres, com pelo menos uma letra e um número.', 'error')
    return
  }

  // Bloqueia o envio se os dois campos de senha forem diferentes
  if (!senhasIguais.value) {
    dispararToast('As senhas não coincidem!', 'error')
    return
  }

  loading.value = true
  try {
    await authService.redefinirSenha(token.value, novaSenha.value)
    // A nova senha invalidou as sessões antigas; sai de qualquer conta aberta antes de ir ao login
    clearAuth()
    dispararToast('Senha alterada, faça login novamente.', 'success')
    // replace: o token sai da URL e não fica acessível pelo botão "voltar"
    router.replace('/login')
  } catch (error) {
    const dadosErro = error.response?.data;

    let errorMessage = 'Erro ao redefinir a senha.';
    if (Array.isArray(dadosErro) && dadosErro.length > 0) {
      errorMessage = dadosErro[0].mensagem || errorMessage;
    } else if (dadosErro?.erro) {
      errorMessage = dadosErro.erro;
    } else if (dadosErro?.mensagem) {
      errorMessage = dadosErro.mensagem;
    }

    // 400 com { erro } = token inválido, expirado ou já utilizado: mostra a tela de erro
    const ehErroDeValidacao = Array.isArray(dadosErro)
    if (error.response?.status === 400 && !ehErroDeValidacao) {
      erroToken.value = errorMessage
    } else {
      dispararToast(errorMessage, 'error')
    }
  } finally {
    loading.value = false
  }
}
</script>
