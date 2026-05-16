<template>
  <div class="flex-1 bg-gray-900 text-white py-12 px-4">
    <div class="max-w-3xl mx-auto">
      
      <div class="border-b border-gray-800 pb-6 mb-8">
        <h2 class="text-3xl font-mono font-bold text-arreda-green flex items-center gap-2">
          <ShieldAlert /> Central do Administrador (Simulação)
        </h2>
        <p class="text-gray-400 mt-2 text-sm">Altere os estados de verificação para testar as travas do sistema em tempo real.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div class="bg-gray-800 p-6 rounded-2xl border border-gray-700">
          <h3 class="text-lg font-bold mb-4 flex items-center gap-2 text-blue-400"><Mail /> Verificação de E-mail</h3>
          <p class="text-xs text-gray-400 mb-4">Status Atual: <span class="font-mono bg-gray-900 px-2 py-0.5 rounded text-white">{{ statusEmail }}</span></p>
          <div class="flex gap-2">
            <button @click="mudarEmail('PENDENTE')" class="flex-1 text-xs py-2 bg-yellow-600 rounded-xl font-bold">Marcar Pendente</button>
            <button @click="mudarEmail('VERIFICADO')" class="flex-1 text-xs py-2 bg-green-600 rounded-xl font-bold">Aprovar E-mail</button>
          </div>
        </div>

        <div class="bg-gray-800 p-6 rounded-2xl border border-gray-700">
          <h3 class="text-lg font-bold mb-4 flex items-center gap-2 text-amber-400"><FileText /> Análise de CNH</h3>
          <p class="text-xs text-gray-400 mb-4">Status Atual: <span class="font-mono bg-gray-900 px-2 py-0.5 rounded text-white">{{ statusCnh }}</span></p>
          <div class="flex flex-col gap-2">
            <div class="flex gap-2">
              <button @click="mudarCnh('PENDENTE')" class="flex-1 text-xs py-2 bg-yellow-600 rounded-xl font-bold">Colocar em Análise</button>
              <button @click="mudarCnh('APROVADO')" class="flex-1 text-xs py-2 bg-green-600 rounded-xl font-bold">Aprovar CNH</button>
            </div>
            <button @click="mudarCnh('RECUSADO')" class="w-full text-xs py-2 bg-red-600 rounded-xl font-bold">Recusar Documento</button>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useToast } from '../composables/useToast.js'
import { ShieldAlert, Mail, FileText } from 'lucide-vue-next'

const { dispararToast } = useToast()

const statusEmail = ref(localStorage.getItem('@arreda:statusEmail'))
const statusCnh = ref(localStorage.getItem('@arreda:statusCnh'))

const mudarEmail = (novoStatus) => {
  localStorage.setItem('@arreda:statusEmail', novoStatus)
  statusEmail.value = novoStatus
  dispararToast(`E-mail alterado para ${novoStatus}!`, 'info')
}

const mudarCnh = (novoStatus) => {
  localStorage.setItem('@arreda:statusCnh', novoStatus)
  statusCnh.value = novoStatus
  
  // Sincroniza a flag antiga do motorista para o interceptor de rotas aceitar o acesso
  if (novoStatus === 'APROVADO') {
    localStorage.setItem('@arreda:ehMotorista', 'true')
  } else {
    localStorage.setItem('@arreda:ehMotorista', 'false')
  }
  
  dispararToast(`Status da CNH atualizado para ${novoStatus}!`, 'info')
}
</script>