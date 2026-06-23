<template>
  <div class="flex-1 bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
    <div class="max-w-2xl w-full">
      
      <div v-if="statusCnh === 'PENDENTE'" class="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 text-center space-y-6">
        <div class="w-20 h-20 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mx-auto animate-pulse">
          <Clock :size="44" />
        </div>
        <h2 class="text-3xl font-extrabold text-gray-900">Documentação em Análise</h2>
        <p class="text-gray-600 max-w-md mx-auto">
          Nossa equipe da secretaria do campus está avaliando as fotos da sua CNH. Você receberá uma notificação assim que o perfil for liberado!
        </p>
        <router-link to="/" class="inline-block bg-gray-900 text-white font-bold px-6 py-3 rounded-xl hover:bg-gray-800 transition">
          Voltar para a Home
        </router-link>
      </div>

      <div v-else-if="statusCnh === 'APROVADO'" class="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 text-center space-y-4">
        <CheckCircle class="text-green-500 mx-auto" :size="64" />
        <h2 class="text-2xl font-bold text-gray-900">Seu perfil já está ativo!</h2>
        <router-link to="/painel-motorista" class="inline-block bg-arreda-green text-white font-bold px-6 py-3 rounded-xl">
          Ir para o Painel do Carro
        </router-link>
      </div>

      <div v-else class="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
        <div class="mb-8 text-center md:text-left">
          <span class="text-xs font-bold uppercase tracking-wider bg-orange-100 text-orange-700 px-3 py-1 rounded-full">
            Segurança Avançada
          </span>
          <h2 class="text-3xl font-extrabold text-gray-900 mt-3">Quero ser Motorista</h2>
          <p class="mt-2 text-gray-600">Envie fotos nítidas do seu documento para validação.</p>
        </div>

        <form @submit.prevent="enviarCadastroMotorista" class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="md:col-span-2">
              <label class="block text-sm font-bold text-gray-700 mb-2">Número do Registro da CNH</label>
              <input v-model="cnh" type="text" maxlength="11" placeholder="Apenas números" required class="w-full p-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-arreda-green" />
            </div>
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-2">Validade</label>
              <input v-model="validadeCnh" type="date" required class="w-full p-3 border border-gray-300 rounded-xl outline-none bg-white text-gray-700" />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="border-2 border-dashed border-gray-300 rounded-2xl p-4 text-center bg-gray-50 flex flex-col items-center justify-center min-h-[140px]">
              <ImagePlus class="text-gray-400 mb-1" :size="28" />
              <span class="text-xs font-bold text-gray-600">Foto Frente</span>
              <input type="file" accept="image/*" class="mt-2 text-xs" />
            </div>
            <div class="border-2 border-dashed border-gray-300 rounded-2xl p-4 text-center bg-gray-50 flex flex-col items-center justify-center min-h-[140px]">
              <ImagePlus class="text-gray-400 mb-1" :size="28" />
              <span class="text-xs font-bold text-gray-600">Foto Verso</span>
              <input type="file" accept="image/*" class="mt-2 text-xs" />
            </div>
          </div>

          <button type="submit" :disabled="loading" class="w-full bg-arreda-green text-white font-bold py-4 rounded-xl hover:bg-arreda-dark transition shadow-md disabled:opacity-50">
            {{ loading ? 'Enviando...' : 'Enviar Documentos para Análise' }}
          </button>
        </form>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from '../composables/useToast.js'
import { Clock, CheckCircle, ImagePlus } from 'lucide-vue-next'
import { usuarioService } from '../services/usuarioService.js'

const { dispararToast } = useToast()
const router = useRouter()

const statusCnh = ref(localStorage.getItem('@arreda:statusCnh'))
const cnh = ref('')
const validadeCnh = ref('')
const loading = ref(false)

const enviarCadastroMotorista = async () => {
  loading.value = true
  try {
    await usuarioService.criarPerfilMotorista({
      cnh: cnh.value,
      validadeCnh: validadeCnh.value
    })
    
    localStorage.setItem('@arreda:statusCnh', 'PENDENTE')
    statusCnh.value = 'PENDENTE'
    
    dispararToast('Perfil de motorista criado com sucesso!', 'success')
  } catch (error) {
    dispararToast(error.response?.data || error.response?.data?.erro || 'Erro ao criar perfil de motorista', 'error')
  } finally {
    loading.value = false
  }
}
</script>