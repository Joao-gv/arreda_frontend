import api from './api';

export const authService = {
  async login(email, senha) {
    const response = await api.post('/auth/login', { email, senha });
    return response.data; // { accessToken, refreshToken }
  },

  logout() {
    localStorage.removeItem('@arreda:token');
    localStorage.removeItem('@arreda:refreshToken');
    window.location.href = '/login';
  }
};
