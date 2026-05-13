import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080', 
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Interceptor de Requisição
api.interceptors.request.use(async (config) => {
  // Busca o token salvo no navegador (localStorage)
  const token = localStorage.getItem('@arreda:token');
  
  if (token) {
    // Se existir, injeta no cabeçalho de Autorização
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
});

export default api;