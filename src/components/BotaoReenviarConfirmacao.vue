<template>
  <div class="space-y-2">
    <button
      type="button"
      :disabled="desabilitado"
      @click="reenviar"
      class="w-full flex items-center justify-center gap-2 bg-arreda-green text-white font-bold px-4 py-3 rounded-xl hover:bg-arreda-dark transition disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-arreda-green"
    >
      <RefreshCw :size="18" :class="{ 'animate-spin': enviando }" aria-hidden="true" />
      <span v-if="enviando">Enviando...</span>
      <span v-else-if="segundosRestantes > 0">Reenviar e-mail em {{ tempoFormatado }}</span>
      <span v-else>Reenviar e-mail</span>
    </button>
    <p v-if="aviso" class="text-sm text-center text-gray-600" role="status" aria-live="polite">{{ aviso }}</p>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { RefreshCw } from 'lucide-vue-next'
import { authService } from '../services/authService.js'

// O backend aceita 1 reenvio por e-mail a cada 2 minutos; o contador espelha esse limite.
const INTERVALO_SEGUNDOS = 120

const props = defineProps({
  email: { type: String, required: true },
  // true quando um e-mail acabou de ser enviado (ex.: logo após o cadastro)
  iniciarContando: { type: Boolean, default: false }
})

const enviando = ref(false)
const segundosRestantes = ref(0)
const aviso = ref('')
let intervalo = null

const desabilitado = computed(() => enviando.value || segundosRestantes.value > 0 || !props.email)

const tempoFormatado = computed(() => {
  const minutos = Math.floor(segundosRestantes.value / 60)
  const segundos = String(segundosRestantes.value % 60).padStart(2, '0')
  return `${minutos}:${segundos}`
})

const pararContador = () => {
  clearInterval(intervalo)
  intervalo = null
}

const iniciarContador = () => {
  pararContador()
  segundosRestantes.value = INTERVALO_SEGUNDOS
  intervalo = setInterval(() => {
    segundosRestantes.value -= 1
    if (segundosRestantes.value <= 0) pararContador()
  }, 1000)
}

const reenviar = async () => {
  if (desabilitado.value) return
  enviando.value = true
  aviso.value = ''
  try {
    const data = await authService.reenviarConfirmacao(props.email.trim())
    aviso.value = data?.mensagem || 'Se o e-mail estiver cadastrado, você receberá um novo link.'
    iniciarContador()
  } catch (error) {
    if (error.response?.status === 429) {
      aviso.value = error.response.data?.mensagem || 'Aguarde 2 minutos antes de pedir um novo e-mail.'
      iniciarContador()
    } else {
      aviso.value = 'Não foi possível reenviar o e-mail agora. Tente novamente em instantes.'
    }
  } finally {
    enviando.value = false
  }
}

onMounted(() => {
  if (props.iniciarContando) iniciarContador()
})

onBeforeUnmount(pararContador)
</script>
