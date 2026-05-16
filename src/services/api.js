import axios from 'axios';

// Cria a instância do Axios apontando para o seu backend local em Java Spring Boot
const api = axios.create({
  baseURL: 'http://localhost:8080/api', // Ajuste a rota base de acordo com as suas Controllers do Spring
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Interceptor de Requisição: Injeta o token JWT automaticamente em cada chamada
api.interceptors.request.use(
  (config) => {
    // Busca o token que salvamos no localStorage (o mesmo do nosso "truque" de bypass)
    const token = localStorage.getItem('@arreda:token');
    
    if (token) {
      // Padrão de mercado: insere o token no cabeçalho HTTP Bearer
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor de Resposta: Trata erros globais (como token expirado)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Se o backend responder 401 (Não autorizado), limpa o token e chuta o usuário para o Login
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('@arreda:token');
      // Força o redirecionamento para a página de login
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;