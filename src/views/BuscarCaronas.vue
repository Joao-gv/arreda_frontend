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
          
          <button type="submit" class="bg-arreda-green text-white font-bold rounded-xl py-3 px-4 hover:bg-arreda-dark transition flex items-center justify-center gap-2 shadow-sm">
            <Search :size="20"/>
            Buscar
          </button>
        </form>
      </div>

      <div class="space-y-4">
        <div 
          v-for="carona in caronasDisponiveis" 
          :key="carona.id" 
          class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 hover:shadow-md transition"
        >
          <div class="flex-1 w-full">
            <div class="flex items-center justify-between md:justify-start gap-4 mb-3">
              <div class="flex items-center gap-2">
                <UserCircle class="text-gray-400" :size="28"/>
                <span class="font-bold text-gray-800 text-lg">{{ carona.motorista }}</span>
              </div>
              <span class="text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full flex items-center gap-1">
                <Star class="text-yellow-500 fill-current" :size="14"/> {{ carona.nota }}
              </span>
            </div>
            
            <div class="flex items-center gap-3 text-gray-700 mb-3 font-medium">
              <span class="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-lg border border-gray-100"><MapPin :size="16" class="text-gray-400"/> {{ carona.origem }}</span>
              <ArrowRight :size="16" class="text-gray-400"/> 
              <span class="flex items-center gap-1 bg-arreda-light px-2 py-1 rounded-lg text-arreda-dark"><MapPin :size="16"/> {{ carona.destino }}</span>
            </div>
            
            <div class="flex flex-wrap items-center gap-4 text-sm text-gray-500">
              <span class="flex items-center gap-1"><Clock :size="16"/> {{ carona.horario }}</span>
              <span class="flex items-center gap-1"><Car :size="16"/> {{ carona.veiculo }}</span>
              <span class="flex items-center gap-1 text-arreda-green font-bold bg-green-50 px-2 py-0.5 rounded"><Users :size="16"/> {{ carona.vagas }} vagas</span>
            </div>
          </div>
          
          <div class="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6 gap-3">
            <span class="text-3xl font-extrabold text-gray-800">R$ {{ carona.valor.toFixed(2) }}</span>
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
import { ref } from 'vue'
import { useToast } from '../composables/useToast.js'
import { MapPin, Calendar, Search, UserCircle, Star, ArrowRight, Clock, Car, Users } from 'lucide-vue-next'

const { dispararToast } = useToast()
const busca = ref({ origem: '', destino: '', data: '' })

// Lista de caronas fictícias recuperada
const caronasDisponiveis = ref([
  { id: 1, motorista: 'João Silva', nota: 4.8, origem: 'Centro', destino: 'IFMG', horario: '07:30', veiculo: 'Chevrolet Onix (Prata)', vagas: 3, valor: 5.00 },
  { id: 2, motorista: 'Ana Souza', nota: 5.0, origem: 'Bairro Palmeiras', destino: 'IFMG', horario: '08:00', veiculo: 'Fiat Uno (Vermelho)', vagas: 1, valor: 4.50 },
  { id: 3, motorista: 'Carlos Eduardo', nota: 4.9, origem: 'IFMG', destino: 'Centro', horario: '18:10', veiculo: 'VW Polo (Branco)', vagas: 4, valor: 5.00 }
])

const realizarBusca = () => {
  console.log('Buscando caronas com os filtros:', busca.value)
}

const solicitarReserva = (id) => {
  // Toast de sucesso ao reservar
  dispararToast(`Reserva solicitada para a carona #${id}! O motorista será notificado para aprovação.`, 'success')
}
</script>
