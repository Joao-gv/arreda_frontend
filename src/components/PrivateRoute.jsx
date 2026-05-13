import React from 'react';
import { Navigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const PrivateRoute = ({ children }) => {
  // Verifica se o usuário tem um token salvo
  const token = localStorage.getItem('@arreda:token');
  
  if (!token) {
    // Se não tiver, avisa e manda para a tela de login
    toast.error('Você precisa estar logado para acessar esta página.', { id: 'auth-error' });
    return <Navigate to="/login" replace />;
  }

  // Se tiver token, renderiza a página normalmente
  return children;
};

export default PrivateRoute;