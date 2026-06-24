import api from './api';

export const caronaService = {
  async publicar(caronaDTO) {
    const response = await api.post('/caronas/publicar', caronaDTO);
    return response.data;
  },

  async buscarCaronas(origem, destino, data, page = 0, size = 10) {
    const params = { page, size };
    if (origem) params.origem = origem;
    if (destino) params.destino = destino;
    if (data) params.data = data;

    const response = await api.get('/caronas', { params });
    return response.data; // Page<CaronaResponseDTO>
  },

  async solicitar(idCarona) {
    const response = await api.post(`/caronas/${idCarona}/solicitar`);
    return response.data;
  },

  async getParticipacoes(idCarona) {
    const response = await api.get(`/caronas/${idCarona}/participacoes`);
    return response.data;
  },

  async aceitarPassageiro(idCarona, idParticipacao) {
    const response = await api.put(`/caronas/${idCarona}/participacoes/${idParticipacao}/aceitar`);
    return response.data;
  },

  async rejeitarPassageiro(idCarona, idParticipacao) {
    const response = await api.put(`/caronas/${idCarona}/participacoes/${idParticipacao}/rejeitar`);
    return response.data;
  }
};
