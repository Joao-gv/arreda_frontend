import axios from 'axios';

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

// Interceptor de Resposta: Trata erros globais e faz o refresh do token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Se o backend responder 401 (Não autorizado) e ainda não tentamos fazer o refresh
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('@arreda:refreshToken');
        if (refreshToken) {
          const { data } = await axios.post('http://localhost:8080/api/auth/refresh', {
            refreshToken
          });

          localStorage.setItem('@arreda:token', data.accessToken);
          localStorage.setItem('@arreda:refreshToken', data.refreshToken);

          originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        localStorage.removeItem('@arreda:token');
        localStorage.removeItem('@arreda:refreshToken');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    if (error.response && error.response.status === 401) {
      localStorage.removeItem('@arreda:token');
      localStorage.removeItem('@arreda:refreshToken');
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

export default api;