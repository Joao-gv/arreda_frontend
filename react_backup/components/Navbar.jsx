import React, { useState } from 'react';
import { Car, UserCircle, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white text-gray-800 p-4 sticky top-0 z-50 shadow-sm relative">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-arreda-green">
          <Car size={32} weight="fill" />
          <h1 className="text-3xl font-extrabold tracking-tight">arreda</h1>
        </Link>
        
        {/* Menu Desktop (Escondido no celular) */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/login" className="flex items-center gap-2 text-gray-600 font-medium hover:text-arreda-green transition">
            <UserCircle size={24} />
            <span>Entrar</span>
          </Link>
          <Link to="/oferecer-carona" className="bg-arreda-green text-white px-5 py-2.5 rounded-full font-bold hover:bg-arreda-dark transition shadow-md">
            Oferecer Carona
          </Link>
        </div>

        {/* Botão Mobile (Aparece só no celular) */}
        <button 
          className="md:hidden text-gray-600 hover:text-arreda-green transition" 
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* Menu Dropdown Mobile (Animado) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }}   
            exit={{ opacity: 0, y: -20 }}    
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 w-full bg-white shadow-xl md:hidden flex flex-col items-center py-6 gap-4 border-t border-gray-100"
          >
            <Link 
              to="/login" 
              onClick={() => setIsOpen(false)} 
              className="flex items-center gap-2 text-gray-600 font-medium hover:text-arreda-green transition w-full justify-center py-3 text-lg"
            >
              <UserCircle size={24} />
              <span>Entrar na minha conta</span>
            </Link>
            <Link 
              to="/oferecer-carona" 
              onClick={() => setIsOpen(false)} 
              className="bg-arreda-green text-white px-8 py-4 rounded-full font-bold hover:bg-arreda-dark transition shadow-md w-11/12 text-center text-lg"
            >
              Oferecer Carona
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;