<template>
  <div class="flex-1 flex items-center justify-center bg-gray-50 px-4 py-10">
    <div class="bg-white p-6 sm:p-8 rounded-3xl shadow-xl border border-gray-100 max-w-md w-full text-center" aria-live="polite">

      <template v-if="estado === 'carregando'">
        <Loader2 class="mx-auto mb-4 text-arreda-green animate-spin" :size="40" aria-hidden="true" />
        <h2 class="text-2xl font-bold text-gray-800 mb-2">Confirmando seu e-mail...</h2>
        <p class="text-gray-600">Aguarde só um instante.</p>
      </template>

      <template v-else-if="estado === 'sucesso'">
        <div class="mx-auto mb-4 w-16 h-16 rounded-full bg-arreda-light flex items-center justify-center">
          <CheckCircle class="text-arreda-green" :size="32" aria-hidden="true" />
        </div>
        <h2 class="text-2xl font-bold text-gray-800 mb-2">E-mail confirmado!</h2>
        <p class="text-gray-600 mb-6">{{ mensagem }}</p>
        <router-link
          to="/login"
          class="block w-full bg-arreda-green text-white font-bold px-4 py-3 rounded-xl hover:bg-arreda-dark transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-arreda-green"
        >
          Ir para login
        </router-link>
      </template>

      <template v-else>
        <div class="mx-auto mb-4 w-16 h-16 rounded-full bg-red-50 flex items-center justify-center">
          <XCircle class="text-red-500" :size="32" aria-hidden="true" />
        </div>
        <h2 class="text-2xl font-bold text-gray-800 mb-2">Não foi possível confirmar</h2>
        <p class="text-gray-600 mb-6">{{ mensagem }}</p>

        <div class="text-left mb-4">
          <label for="email-reenvio" class="block text-sm font-bold text-gray-700 mb-1">Receber um novo link</label>
          <input
            id="email-reenvio"
            v-model="email"
            type="email"
            autocomplete="email"
            placeholder="nome@academico.ifmg.edu.br"
            class="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-arreda-green"
          />
        </div>
        <BotaoReenviarConfirmacao :email="email" />

        <p class="mt-6 text-sm text-gray-600">
          <router-link to="/login" class="text-arreda-green font-bold hover:underline">Voltar para o login</router-link>
        </p>
      </template>

    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { CheckCircle, Loader2, XCircle } from 'lucide-vue-next'
import { authService } from '../services/authService.js'
import BotaoReenviarConfirmacao from '../components/BotaoReenviarConfirmacao.vue'

const route = useRoute()
const router = useRouter()

const estado = ref('carregando') // 'carregando' | 'sucesso' | 'erro'
const mensagem = ref('')
const email = ref('')

onMounted(async () => {
  const token = typeof route.query.token === 'string' ? route.query.token : ''

  // Remove o token da barra de endereço e do histórico assim que ele é lido.
  if (route.query.token !== undefined) {
    router.replace({ path: route.path })
  }

  if (!token) {
    estado.value = 'erro'
    mensagem.value = 'O link de confirmação está incompleto. Peça um novo link abaixo.'
    return
  }

  try {
    const data = await authService.confirmarEmail(token)
    mensagem.value = data?.mensagem || 'E-mail confirmado com sucesso. Você já pode fazer login.'
    estado.value = 'sucesso'
  } catch (error) {
    mensagem.value = error.response?.data?.erro
      || 'Não conseguimos confirmar seu e-mail agora. Tente novamente em instantes.'
    estado.value = 'erro'
  }
})
</script>
