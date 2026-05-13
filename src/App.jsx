import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Navbar from './components/Navbar';
import Footer from './components/Footer'; // <-- Importamos o Footer
import PrivateRoute from './components/PrivateRoute'; // <-- Importamos a Proteção

import Home from './pages/Home';
import Login from './pages/Login';
import OferecerCarona from './pages/OferecerCarona';
import BuscarCaronas from './pages/BuscarCaronas';

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      
      {/* O mt-auto no Footer e o flex-col aqui garantem que o rodapé fique sempre embaixo */}
      <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
        <Navbar />
        
        {/* Usamos flex-1 para empurrar o Footer para baixo caso a tela seja pequena */}
        <div className="flex-1 flex flex-col">
          <Routes>
            {/* Rotas Públicas */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            
            {/* Rotas Privadas (Protegidas) */}
            <Route 
              path="/oferecer-carona" 
              element={
                <PrivateRoute>
                  <OferecerCarona />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/buscar-caronas" 
              element={
                <PrivateRoute>
                  <BuscarCaronas />
                </PrivateRoute>
              } 
            />
          </Routes>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;