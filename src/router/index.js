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
  { path: '/login', name: 'Login', component: Login, meta: { unauthenticatedOnly: true } },
  { path: '/cadastro', name: 'CadastroUsuario', component: CadastroUsuario, meta: { unauthenticatedOnly: true } }, 
  { path: '/buscar-caronas', name: 'BuscarCaronas', component: BuscarCaronas }, // Qualquer um busca
  { path: '/admin', name: 'AdminControl', component: Admin }, // Admin temporário sem restrição severa
  
  // Rotas Privadas (exigem login)
  { path: '/minhas-reservas', name: 'MinhasReservas', component: MinhasReservas, meta: { requiresAuth: true } },
  { path: '/seja-motorista', name: 'CadastroMotorista', component: CadastroMotorista, meta: { requiresAuth: true } },
  
  // Rotas de Motorista
  { 
    path: '/painel-motorista', 
    name: 'PainelMotorista', 
    component: CadastroVeiculo,
    meta: { requiresAuth: true, requerMotorista: true } 
  },
  { 
    path: '/oferecer-carona', 
    name: 'OferecerCarona', 
    component: OferecerCarona,
    meta: { requiresAuth: true, requerMotorista: true } 
  }
]

const router = createRouter({
  history: createWebHistory('/arreda_frontend/'),
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('@arreda:token')
  const ehMotorista = localStorage.getItem('@arreda:ehMotorista') === 'true'

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!token) {
      next({ path: '/login' })
    } else {
      if (to.matched.some(record => record.meta.requerMotorista) && !ehMotorista) {
        next({ path: '/seja-motorista' })
      } else {
        next()
      }
    }
  } else if (to.matched.some(record => record.meta.unauthenticatedOnly)) {
    if (token) {
      next({ path: '/' })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router