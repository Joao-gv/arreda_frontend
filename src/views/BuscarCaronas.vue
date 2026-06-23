<template>
  <div class="flex-1 bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-5xl mx-auto">
      
      <div class="bg-white p-6 rounded-3xl shadow-md border border-gray-100 mb-8">
        <h2 class="text-2xl font-bold text-gray-800 mb-4">Encontrar Caronas</h2>
        
        <form @submit.prevent="realizarBusca" class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div class="border border-gray-300 rounded-xl flex items-center p-3 focus-within:border-arreda-green focus-within:ring-1 focus-within:ring-arreda-green transition bg-gray-50">
            <MapPin class="text-gray-400 mr-2" :size="20"/>
            <input v-model="busca.origem" type="text" placeholder="Origem" class="w-full outline-none bg-transparent">
          </div>
          
          <div class="border border-gray-300 rounded-xl flex items-center p-3 focus-within:border-arreda-green focus-within:ring-1 focus-within:ring-arreda-green transition">
            <MapPin class="text-arreda-green mr-2" :size="20"/>
            <input v-model="busca.destino" type="text" placeholder="Destino" class="w-full outline-none bg-transparent">
          </div>
          
          <div class="border border-gray-300 rounded-xl flex items-center p-3 focus-within:border-arreda-green focus-within:ring-1 focus-within:ring-arreda-green transition">
            <Calendar class="text-gray-400 mr-2" :size="20"/>
            <input v-model="busca.data" type="date" class="w-full outline-none bg-transparent text-gray-600">
          </div>
          
          <button type="submit" :disabled="loadingBusca" class="bg-arreda-green text-white font-bold rounded-xl py-3 px-4 hover:bg-arreda-dark transition flex items-center justify-center gap-2 shadow-sm disabled:opacity-50">
            <Search :size="20"/>
            {{ loadingBusca ? 'Buscando...' : 'Buscar' }}
          </button>
        </form>
      </div>

      <div class="space-y-4">
        <div v-if="loadingBusca" class="text-center py-8 text-gray-500 font-bold">
          Carregando caronas...
        </div>
        <div v-else-if="caronasDisponiveis.length === 0" class="text-center py-8 text-gray-500 font-bold">
          Nenhuma carona encontrada para sua busca.
        </div>
        <div 
          v-for="carona in caronasDisponiveis" 
          :key="carona.id" 
          class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 hover:shadow-md transition"
        >
          <div class="flex-1 w-full">
            <div class="flex items-center justify-between md:justify-start gap-4 mb-3">
              <div class="flex items-center gap-2">
                <UserCircle class="text-gray-400" :size="28"/>
                <span class="font-bold text-gray-800 text-lg">{{ carona.nomeMotorista || 'Motorista' }}</span>
              </div>
              <span class="text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full flex items-center gap-1">
                <Star class="text-yellow-500 fill-current" :size="14"/> {{ carona.notaMotorista || '5.0' }}
              </span>
            </div>
            
            <div class="flex items-center gap-3 text-gray-700 mb-3 font-medium">
              <span class="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-lg border border-gray-100"><MapPin :size="16" class="text-gray-400"/> {{ carona.origem }}</span>
              <ArrowRight :size="16" class="text-gray-400"/> 
              <span class="flex items-center gap-1 bg-arreda-light px-2 py-1 rounded-lg text-arreda-dark"><MapPin :size="16"/> {{ carona.destino }}</span>
            </div>
            
            <div class="flex flex-wrap items-center gap-4 text-sm text-gray-500">
              <span class="flex items-center gap-1"><Clock :size="16"/> {{ formatarHorario(carona.dataHoraPartida) }}</span>
              <span class="flex items-center gap-1"><Car :size="16"/> {{ carona.modeloVeiculo || 'Carro' }}</span>
              <span class="flex items-center gap-1 text-arreda-green font-bold bg-green-50 px-2 py-0.5 rounded"><Users :size="16"/> {{ carona.vagasDisponiveis }} vagas</span>
            </div>
          </div>
          
          <div class="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6 gap-3">
            <span class="text-3xl font-extrabold text-gray-800">R$ {{ carona.valorSugerido?.toFixed(2) || '0.00' }}</span>
            <button @click="solicitarReserva(carona.id)" class="w-full md:w-auto bg-gray-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-gray-800 transition">
              Reservar
            </button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useToast } from '../composables/useToast.js'
import { MapPin, Calendar, Search, UserCircle, Star, ArrowRight, Clock, Car, Users } from 'lucide-vue-next'
import { caronaService } from '../services/caronaService.js'

const { dispararToast } = useToast()
const busca = ref({ origem: '', destino: '', data: '' })
const caronasDisponiveis = ref([])
const loadingBusca = ref(false)

const formatarHorario = (dataIso) => {
  if (!dataIso) return '--:--'
  const date = new Date(dataIso)
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

const realizarBusca = async () => {
  loadingBusca.value = true
  try {
    const data = await caronaService.buscarCaronas(busca.value.origem, busca.value.destino, busca.value.data)
    // Spring Boot Pageable returns items in 'content'
    caronasDisponiveis.value = data.content || data
  } catch (error) {
    dispararToast('Erro ao buscar caronas', 'error')
    console.error(error)
  } finally {
    loadingBusca.value = false
  }
}

const solicitarReserva = async (id) => {
  try {
    await caronaService.solicitar(id)
    dispararToast(`Reserva solicitada para a carona #${id}! O motorista será notificado.`, 'success')
  } catch (error) {
    dispararToast(error.response?.data?.erro || error.response?.data || 'Erro ao solicitar reserva', 'error')
  }
}

onMounted(() => {
  realizarBusca()
})
</script>
