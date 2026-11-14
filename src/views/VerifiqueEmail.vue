<template>
  <div class="flex-1 flex items-center justify-center bg-gray-50 px-4 py-10">
    <div class="bg-white p-6 sm:p-8 rounded-3xl shadow-xl border border-gray-100 max-w-md w-full text-center">
      <div class="mx-auto mb-4 w-16 h-16 rounded-full bg-arreda-light flex items-center justify-center">
        <MailCheck class="text-arreda-green" :size="32" aria-hidden="true" />
      </div>

      <h2 class="text-2xl font-bold text-gray-800 mb-2">Confirme seu e-mail</h2>

      <p v-if="emailInformado" class="text-gray-600 mb-6">
        Enviamos um link para
        <span class="font-bold text-gray-800 break-all">{{ emailInformado }}</span>.
        Confira sua caixa de entrada e o spam.
      </p>
      <p v-else class="text-gray-600 mb-6">
        Informe o e-mail cadastrado para receber um novo link de confirmação.
      </p>

      <div v-if="!emailInformado" class="text-left mb-4">
        <label for="email-reenvio" class="block text-sm font-bold text-gray-700 mb-1">E-mail Acadêmico</label>
        <input
          id="email-reenvio"
          v-model="emailDigitado"
          type="email"
          autocomplete="email"
          placeholder="nome@academico.ifmg.edu.br"
          class="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-arreda-green"
        />
      </div>

      <BotaoReenviarConfirmacao :email="emailParaReenvio" :iniciar-contando="!!emailInformado" />

      <p class="mt-6 text-sm text-gray-600">
        Já confirmou?
        <router-link to="/login" class="text-arreda-green font-bold hover:underline">Ir para o login</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { MailCheck } from 'lucide-vue-next'
import BotaoReenviarConfirmacao from '../components/BotaoReenviarConfirmacao.vue'

// O e-mail chega pelo state do histórico (não fica exposto na URL) e sobrevive a um recarregamento da página.
const emailInformado = ref(typeof window.history.state?.email === 'string' ? window.history.state.email : '')
const emailDigitado = ref('')

const emailParaReenvio = computed(() => emailInformado.value || emailDigitado.value)
</script>
