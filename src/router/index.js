import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import CadastroVeiculo from '../views/CadastroVeiculo.vue'
import OferecerCarona from '../views/OferecerCarona.vue'
import BuscarCaronas from '../views/BuscarCaronas.vue'
import MinhasReservas from '../views/MinhasReservas.vue'
import CadastroMotorista from '../views/CadastroMotorista.vue'
import CadastroUsuario from '../views/CadastroUsuario.vue' 
import Admin from '../views/Admin.vue' // No topo
const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: Login },
  { path: '/buscar-caronas', name: 'BuscarCaronas', component: BuscarCaronas },
  { path: '/minhas-reservas', name: 'MinhasReservas', component: MinhasReservas },
  { path: '/seja-motorista', name: 'CadastroMotorista', component: CadastroMotorista },
  { path: '/cadastro', name: 'CadastroUsuario', component: CadastroUsuario }, // 
  { path: '/admin', name: 'AdminControl', component: Admin },
  
  { 
    path: '/painel-motorista', 
    name: 'PainelMotorista', 
    component: CadastroVeiculo,
    meta: { requerMotorista: true } 
  },
  { 
    path: '/oferecer-carona', 
    name: 'OferecerCarona', 
    component: OferecerCarona,
    meta: { requerMotorista: true } 
  }
]

const router = createRouter({
  history: createWebHistory('/arreda_frontend/'),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requerMotorista)) {
    const ehMotorista = localStorage.getItem('@arreda:ehMotorista') === 'true'
    if (!ehMotorista) {
      alert('Acesso negado! Você precisa cadastrar sua CNH para acessar esta área.')
      next({ path: '/seja-motorista' })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router