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

      <div v-if="loading" class="text-center py-12 text-gray-500 font-bold">
        Carregando histórico...
      </div>

      <div v-else-if="abaAtiva === 'passageiro'" class="space-y-4">
        <div v-if="historico.comoPassageiro.length === 0" class="text-center py-12 bg-white rounded-3xl border border-gray-100 border-dashed">
          <h3 class="text-lg font-bold text-gray-700">Nenhuma viagem como passageiro</h3>
        </div>
        
        <div v-for="reserva in historico.comoPassageiro" :key="reserva.idCarona" class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <div class="flex items-center gap-2 mb-2">
              <span :class="obterCorStatus(reserva.statusParticipacao)" class="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                {{ reserva.statusParticipacao }}
              </span>
              <span class="text-gray-500 text-sm flex items-center gap-1"><CalendarClock :size="14"/> {{ formatarData(reserva.dataHoraPartida) }}</span>
            </div>
            <h3 class="text-lg font-bold text-gray-800 flex items-center gap-2">
              <Car :size="20" class="text-gray-400"/> Carona com {{ reserva.nomeMotorista }}
            </h3>
            <p class="text-gray-600 mt-1 flex items-center gap-2">
              {{ reserva.origem }} <ArrowRight :size="16" class="text-gray-400"/> {{ reserva.destino }}
            </p>
          </div>
        </div>
      </div>

      <div v-else-if="abaAtiva === 'motorista'" class="space-y-4">
        <div v-if="historico.comoMotorista.length === 0" class="text-center py-12 bg-white rounded-3xl border border-gray-100 border-dashed">
          <Inbox :size="48" class="mx-auto text-gray-300 mb-4"/>
          <h3 class="text-lg font-bold text-gray-700">Nenhuma carona oferecida</h3>
          <p class="text-gray-500">Você ainda não ofereceu nenhuma carona no sistema.</p>
        </div>

        <div v-for="carona in historico.comoMotorista" :key="carona.idCarona" class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div class="p-6 flex flex-col md:flex-row justify-between items-center gap-4 border-b border-gray-50">
            <div class="flex items-center gap-4">
              <div>
                <div class="flex items-center gap-2 mb-2">
                  <span class="bg-arreda-light text-arreda-dark px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    Sua Viagem
                  </span>
                  <span class="text-gray-500 text-sm flex items-center gap-1"><CalendarClock :size="14"/> {{ formatarData(carona.dataHoraPartida) }}</span>
                </div>
                <h3 class="text-lg font-bold text-gray-800">Você ofereceu carona</h3>
                <p class="text-gray-600 mt-1 flex items-center gap-2">
                  {{ carona.origem }} <ArrowRight :size="16" class="text-gray-400"/> {{ carona.destino }}
                </p>
              </div>
            </div>
            <button 
              @click="toggleParticipacoes(carona.idCarona)" 
              class="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition text-sm flex items-center gap-2"
            >
              <Users :size="16" /> {{ participacoesVisiveis[carona.idCarona] ? 'Ocultar Pedidos' : 'Ver Pedidos' }}
            </button>
          </div>

          <!-- Seção de Participações -->
          <div v-if="participacoesVisiveis[carona.idCarona]" class="bg-gray-50 p-6">
            <h4 class="text-sm font-bold text-gray-500 mb-4 uppercase tracking-wider">Passageiros Solicitantes</h4>
            
            <div v-if="carregandoParticipacoes[carona.idCarona]" class="text-gray-500 text-sm font-bold">Carregando pedidos...</div>
            <div v-else-if="!participacoesData[carona.idCarona] || participacoesData[carona.idCarona].length === 0" class="text-gray-500 text-sm italic">
              Nenhuma solicitação para esta carona ainda.
            </div>
            
            <ul v-else class="space-y-3">
              <li v-for="participacao in participacoesData[carona.idCarona]" :key="participacao.idParticipacao" class="bg-white p-4 rounded-xl border border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div class="flex items-center gap-3">
                  <UserCircle :size="32" class="text-gray-400" />
                  <div>
                    <span class="block font-bold text-gray-800">{{ participacao.nomePassageiro }}</span>
                    <span :class="obterCorStatus(participacao.status)" class="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider mt-1 inline-block">
                      {{ participacao.status }}
                    </span>
                  </div>
                </div>
                
                <div class="flex items-center gap-2" v-if="participacao.status === 'PENDENTE'">
                  <button @click="responderParticipacao(carona.idCarona, participacao.idParticipacao, 'aceitar')" class="px-3 py-1.5 bg-arreda-green text-white font-bold rounded-lg text-xs hover:bg-arreda-dark transition flex items-center gap-1">
                    <CheckCircle :size="14" /> Aceitar
                  </button>
                  <button @click="responderParticipacao(carona.idCarona, participacao.idParticipacao, 'rejeitar')" class="px-3 py-1.5 bg-red-100 text-red-600 font-bold rounded-lg text-xs hover:bg-red-200 transition flex items-center gap-1">
                    <XCircle :size="14" /> Recusar
                  </button>
                </div>
              </li>
            </ul>
          </div>

        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue'
import { useToast } from '../composables/useToast.js'
import { Car, ArrowRight, CalendarClock, CheckCircle, XCircle, UserCircle, Inbox, Users } from 'lucide-vue-next'
import { usuarioService } from '../services/usuarioService.js'
import { caronaService } from '../services/caronaService.js'

const { dispararToast } = useToast()
const abaAtiva = ref('passageiro')
const loading = ref(false)

const historico = ref({
  comoPassageiro: [],
  comoMotorista: []
})

const participacoesVisiveis = reactive({})
const participacoesData = reactive({})
const carregandoParticipacoes = reactive({})

const formatarData = (dataIso) => {
  if (!dataIso) return ''
  const date = new Date(dataIso)
  return date.toLocaleString()
}

const carregarHistorico = async () => {
  loading.value = true
  try {
    const data = await usuarioService.getHistoricoCaronas()
    historico.value = data
  } catch (error) {
    dispararToast(error.response?.data?.erro || error.response?.data || 'Erro ao carregar histórico', 'error')
    console.error(error)
  } finally {
    loading.value = false
  }
}

const toggleParticipacoes = async (idCarona) => {
  participacoesVisiveis[idCarona] = !participacoesVisiveis[idCarona]
  
  if (participacoesVisiveis[idCarona] && !participacoesData[idCarona]) {
    await carregarParticipacoes(idCarona)
  }
}

const carregarParticipacoes = async (idCarona) => {
  carregandoParticipacoes[idCarona] = true
  try {
    const data = await caronaService.getParticipacoes(idCarona)
    participacoesData[idCarona] = data
  } catch (error) {
    dispararToast('Erro ao carregar solicitações', 'error')
    console.error(error)
  } finally {
    carregandoParticipacoes[idCarona] = false
  }
}

const responderParticipacao = async (idCarona, idParticipacao, acao) => {
  try {
    if (acao === 'aceitar') {
      await caronaService.aceitarPassageiro(idCarona, idParticipacao)
      dispararToast('Passageiro aceito com sucesso!', 'success')
    } else {
      await caronaService.rejeitarPassageiro(idCarona, idParticipacao)
      dispararToast('Passageiro recusado.', 'info')
    }
    // Recarregar participações para atualizar os status na UI
    await carregarParticipacoes(idCarona)
  } catch (error) {
    dispararToast(error.response?.data?.erro || error.response?.data || `Erro ao ${acao} passageiro`, 'error')
    console.error(error)
  }
}

const obterCorStatus = (status) => {
  if (status === 'CONFIRMADA' || status === 'CONFIRMADO') return 'bg-green-100 text-green-700'
  if (status === 'PENDENTE') return 'bg-yellow-100 text-yellow-700'
  if (status === 'REJEITADA' || status === 'REJEITADO') return 'bg-red-100 text-red-700'
  return 'bg-gray-100 text-gray-700'
}

onMounted(() => {
  carregarHistorico()
})
</script>