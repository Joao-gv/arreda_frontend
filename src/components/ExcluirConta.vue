<template>
  <section
    class="rounded-3xl border-2 border-red-200 bg-red-50 p-6 shadow-sm sm:p-8"
    aria-labelledby="zona-perigo-titulo"
  >
    <h2 id="zona-perigo-titulo" class="flex items-center gap-2 text-lg font-bold text-red-700">
      <AlertTriangle :size="20" aria-hidden="true" />
      Zona de perigo
    </h2>
    <p class="mt-2 text-sm text-gray-700">
      Excluir sua conta remove seus dados pessoais do Arreda. Essa ação não pode ser desfeita.
    </p>
    <button
      type="button"
      @click="abrir"
      class="mt-4 w-full rounded-xl border border-red-300 bg-white px-4 py-3 font-bold text-red-600 transition hover:bg-red-600 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 sm:w-auto"
    >
      Excluir minha conta
    </button>

    <!-- Teleport: o modal é desenhado direto no <body>, por cima de toda a página -->
    <Teleport to="body">
      <div
        v-if="aberto"
        class="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-4 sm:items-center"
        @click.self="fechar"
        @keydown.esc="fechar"
      >
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-exclusao-titulo"
          class="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-3xl bg-white p-6 shadow-xl"
        >
          <h2 id="modal-exclusao-titulo" class="text-xl font-bold text-gray-800">Excluir sua conta?</h2>

          <ul class="mt-4 list-disc space-y-2 pl-5 text-sm text-gray-700">
            <li>Seu nome, e-mail, telefone, foto e CNH serão apagados do sistema.</li>
            <li>As caronas que você já fez continuam no histórico dos outros participantes como "Usuário removido".</li>
            <li>Seus pedidos de carona ainda pendentes serão cancelados.</li>
            <li><b>Não é possível desfazer.</b> Para voltar a usar o Arreda, será preciso criar uma nova conta.</li>
          </ul>

          <form class="mt-6 space-y-4" @submit.prevent="confirmar">
            <div>
              <label for="senha-exclusao" class="mb-1 block text-sm font-bold text-gray-700">
                Digite sua senha para confirmar
              </label>
              <input
                id="senha-exclusao"
                ref="campoSenha"
                v-model="senha"
                type="password"
                autocomplete="current-password"
                required
                class="w-full rounded-xl border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <label class="flex items-start gap-2 text-sm text-gray-700">
              <input v-model="ciente" type="checkbox" class="mt-1" />
              Entendo que esta ação é permanente.
            </label>

            <p v-if="erro" class="text-sm font-bold text-red-600" role="alert">{{ erro }}</p>

            <div class="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                :disabled="enviando"
                @click="fechar"
                class="rounded-xl border border-gray-300 px-4 py-3 font-bold text-gray-700 hover:bg-gray-50 disabled:opacity-50"
              >
                Cancelar
              </button>
              <button
                type="submit"
                :disabled="!podeConfirmar"
                class="rounded-xl bg-red-600 px-4 py-3 font-bold text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {{ enviando ? 'Excluindo...' : 'Excluir definitivamente' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Teleport>
  </section>
</template>

<script setup>
import { computed, nextTick, ref } from 'vue'
import { useRouter } from 'vue-router'
import { AlertTriangle } from 'lucide-vue-next'
import { usuarioService } from '../services/usuarioService.js'
import { useAuth } from '../composables/useAuth.js'
import { useToast } from '../composables/useToast.js'

const router = useRouter()
const { clearAuth } = useAuth()
const { dispararToast } = useToast()

const aberto = ref(false)
const senha = ref('')
const ciente = ref(false)
const enviando = ref(false)
const erro = ref('')
const campoSenha = ref(null)

// O botão final só libera com a senha digitada E a caixa de ciência marcada.
const podeConfirmar = computed(() => senha.value.length > 0 && ciente.value && !enviando.value)

const abrir = async () => {
  senha.value = ''
  ciente.value = false
  erro.value = ''
  aberto.value = true
  await nextTick() // espera o modal aparecer na tela...
  campoSenha.value?.focus() // ...para então colocar o cursor no campo de senha
}

const fechar = () => {
  if (!enviando.value) aberto.value = false // não fecha no meio do envio
}

const confirmar = async () => {
  if (!podeConfirmar.value) return
  enviando.value = true
  erro.value = ''
  try {
    await usuarioService.excluirConta(senha.value)
    clearAuth() // apaga os tokens e o estado de login deste navegador
    aberto.value = false
    dispararToast('Sua conta foi excluída.', 'success')
    router.replace('/') // replace: o botão "voltar" não retorna a uma tela de conta logada
  } catch (error) {
    // 400 com { erro }: senha incorreta ou carona em andamento.
    // Lista de erros: falha de validação (ex.: senha vazia).
    const dados = error.response?.data
    if (Array.isArray(dados) && dados.length > 0) {
      erro.value = dados[0].mensagem || 'Verifique os dados informados.'
    } else {
      erro.value = dados?.erro || 'Não foi possível excluir a conta agora. Tente novamente.'
    }
  } finally {
    enviando.value = false
  }
}
</script>
