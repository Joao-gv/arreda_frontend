<template>
  <div class="flex-1 bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-2xl mx-auto">
      
      <div class="mb-8 text-center md:text-left">
        <h2 class="text-3xl font-extrabold text-gray-900">Oferecer Carona</h2>
        <p class="mt-2 text-gray-600">Publique sua viagem e ajude outros estudantes do IFMG a chegarem ao campus.</p>
      </div>

      <div class="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
        <form @submit.prevent="publicarCarona" class="space-y-6">
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-2">Origem</label>
              <div class="flex items-center p-3 border border-gray-300 rounded-xl focus-within:ring-2 focus-within:ring-arreda-green transition bg-gray-50">
                <MapPin class="text-gray-400 mr-3" :size="24" />
                <input v-model="carona.origem" type="text" placeholder="Ex: Centro" required class="w-full bg-transparent outline-none" />
              </div>
            </div>

            <div>
              <label class="block text-sm font-bold text-gray-700 mb-2">Destino</label>
              <div class="flex items-center p-3 border border-gray-300 rounded-xl focus-within:ring-2 focus-within:ring-arreda-green transition">
                <MapPin class="text-arreda-green mr-3" :size="24" />
                <input v-model="carona.destino" type="text" placeholder="Ex: Campus IFMG" required class="w-full bg-transparent outline-none" />
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-2">Data e Hora de Partida</label>
              <div class="flex items-center p-3 border border-gray-300 rounded-xl focus-within:ring-2 focus-within:ring-arreda-green transition">
                <CalendarClock class="text-gray-400 mr-3" :size="24" />
                <input v-model="carona.dataHoraPartida" type="datetime-local" required class="w-full bg-transparent outline-none text-gray-700" />
              </div>
            </div>

            <div>
              <label class="block text-sm font-bold text-gray-700 mb-2">Vagas Disponíveis</label>
              <div class="flex items-center p-3 border border-gray-300 rounded-xl focus-within:ring-2 focus-within:ring-arreda-green transition">
                <Users class="text-gray-400 mr-3" :size="24" />
                <input v-model="carona.vagasDisponiveis" type="number" min="1" max="7" placeholder="Ex: 3" required class="w-full bg-transparent outline-none" />
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-2">Valor Sugerido (R$)</label>
              <div class="flex items-center p-3 border border-gray-300 rounded-xl focus-within:ring-2 focus-within:ring-arreda-green transition">
                <Banknote class="text-gray-400 mr-3" :size="24" />
                <input v-model="carona.valorSugerido" type="number" step="0.50" min="0" placeholder="Ex: 5.00" required class="w-full bg-transparent outline-none" />
              </div>
            </div>

            <div>
              <label class="block text-sm font-bold text-gray-700 mb-2">Veículo Utilizado</label>
              <div class="flex items-center p-3 border border-gray-300 rounded-xl focus-within:ring-2 focus-within:ring-arreda-green transition">
                <Car class="text-gray-400 mr-3" :size="24" />
                <select v-model="carona.veiculoId" required class="w-full bg-transparent outline-none text-gray-700 appearance-none">
                  <option value="" disabled selected>Selecione um carro...</option>
                  <option v-for="v in veiculos" :key="v.id" :value="v.id">{{ v.marca }} {{ v.modelo }} ({{ v.placa }})</option>
                </select>
              </div>
              <p v-if="veiculos.length === 0" class="text-xs text-red-500 mt-1">Nenhum veículo cadastrado.</p>
            </div>
          </div>

          <div class="pt-6 border-t border-gray-100 mt-6">
            <button type="submit" :disabled="loading || veiculos.length === 0" class="w-full flex justify-center items-center gap-2 py-4 px-4 border border-transparent rounded-xl shadow-sm text-lg font-bold text-white bg-arreda-green hover:bg-arreda-dark focus:outline-none transition disabled:opacity-50">
              <CheckCircle :size="24" />
              {{ loading ? 'Publicando...' : 'Publicar Carona' }}
            </button>
          </div>

        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from '../composables/useToast.js'
import { MapPin, CalendarClock, Users, Banknote, Car, CheckCircle } from 'lucide-vue-next'
import { caronaService } from '../services/caronaService.js'
import { usuarioService } from '../services/usuarioService.js'

const { dispararToast } = useToast()
const router = useRouter()
const carona = ref({ origem: '', destino: '', dataHoraPartida: '', vagasDisponiveis: '', valorSugerido: '', veiculoId: '' })
const veiculos = ref([])
const loading = ref(false)

const carregarVeiculos = async () => {
  try {
    veiculos.value = await usuarioService.getMeusVeiculos()
  } catch (error) {
    dispararToast('Erro ao carregar veículos. Você tem perfil de motorista?', 'error')
    console.error(error)
  }
}

const publicarCarona = async () => {
  loading.value = true
  try {
    await caronaService.publicar(carona.value)
    dispararToast('Sua carona foi publicada com sucesso!', 'success')
    router.push('/minhas-reservas')
  } catch (error) {
    dispararToast(error.response?.data?.erro || error.response?.data || 'Erro ao publicar carona', 'error')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  carregarVeiculos()
})
</script>