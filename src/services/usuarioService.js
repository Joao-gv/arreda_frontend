import api from './api';

export const usuarioService = {
  async register(usuarioCreateDTO) {
    const response = await api.post('/usuarios/register', usuarioCreateDTO);
    return response.data;
  },

  async getHistoricoCaronas() {
    const response = await api.get('/usuarios/me/caronas');
    return response.data; // HistoricoCaronaDTO
  },

  async getMeusVeiculos() {
    const response = await api.get('/usuarios/me/veiculos');
    return response.data; // List<VeiculoResponseDTO>
  },

  async criarPerfilMotorista(perfilDTO) {
    const response = await api.post('/motorista/perfil', perfilDTO);
    return response.data;
  },

  async cadastrarVeiculo(veiculoDTO) {
    const response = await api.post('/motorista/veiculos', veiculoDTO);
    return response.data;
  },

  async getMe() {
    const response = await api.get('/usuarios/me');
    return response.data;
  }
};
