<template>
  <div class="flex-1 bg-gray-50 flex flex-col">
    
    <section class="bg-white border-b border-gray-100 py-16 px-4 sm:px-6 lg:px-8 text-center md:text-left">
      <div class="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        <div>
          <span class="text-arreda-green font-extrabold text-sm uppercase tracking-wider bg-arreda-light px-3 py-1 rounded-full">
            Exclusivo para o IFMG
          </span>
          <h1 class="text-4xl md:text-5xl font-extrabold text-gray-900 mt-4 tracking-tight leading-none">
            Vá e volte do campus com segurança e economia.
          </h1>
          <p class="mt-4 text-lg text-gray-600">
            O <strong class="text-arreda-green">arreda</strong> conecta estudantes e servidores que oferecem ou precisam de carona. Divida os custos, conheça novas pessoas e chegue na hora da aula!
          </p>
          
          <div class="mt-8 flex flex-wrap gap-4 justify-center md:justify-start">
            <router-link to="/buscar-caronas" class="bg-gray-900 text-white font-bold px-8 py-4 rounded-xl hover:bg-gray-800 transition shadow-md flex items-center gap-2">
              <Search :size="20"/> Encontrar Carona
            </router-link>
            <router-link to="/oferecer-carona" class="bg-arreda-green text-white font-bold px-8 py-4 rounded-xl hover:bg-arreda-dark transition shadow-md flex items-center gap-2">
              <Car :size="20"/> Oferecer Carona
            </router-link>
          </div>
        </div>

        <div class="bg-gray-50 p-6 rounded-3xl border border-gray-200 shadow-xl max-w-md mx-auto w-full">
          <h3 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Compass class="text-arreda-green" :size="24"/> Para onde vamos hoje?
          </h3>
          
          <form @submit.prevent="irParaBusca" class="space-y-4">
            <div class="bg-white border border-gray-300 rounded-xl flex items-center p-3 focus-within:ring-2 focus-within:ring-arreda-green transition">
              <MapPin class="text-gray-400 mr-2" :size="20"/>
              <input v-model="buscaRapida.origem" type="text" placeholder="Sua localização atual..." class="w-full outline-none bg-transparent text-gray-700">
            </div>

            <div class="bg-white border border-gray-300 rounded-xl flex items-center p-3 focus-within:ring-2 focus-within:ring-arreda-green transition">
              <MapPin class="text-arreda-green mr-2" :size="20"/>
              <input v-model="buscaRapida.destino" type="text" placeholder="Destino (Ex: Campus IFMG)" class="w-full outline-none bg-transparent text-gray-700">
            </div>

            <button type="submit" class="w-full bg-arreda-green text-white font-bold py-4 rounded-xl hover:bg-arreda-dark transition flex items-center justify-center gap-2 text-lg shadow-md">
              Bora Rodar!
            </button>
          </form>
        </div>

      </div>
    </section>

    <section class="py-12 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
      <div class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4">
        <div class="p-3 bg-arreda-light text-arreda-green rounded-xl"><ShieldCheck :size="28"/></div>
        <div>
          <h4 class="font-bold text-gray-800 text-lg">Ambiente Seguro</h4>
          <p class="text-gray-600 text-sm mt-1">Apenas usuários cadastrados com o e-mail @academico.ifmg.edu.br.</p>
        </div>
      </div>

      <div class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4">
        <div class="p-3 bg-green-50 text-green-600 rounded-xl"><Sparkles :size="28"/></div>
        <div>
          <h4 class="font-bold text-gray-800 text-lg">Sustentabilidade</h4>
          <p class="text-gray-600 text-sm mt-1">Menos carros emitindo poluentes no estacionamento do campus.</p>
        </div>
      </div>

      <div class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4">
        <div class="p-3 bg-gray-100 text-gray-800 rounded-xl"><Users :size="28"/></div>
        <div>
          <h4 class="font-bold text-gray-800 text-lg">Integração</h4>
          <p class="text-gray-600 text-sm mt-1">Faça amizade com estudantes de Engenharia, Computação e outros cursos.</p>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Search, Car, MapPin, Compass, ShieldCheck, Sparkles, Users } from 'lucide-vue-next'

const router = useRouter()
const buscaRapida = ref({ origem: '', destino: '' })

const irParaBusca = () => {
  // Passa os termos digitados na Home para a tela de buscas de verdade
  router.push({
    path: '/buscar-caronas',
    query: { ...buscaRapida.value }
  })
}
</script>