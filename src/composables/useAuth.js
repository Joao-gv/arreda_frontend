import { ref, computed } from 'vue'
import { usuarioService } from '../services/usuarioService.js'

const token = ref(localStorage.getItem('@arreda:token') || null)
const user = ref(null)

export const useAuth = () => {
  const isAuthenticated = computed(() => !!token.value)
  const isDriver = computed(() => !!(user.value && user.value.ehMotorista))

  const setToken = (newToken, newRefreshToken) => {
    localStorage.setItem('@arreda:token', newToken)
    localStorage.setItem('@arreda:refreshToken', newRefreshToken)
    token.value = newToken
  }

  const clearAuth = () => {
    localStorage.removeItem('@arreda:token')
    localStorage.removeItem('@arreda:refreshToken')
    localStorage.removeItem('@arreda:ehMotorista')
    localStorage.removeItem('@arreda:statusCnh')
    token.value = null
    user.value = null
  }

  const setUser = (newUser) => {
    user.value = newUser
    if (newUser?.ehMotorista) {
      localStorage.setItem('@arreda:ehMotorista', 'true')
      localStorage.setItem('@arreda:statusCnh', 'APROVADO')
    } else if (newUser) {
      localStorage.setItem('@arreda:ehMotorista', 'false')
    }
  }

  const fetchUser = async () => {
    if (!token.value) return
    try {
      const data = await usuarioService.getMe()
      setUser(data)
    } catch (error) {
      console.error('Erro ao buscar usuário logado', error)
      clearAuth() // Se o token for invalido/expirado
    }
  }

  const logout = () => {
    clearAuth()
    window.location.href = '/login'
  }

  return {
    token,
    user,
    isAuthenticated,
    isDriver,
    setUser,
    setToken,
    clearAuth,
    fetchUser,
    logout
  }
}
