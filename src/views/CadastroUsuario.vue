<template>
  <div class="flex-1 bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
    <div class="max-w-2xl w-full bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
      
      <div class="text-center mb-8">
        <h2 class="text-3xl font-extrabold text-gray-900">Criar sua Conta</h2>
        <p class="mt-2 text-gray-600">Seja bem-vindo ao Arreda! Preencha seus dados para começar.</p>
      </div>

      <form @submit.prevent="handleCadastro" class="space-y-6">
        
        <div class="flex flex-col items-center justify-center mb-6">
          <label class="block text-sm font-bold text-gray-700 mb-2">Foto de Perfil</label>
          
          <div class="relative group w-32 h-32 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden bg-gray-50 hover:border-arreda-green transition">
            <img v-if="previewFoto" :src="previewFoto" class="w-full h-full object-cover" />
            
            <label v-else class="cursor-pointer w-full h-full flex flex-col items-center justify-center">
              <Camera class="text-gray-400 group-hover:text-arreda-green transition" :size="32" />
              <span class="text-[10px] font-bold text-gray-500 mt-1">Adicionar</span>
              <input type="file" accept="image/*" class="hidden" @change="handleFotoUpload" />
            </label>

            <button 
              v-if="previewFoto" 
              type="button" 
              @click="removerFoto" 
              class="absolute inset-0 bg-black bg-opacity-50 text-white text-xs font-bold opacity-0 group-hover:opacity-100 transition flex items-center justify-center"
            >
              Alterar Foto
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="md:col-span-2">
            <label class="block text-sm font-bold text-gray-700 mb-1">Nome Completo</label>
            <div class="flex items-center p-3 border border-gray-300 rounded-xl focus-within:ring-2 focus-within:ring-arreda-green transition">
              <User class="text-gray-400 mr-3" :size="20" />
              <input v-model="form.nome" type="text" placeholder="Seu nome completo" required class="w-full bg-transparent outline-none" />
            </div>
          </div>

          <div>
            <label class="block text-sm font-bold text-gray-700 mb-1">E-mail Acadêmico</label>
            <div class="flex items-center p-3 border border-gray-300 rounded-xl focus-within:ring-2 focus-within:ring-arreda-green transition">
              <Mail class="text-gray-400 mr-3" :size="20" />
              <input v-model="form.email" type="email" placeholder="nome@academico.ifmg.edu.br" required class="w-full bg-transparent outline-none" />
            </div>
          </div>

          <div>
            <label class="block text-sm font-bold text-gray-700 mb-1">WhatsApp</label>
            <div class="flex items-center p-3 border border-gray-300 rounded-xl focus-within:ring-2 focus-within:ring-arreda-green transition">
              <Phone class="text-gray-400 mr-3" :size="20" />
              <input v-model="form.telefone" type="tel" placeholder="31999999999" required class="w-full bg-transparent outline-none" />
            </div>
          </div>

          <div>
            <label class="block text-sm font-bold text-gray-700 mb-1">CPF</label>
            <div class="flex items-center p-3 border border-gray-300 rounded-xl focus-within:ring-2 focus-within:ring-arreda-green transition">
              <IdCard class="text-gray-400 mr-3" :size="20" />
              <input v-model="form.cpf" type="text" maxlength="11" placeholder="Apenas números" required class="w-full bg-transparent outline-none" />
            </div>
          </div>

          <div>
            <label class="block text-sm font-bold text-gray-700 mb-1">O que você é no IFMG?</label>
            <div class="flex items-center p-3 border border-gray-300 rounded-xl focus-within:ring-2 focus-within:ring-arreda-green transition">
              <select v-model="form.tipoAcademico" required class="w-full bg-transparent outline-none text-gray-700 appearance-none">
                <option value="ALUNO">Aluno</option>
                <option value="PROFESSOR">Professor</option>
                <option value="SERVIDOR">TAE / Servidor</option>
              </select>
            </div>
          </div>
        </div>

        <div class="pt-4 border-t border-gray-100">
          <label class="block text-base font-bold text-gray-800 mb-3 text-center">Como você pretende utilizar o Arreda!?</label>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label 
              :class="['p-4 border-2 rounded-2xl cursor-pointer flex items-center gap-4 transition', form.intencao === 'passageiro' ? 'border-arreda-green bg-arreda-light bg-opacity-30' : 'border-gray-200 hover:border-gray-300']"
            >
              <input type="radio" v-model="form.intencao" value="passageiro" class="accent-arreda-green h-5 w-5" />
              <div>
                <span class="block font-bold text-gray-800">Quero usar carona</span>
                <span class="text-xs text-gray-500">Vou buscar viagens e ir de passageiro.</span>
              </div>
            </label>

            <label 
              :class="['p-4 border-2 rounded-2xl cursor-pointer flex items-center gap-4 transition', form.intencao === 'motorista' ? 'border-arreda-green bg-arreda-light bg-opacity-30' : 'border-gray-200 hover:border-gray-300']"
            >
              <input type="radio" v-model="form.intencao" value="motorista" class="accent-arreda-green h-5 w-5" />
              <div>
                <span class="block font-bold text-gray-800">Quero oferecer carona</span>
                <span class="text-xs text-gray-500">Vou dirigir e dividir os custos do combustível.</span>
              </div>
            </label>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-100">
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-1">Senha</label>
            <div class="flex items-center p-3 border border-gray-300 rounded-xl focus-within:ring-2 focus-within:ring-arreda-green transition">
              <Lock class="text-gray-400 mr-3" :size="20" />
              <input v-model="form.senha" type="password" required class="w-full bg-transparent outline-none" />
            </div>
          </div>

          <div>
            <label class="block text-sm font-bold text-gray-700 mb-1">Confirmar Senha</label>
            <div class="flex items-center p-3 border border-gray-300 rounded-xl focus-within:ring-2 focus-within:ring-arreda-green transition">
              <Lock class="text-gray-400 mr-3" :size="20" />
              <input v-model="form.confirmarSenha" type="password" required class="w-full bg-transparent outline-none" />
            </div>
          </div>
        </div>

        <button type="submit" :disabled="loading" class="w-full bg-arreda-green text-white font-bold py-4 rounded-xl hover:bg-arreda-dark transition text-lg shadow-md disabled:opacity-50">
          {{ loading ? 'Processando...' : 'Concluir Cadastro' }}
        </button>

      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from '../composables/useToast.js'
import { User, Mail, Phone, IdCard, Lock, Camera } from 'lucide-vue-next'
import { usuarioService } from '../services/usuarioService.js'
import { authService } from '../services/authService.js'
import { useAuth } from '../composables/useAuth.js'

const router = useRouter()
const { dispararToast } = useToast()
const { setToken, fetchUser } = useAuth()
const loading = ref(false)

const form = ref({
  nome: '',
  email: '',
  telefone: '',
  cpf: '',
  tipoAcademico: 'ALUNO',
  intencao: 'passageiro', // valor padrão
  senha: '',
  confirmarSenha: '',
  foto: null
})

const previewFoto = ref(null)

const handleFotoUpload = (event) => {
  const arquivo = event.target.files[0]
  if (!arquivo) return

  form.value.foto = arquivo
  previewFoto.value = URL.createObjectURL(arquivo)
}

const removerFoto = () => {
  form.value.foto = null
  previewFoto.value = null
}

const handleCadastro = async () => {
  if (form.value.senha !== form.value.confirmarSenha) {
    dispararToast('As senhas não coincidem!', 'error')
    return
  }

  loading.value = true
  try {
    await usuarioService.register({
      nome: form.value.nome,
      email: form.value.email,
      senha: form.value.senha,
      telefone: form.value.telefone
    })

    // Auto-login
    const data = await authService.login(form.value.email, form.value.senha)
    setToken(data.accessToken, data.refreshToken)
    await fetchUser()

    dispararToast('Usuário cadastrado com sucesso!', 'success')

    if (form.value.intencao === 'motorista') {
      router.push('/seja-motorista')
    } else {
      router.push('/')
    }
  } catch (error) {
    dispararToast(error.response?.data || error.response?.data?.erro || 'Erro ao realizar cadastro', 'error')
  } finally {
    loading.value = false
  }
}
</script>
