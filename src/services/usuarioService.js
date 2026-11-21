import api from './api.js';
import { API_BASE_URL } from '../environments/environments.js';

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
  },

  async atualizarPerfil(dados) {
    const response = await api.put('/usuarios/me', dados);
    return response.data;
  },

  async enviarFotoPerfil(arquivo, onUploadProgress) {
    const dados = new FormData();
    dados.append('foto', arquivo);

    const response = await api.post('/usuarios/me/foto', dados, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress
    });
    return response.data;
  },

  async removerFotoPerfil() {
    await api.delete('/usuarios/me/foto');
  },

  async excluirConta(senha) {
    // No axios, o corpo de um DELETE vai na opção "data", e não no segundo parâmetro.
    await api.delete('/usuarios/me', { data: { senha } });
  },

  fotoUrlPorId(id) {
    return id ? `${API_BASE_URL}/usuarios/${id}/foto` : null;
  }
};
