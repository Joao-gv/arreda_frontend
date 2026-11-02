import api from './api';

export const authService = {
  async login(email, senha) {
    const response = await api.post('/auth/login', { email, senha });
    return response.data; // { accessToken, refreshToken }
  },

  async confirmarEmail(token) {
    const response = await api.post('/auth/confirmar-email', { token });
    return response.data; // { mensagem }
  },

  async reenviarConfirmacao(email) {
    const response = await api.post('/auth/reenviar-confirmacao', { email });
    return response.data; // { mensagem }
  },

  logout() {
    localStorage.removeItem('@arreda:token');
    localStorage.removeItem('@arreda:refreshToken');
    window.location.href = '/login';
  }
};
