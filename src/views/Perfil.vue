<template>
  <section class="flex-1 bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-3xl">
      <header class="mb-8">
        <h2 class="text-3xl font-extrabold text-gray-900">Meu Perfil</h2>
        <p class="mt-2 text-gray-600">Mantenha seus dados e sua foto atualizados.</p>
      </header>

      <div v-if="carregandoPerfil" class="rounded-3xl border border-gray-100 bg-white p-8 text-center font-bold text-gray-500 shadow-sm" role="status">
        Carregando perfil...
      </div>

      <div v-else-if="erroCarregamento" class="rounded-3xl border border-red-100 bg-white p-8 text-center text-red-700 shadow-sm" role="alert">
        {{ erroCarregamento }}
        <button type="button" class="ml-2 font-bold underline" @click="carregarPerfil">Tentar novamente</button>
      </div>

      <div v-else class="space-y-6">
        <section class="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8" aria-labelledby="foto-titulo">
          <div class="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
            <AvatarUsuario :nome="perfil.nome" :foto-url="fotoExibida" :size="112" />

            <div class="w-full flex-1 text-center sm:text-left">
              <h3 id="foto-titulo" class="text-xl font-bold text-gray-900">Foto de perfil</h3>
              <p class="mt-1 text-sm text-gray-600">JPEG ou PNG, até 2 MB.</p>

              <div class="mt-5 flex flex-wrap justify-center gap-3 sm:justify-start">
                <label class="inline-flex cursor-pointer items-center rounded-xl bg-arreda-green px-4 py-2.5 font-bold text-white transition hover:bg-arreda-dark focus-within:ring-2 focus-within:ring-arreda-green focus-within:ring-offset-2" :class="{ 'pointer-events-none opacity-50': enviandoFoto || removendoFoto }">
                  <ImagePlus :size="18" class="mr-2" aria-hidden="true" />
                  Escolher foto
                  <input
                    ref="inputFoto"
                    type="file"
                    accept="image/jpeg,image/png"
                    class="sr-only"
                    :disabled="enviandoFoto || removendoFoto"
                    aria-label="Escolher foto de perfil"
                    @change="selecionarFoto"
                  />
                </label>

                <button
                  v-if="arquivoSelecionado"
                  type="button"
                  class="rounded-xl border border-gray-300 px-4 py-2.5 font-bold text-gray-700 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-arreda-green disabled:opacity-50"
                  :disabled="enviandoFoto || removendoFoto"
                  @click="descartarSelecao"
                >
                  Descartar seleção
                </button>

                <button
                  v-if="perfil.fotoUrl"
                  type="button"
                  class="rounded-xl border border-red-200 px-4 py-2.5 font-bold text-red-600 transition hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-400 disabled:opacity-50"
                  :disabled="enviandoFoto || removendoFoto"
                  @click="removerFoto"
                >
                  {{ removendoFoto ? 'Removendo...' : 'Remover foto' }}
                </button>
              </div>

              <div v-if="arquivoSelecionado" class="mt-4 flex flex-wrap items-center gap-3">
                <span class="max-w-full truncate text-sm text-gray-600">{{ arquivoSelecionado.name }}</span>
                <button
                  type="button"
                  class="rounded-xl bg-gray-900 px-4 py-2 font-bold text-white transition hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50"
                  :disabled="enviandoFoto"
                  @click="enviarFoto"
                >
                  {{ enviandoFoto ? 'Enviando...' : 'Enviar foto' }}
                </button>
              </div>

              <div v-if="enviandoFoto" class="mt-4" role="status" aria-live="polite">
                <div class="mb-1 flex items-center justify-between text-sm font-medium text-gray-600">
                  <span>{{ progressoUpload === null ? 'Enviando foto...' : 'Enviando foto' }}</span>
                  <span v-if="progressoUpload !== null">{{ progressoUpload }}%</span>
                </div>
                <div
                  class="h-2 overflow-hidden rounded-full bg-gray-100"
                  role="progressbar"
                  aria-label="Progresso do envio da foto"
                  :aria-valuenow="progressoUpload ?? undefined"
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  <div class="h-full rounded-full bg-arreda-green transition-all" :class="progressoUpload === null ? 'w-1/3 animate-pulse' : ''" :style="progressoUpload === null ? undefined : { width: `${progressoUpload}%` }"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8" aria-labelledby="dados-titulo">
          <h3 id="dados-titulo" class="text-xl font-bold text-gray-900">Seus dados</h3>
          <form class="mt-6 space-y-5" @submit.prevent="salvarPerfil" novalidate>
            <div>
              <label for="perfil-nome" class="mb-1 block text-sm font-bold text-gray-700">Nome completo</label>
              <input id="perfil-nome" v-model="perfil.nome" type="text" autocomplete="name" maxlength="100" required :aria-invalid="Boolean(erros.nome)" :aria-describedby="erros.nome ? 'perfil-nome-erro' : undefined" class="w-full rounded-xl border border-gray-300 bg-white p-3 outline-none transition focus:border-arreda-green focus:ring-2 focus:ring-arreda-green" @input="erros.nome = ''" />
              <p v-if="erros.nome" id="perfil-nome-erro" class="mt-1 text-sm text-red-600" role="alert">{{ erros.nome }}</p>
            </div>

            <div>
              <label for="perfil-email" class="mb-1 block text-sm font-bold text-gray-700">E-mail</label>
              <input id="perfil-email" :value="perfil.email" type="email" autocomplete="email" disabled class="w-full cursor-not-allowed rounded-xl border border-gray-200 bg-gray-50 p-3 text-gray-500" />
              <p class="mt-1 text-xs text-gray-500">O e-mail não pode ser alterado por esta tela.</p>
            </div>

            <div>
              <label for="perfil-telefone" class="mb-1 block text-sm font-bold text-gray-700">Telefone</label>
              <input id="perfil-telefone" v-model="perfil.telefone" type="tel" inputmode="numeric" autocomplete="tel" maxlength="15" required :aria-invalid="Boolean(erros.telefone)" :aria-describedby="erros.telefone ? 'perfil-telefone-erro' : undefined" class="w-full rounded-xl border border-gray-300 bg-white p-3 outline-none transition focus:border-arreda-green focus:ring-2 focus:ring-arreda-green" @input="erros.telefone = ''" />
              <p v-if="erros.telefone" id="perfil-telefone-erro" class="mt-1 text-sm text-red-600" role="alert">{{ erros.telefone }}</p>
            </div>

            <div class="pt-2">
              <button type="submit" :disabled="salvandoPerfil" class="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-arreda-green px-5 py-3 font-bold text-white shadow-sm transition hover:bg-arreda-dark focus:outline-none focus:ring-2 focus:ring-arreda-green focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto">
                <Save :size="18" aria-hidden="true" />
                {{ salvandoPerfil ? 'Salvando...' : 'Salvar alterações' }}
              </button>
            </div>
          </form>
        </section>

        <ExcluirConta />
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import { ImagePlus, Save } from 'lucide-vue-next'
import AvatarUsuario from '../components/AvatarUsuario.vue'
import ExcluirConta from '../components/ExcluirConta.vue'
import { useAuth } from '../composables/useAuth.js'
import { useToast } from '../composables/useToast.js'
import { usuarioService } from '../services/usuarioService.js'

const TAMANHO_MAXIMO_BYTES = 2 * 1024 * 1024
const tiposPermitidos = ['image/jpeg', 'image/png']

const { setUser } = useAuth()
const { dispararToast } = useToast()
const inputFoto = ref(null)
const carregandoPerfil = ref(true)
const erroCarregamento = ref('')
const salvandoPerfil = ref(false)
const enviandoFoto = ref(false)
const removendoFoto = ref(false)
const arquivoSelecionado = ref(null)
const previewUrl = ref('')
const progressoUpload = ref(null)
const erros = reactive({ nome: '', telefone: '' })
const perfil = reactive({ id: null, nome: '', email: '', telefone: '', ehMotorista: false, fotoUrl: null })

const fotoExibida = computed(() => previewUrl.value || perfil.fotoUrl)

const atualizarPerfilLocal = (dados) => {
  Object.assign(perfil, dados)
  setUser(dados)
}

const carregarPerfil = async () => {
  carregandoPerfil.value = true
  erroCarregamento.value = ''
  try {
    atualizarPerfilLocal(await usuarioService.getMe())
  } catch (error) {
    erroCarregamento.value = mensagemErro(error, 'Não foi possível carregar seu perfil.')
  } finally {
    carregandoPerfil.value = false
  }
}

const selecionarFoto = (event) => {
  const arquivo = event.target.files?.[0]
  event.target.value = ''
  if (!arquivo) return

  if (!tiposPermitidos.includes(arquivo.type)) {
    dispararToast('Selecione uma imagem JPEG ou PNG.', 'error')
    return
  }
  if (arquivo.size > TAMANHO_MAXIMO_BYTES) {
    dispararToast('A foto deve ter no máximo 2 MB.', 'error')
    return
  }

  liberarPreview()
  arquivoSelecionado.value = arquivo
  previewUrl.value = URL.createObjectURL(arquivo)
}

const liberarPreview = () => {
  if (previewUrl.value) URL.revokeObjectURL(previewUrl.value)
  previewUrl.value = ''
}

const descartarSelecao = () => {
  arquivoSelecionado.value = null
  liberarPreview()
}

const enviarFoto = async () => {
  if (!arquivoSelecionado.value || enviandoFoto.value) return
  enviandoFoto.value = true
  progressoUpload.value = null
  try {
    const resultado = await usuarioService.enviarFotoPerfil(arquivoSelecionado.value, (event) => {
      if (event.total) progressoUpload.value = Math.round((event.loaded / event.total) * 100)
    })
    const fotoUrl = resultado.fotoUrl
    atualizarPerfilLocal({ ...perfil, fotoUrl })
    arquivoSelecionado.value = null
    liberarPreview()
    dispararToast('Foto de perfil atualizada com sucesso!', 'success')
  } catch (error) {
    dispararToast(mensagemErro(error, 'Não foi possível enviar sua foto.'), 'error')
  } finally {
    enviandoFoto.value = false
    progressoUpload.value = null
  }
}

const removerFoto = async () => {
  if (removendoFoto.value) return
  removendoFoto.value = true
  try {
    await usuarioService.removerFotoPerfil()
    atualizarPerfilLocal({ ...perfil, fotoUrl: null })
    descartarSelecao()
    dispararToast('Foto de perfil removida.', 'success')
  } catch (error) {
    dispararToast(mensagemErro(error, 'Não foi possível remover sua foto.'), 'error')
  } finally {
    removendoFoto.value = false
  }
}

const validarPerfil = () => {
  erros.nome = ''
  erros.telefone = ''
  if (perfil.nome.trim().length < 2 || perfil.nome.trim().length > 100) {
    erros.nome = 'O nome deve conter entre 2 e 100 caracteres.'
  }
  if (!/^\d{10,15}$/.test(perfil.telefone)) {
    erros.telefone = 'Informe de 10 a 15 dígitos, sem espaços ou símbolos.'
  }
  return !erros.nome && !erros.telefone
}

const salvarPerfil = async () => {
  if (salvandoPerfil.value || !validarPerfil()) return
  salvandoPerfil.value = true
  try {
    atualizarPerfilLocal(await usuarioService.atualizarPerfil({
      nome: perfil.nome.trim(),
      telefone: perfil.telefone
    }))
    dispararToast('Perfil atualizado com sucesso!', 'success')
  } catch (error) {
    mapearErrosServidor(error)
    dispararToast(mensagemErro(error, 'Não foi possível salvar seu perfil.'), 'error')
  } finally {
    salvandoPerfil.value = false
  }
}

const mapearErrosServidor = (error) => {
  const dados = error.response?.data
  const lista = Array.isArray(dados) ? dados : []
  for (const item of lista) {
    const campo = item.campo || item.field
    const mensagem = item.mensagem || item.defaultMessage || item.message
    if (typeof campo === 'string' && campo in erros && mensagem) erros[campo] = mensagem
  }
}

function mensagemErro(error, padrao) {
  const dados = error.response?.data
  if (typeof dados === 'string' && dados.trim()) return dados
  return dados?.erro || dados?.message || padrao
}

onMounted(carregarPerfil)
onBeforeUnmount(liberarPreview)
</script>
