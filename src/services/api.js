import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api', 
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('@arreda:token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 1. ADICIONE ESTA VERIFICAÇÃO
    // Ajuste a string '/auth/login' para bater exatamente com a URL que seu authService.login chama
    const isLoginRequest = originalRequest.url.includes('/login'); 

    // 2. SE FOR A ROTA DE LOGIN, IGNORA O RESTO DO INTERCEPTOR E DEVOLVE O ERRO
    if (error.response && error.response.status === 401 && isLoginRequest) {
      return Promise.reject(error);
    }

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

    // Se for 401 definitivo (não é login e o refresh falhou)
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('@arreda:token');
      localStorage.removeItem('@arreda:refreshToken');
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

export default api;