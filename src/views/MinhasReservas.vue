<template>
  <div class="flex-1 bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto">
      
      <div class="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 class="text-3xl font-extrabold text-gray-900">Minhas Reservas</h2>
          <p class="mt-2 text-gray-600">Gerencie suas viagens pelo IFMG.</p>
        </div>
        
        <div class="flex bg-gray-200 p-1 rounded-xl w-full md:w-auto">
          <button 
            @click="abaAtiva = 'passageiro'"
            :class="['flex-1 md:flex-none px-6 py-2 rounded-lg font-bold transition text-sm', abaAtiva === 'passageiro' ? 'bg-white text-arreda-green shadow-sm' : 'text-gray-500 hover:text-gray-700']"
          >
            Sou Passageiro
          </button>
          <button 
            @click="abaAtiva = 'motorista'"
            :class="['flex-1 md:flex-none px-6 py-2 rounded-lg font-bold transition text-sm', abaAtiva === 'motorista' ? 'bg-white text-arreda-green shadow-sm' : 'text-gray-500 hover:text-gray-700']"
          >
            Sou Motorista
          </button>
        </div>
      </div>

      <div v-if="abaAtiva === 'passageiro'" class="space-y-4">
        <div v-for="reserva in reservasComoPassageiro" :key="reserva.id" class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <div class="flex items-center gap-2 mb-2">
              <span :class="obterCorStatus(reserva.status)" class="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                {{ reserva.status }}
              </span>
              <span class="text-gray-500 text-sm flex items-center gap-1"><CalendarClock :size="14"/> {{ reserva.dataSolicitacao }}</span>
            </div>
            <h3 class="text-lg font-bold text-gray-800 flex items-center gap-2">
              <Car :size="20" class="text-gray-400"/> Carona com {{ reserva.motorista }}
            </h3>
            <p class="text-gray-600 mt-1 flex items-center gap-2">
              {{ reserva.origem }} <ArrowRight :size="16" class="text-gray-400"/> {{ reserva.destino }}
            </p>
          </div>
          
          <div v-if="reserva.status === 'Pendente'" class="w-full md:w-auto">
            <button @click="cancelarReserva(reserva.id)" class="w-full md:w-auto px-4 py-2 border-2 border-red-100 text-red-500 font-bold rounded-xl hover:bg-red-50 transition">
              Cancelar Pedido
            </button>
          </div>
        </div>
      </div>

      <div v-if="abaAtiva === 'motorista'" class="space-y-4">
        <div v-for="solicitacao in solicitacoesRecebidas" :key="solicitacao.id" class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <div class="flex items-center gap-4">
            <UserCircle :size="48" class="text-gray-300"/>
            <div>
              <h3 class="text-lg font-bold text-gray-800">{{ solicitacao.passageiro }} quer uma carona!</h3>
              <p class="text-gray-600 mt-1 flex items-center gap-2">
                Para a viagem: {{ solicitacao.origem }} <ArrowRight :size="16" class="text-gray-400"/> {{ solicitacao.destino }}
              </p>
            </div>
          </div>
          
          <div class="flex gap-2 w-full md:w-auto">
            <button @click="responderSolicitacao(solicitacao.id, 'Recusada')" class="flex-1 md:flex-none px-4 py-2 bg-red-50 text-red-600 font-bold rounded-xl hover:bg-red-100 transition flex items-center justify-center gap-1">
              <XCircle :size="18"/> Recusar
            </button>
            <button @click="responderSolicitacao(solicitacao.id, 'Confirmada')" class="flex-1 md:flex-none px-4 py-2 bg-arreda-green text-white font-bold rounded-xl hover:bg-arreda-dark transition flex items-center justify-center gap-1">
              <CheckCircle :size="18"/> Aceitar
            </button>
          </div>
        </div>
        
        <div v-if="solicitacoesRecebidas.length === 0" class="text-center py-12 bg-white rounded-3xl border border-gray-100 border-dashed">
          <Inbox :size="48" class="mx-auto text-gray-300 mb-4"/>
          <h3 class="text-lg font-bold text-gray-700">Nenhum pedido novo</h3>
          <p class="text-gray-500">Quando alguém quiser viajar com você, aparecerá aqui.</p>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useToast } from '../composables/useToast.js'
import { Car, ArrowRight, CalendarClock, CheckCircle, XCircle, UserCircle, Inbox } from 'lucide-vue-next'

const { dispararToast } = useToast()
const abaAtiva = ref('passageiro')

// Listas de reservas e solicitações recuperadas
const reservasComoPassageiro = ref([
  { id: 101, motorista: 'João Silva', origem: 'Centro', destino: 'IFMG', status: 'Confirmada', dataSolicitacao: 'Hoje, 07:00' },
  { id: 102, motorista: 'Ana Souza', origem: 'IFMG', destino: 'Terminal', status: 'Pendente', dataSolicitacao: 'Ontem, 18:30' },
  { id: 103, motorista: 'Lucas Mendes', origem: 'Bairro Palmeiras', destino: 'IFMG', status: 'Recusada', dataSolicitacao: '12/05/2026' }
])

const solicitacoesRecebidas = ref([
  { id: 201, passageiro: 'Mariana Costa', origem: 'Centro', destino: 'IFMG' },
  { id: 202, passageiro: 'Pedro Alves', origem: 'Centro', destino: 'IFMG' }
])

const obterCorStatus = (status) => {
  if (status === 'Confirmada') return 'bg-green-100 text-green-700'
  if (status === 'Pendente') return 'bg-yellow-100 text-yellow-700'
  return 'bg-red-100 text-red-700'
}

const cancelarReserva = (id) => {
  // Alerta amarelo/warning para aviso de cancelamento
  dispararToast(`Reserva ${id} cancelada com sucesso.`, 'warning')
}

const responderSolicitacao = (id, resposta) => {
  if (resposta === 'Confirmada') {
    dispararToast(`Solicitação #${id} aprovada com sucesso!`, 'success')
  } else {
    dispararToast(`Solicitação #${id} recusada.`, 'error')
  }
  
  // Remove o item da lista após responder para dar efeito visual de resposta
  solicitacoesRecebidas.value = solicitacoesRecebidas.value.filter(req => req.id !== id)
}
</script>