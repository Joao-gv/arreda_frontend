import React from 'react';
import { Car } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2 text-arreda-green opacity-80">
          <Car size={24} weight="fill" />
          <span className="text-xl font-extrabold tracking-tight">arreda</span>
        </div>
        
        <p className="text-sm text-gray-500 text-center">
          Desenvolvido para a comunidade do IFMG. © 2026.
        </p>
        
        <div className="flex gap-6 text-sm font-medium text-gray-500">
          <a href="#" className="hover:text-arreda-green transition">Termos e Segurança</a>
          <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-arreda-green transition">GitHub do Projeto</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;