<template>
  <div class="flex-1 bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-2xl mx-auto">
      
      <div class="mb-8 text-center md:text-left">
        <h2 class="text-3xl font-extrabold text-gray-900">Adicionar Veículo</h2>
        <p class="mt-2 text-gray-600">Cadastre o carro que você usará para oferecer caronas até o IFMG.</p>
      </div>

      <Modal v-model:is-open="isModalOpen"  @close="handleModalClose">
        <template #header>
          <h3 class="text-lg font-medium text-gray-900 mb-4">Cadastro de Veículo</h3>
        </template>
        <template #body>
          <p class="text-sm text-gray-500 mb-4">{{ ModalMessage }}</p>
        </template>
        <template #footer>
          <button 
            class="w-full flex justify-center items-center gap-2 py-4 px-4  border border-transparent rounded-xl shadow-sm text-lg font-bold text-white bg-arreda-green hover:bg-arreda-dark focus:outline-none transition disabled:opacity-50"
            @click="isModalOpen = false"
          >
            Fechar
          </button>
        </template>
      </Modal>

      <div class="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
        <form @submit.prevent="salvarVeiculo" class="space-y-6">
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-2">Placa do Veículo</label>
              <div class="flex items-center p-3 border border-gray-300 rounded-xl focus-within:ring-2 focus-within:ring-arreda-green transition bg-gray-50">
                <Hash class="text-gray-400 mr-3" :size="24" />
                <input 
                  v-model="veiculo.placa" 
                  type="text" 
                  placeholder="ABC-1234" 
                  required
                  class="w-full bg-transparent outline-none uppercase font-mono" 
                />
              </div>
            </div>

            <div>
              <label class="block text-sm font-bold text-gray-700 mb-2">Marca</label>
              <div class="flex items-center p-3 border border-gray-300 rounded-xl focus-within:ring-2 focus-within:ring-arreda-green transition">
                <Tag class="text-gray-400 mr-3" :size="24" />
                <input 
                  v-model="veiculo.marca" 
                  type="text" 
                  placeholder="Ex: Chevrolet" 
                  required
                  class="w-full bg-transparent outline-none" 
                />
              </div>
            </div>

            <div>
              <label class="block text-sm font-bold text-gray-700 mb-2">Modelo</label>
              <div class="flex items-center p-3 border border-gray-300 rounded-xl focus-within:ring-2 focus-within:ring-arreda-green transition">
                <Car class="text-gray-400 mr-3" :size="24" />
                <input 
                  v-model="veiculo.modelo" 
                  type="text" 
                  placeholder="Ex: Onix" 
                  required
                  class="w-full bg-transparent outline-none" 
                />
              </div>
            </div>

            <div>
              <label class="block text-sm font-bold text-gray-700 mb-2">Cor</label>
              <div class="flex items-center p-3 border border-gray-300 rounded-xl focus-within:ring-2 focus-within:ring-arreda-green transition">
                <Palette class="text-gray-400 mr-3" :size="24" />
                <input 
                  v-model="veiculo.cor" 
                  type="text" 
                  placeholder="Ex: Prata" 
                  required
                  class="w-full bg-transparent outline-none" 
                />
              </div>
            </div>


            <div>
              <label class="block text-sm font-bold text-gray-700 mb-2">Capacidade de Passageiros</label>
              <div class="flex items-center p-3 border border-gray-300 rounded-xl focus-within:ring-2 focus-within:ring-arreda-green transition">
                <Tag class="text-gray-400 mr-3" :size="24" />
                <input 
                  v-model="veiculo.capacidadePassageiros" 
                  type="number" 
                  placeholder="Ex: 4" 
                  required
                  min="1"
                  class="w-full bg-transparent outline-none" 
                />
              </div>
            </div>
          </div>

          <div class="pt-6 border-t border-gray-100 mt-6">
            <button 
              type="submit" 
              :disabled="loading"
              class="w-full flex justify-center items-center gap-2 py-4 px-4 border border-transparent rounded-xl shadow-sm text-lg font-bold text-white bg-arreda-green hover:bg-arreda-dark focus:outline-none transition disabled:opacity-50"
            >
              <Save :size="24" />
              {{ loading ? 'Salvando...' : 'Salvar Veículo' }}
            </button>
          </div>

        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Car, Hash, Palette, Tag, Save } from 'lucide-vue-next'
import { usuarioService } from '../services/usuarioService.js'
import { useToast } from '../composables/useToast.js'
import Modal from './Modal.vue'

const { dispararToast } = useToast()
const router = useRouter()
const loading = ref(false)
const isModalOpen = ref(false)
const ModalMessage = ref('')
const errorMessage = ref('')
const handleModalClose = () => {
  isModalOpen.value = false
}

const veiculo = ref({
  placa: '',
  marca: '',
  modelo: '',
  cor: '',
  capacidadePassageiros: ''
})

const salvarVeiculo = async () => {
  loading.value = true
  try
 {
    await usuarioService.cadastrarVeiculo(veiculo.value)
    console.log('Veículo a ser cadastrado:', veiculo.value)
    ModalMessage.value = 'Veículo cadastrado com sucesso!'
    isModalOpen.value = true
    dispararToast('Veículo salvo com sucesso!', 'success')
    router.push('/painel-motorista')
  } catch (error) {
    console.log('Erro ao salvar veículo:', veiculo.value)
    console.error(error)
    dispararToast(error.response?.data?.erro || error.response?.data || 'Falha ao salvar veículo.', 'error')
    const dadosErro = error.response?.data
    errorMessage.value = Array.isArray(dadosErro) && dadosErro.length > 0
    ? dadosErro[0].mensagem
    : (dadosErro?.erro || 'Falha ao salvar veículo.')
    ModalMessage.value = 'Erro: ' + errorMessage.value
    isModalOpen.value = true
  } finally {
    loading.value = false
  }
}
</script>