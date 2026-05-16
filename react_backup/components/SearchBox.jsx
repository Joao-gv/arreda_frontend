import React, { useState } from 'react';
import { MapPin, Calendar, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SearchBox = () => {
  const [direcao, setDirecao] = useState('ida');
  const navigate = useNavigate();

  const handleBusca = () => {
    navigate('/buscar-caronas');
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-4 w-full max-w-5xl mx-auto flex flex-col items-center border border-gray-100 relative -mt-10 md:-mt-16 z-10">
      
      {/* Seletor Ida/Volta */}
      <div className="flex w-full mb-4 bg-gray-100 rounded-lg p-1 max-w-xs self-start">
        <button 
          onClick={() => setDirecao('ida')} 
          className={`flex-1 py-2 text-sm font-bold rounded-md transition ${direcao === 'ida' ? 'bg-white shadow-sm text-arreda-green' : 'text-gray-500 hover:text-gray-700'}`}
        >
          Indo pro IFMG
        </button>
        <button 
          onClick={() => setDirecao('volta')} 
          className={`flex-1 py-2 text-sm font-bold rounded-md transition ${direcao === 'volta' ? 'bg-white shadow-sm text-arreda-green' : 'text-gray-500 hover:text-gray-700'}`}
        >
          Saindo do IFMG
        </button>
      </div>

      <div className="flex flex-col md:flex-row w-full gap-2">
        {/* Origem/Destino */}
        <label className="flex-1 flex items-center p-3 border rounded-xl hover:bg-gray-50 transition cursor-text">
          <MapPin className="text-gray-400 mr-3" size={24} />
          <div className="flex flex-col w-full">
            <span className="text-xs font-bold text-gray-500 uppercase">{direcao === 'ida' ? 'Saindo de' : 'Indo para'}</span>
            <input type="text" placeholder={direcao === 'ida' ? "Ex: Seu Bairro" : "Ex: Centro"} className="w-full bg-transparent focus:outline-none text-gray-800 font-medium" />
          </div>
        </label>

        {/* Calendário */}
        <label className="flex-1 flex items-center p-3 border rounded-xl hover:bg-gray-50 transition cursor-pointer">
          <Calendar className="text-gray-400 mr-3" size={24} />
          <div className="flex flex-col w-full">
            <span className="text-xs font-bold text-gray-500 uppercase">Quando</span>
            <input 
              type="date" 
              onClick={(e) => e.target.showPicker && e.target.showPicker()}
              className="w-full bg-transparent focus:outline-none text-gray-800 font-medium cursor-pointer" 
            />
          </div>
        </label>

        {/* Botão Buscar */}
        <button onClick={handleBusca} className="w-full md:w-auto bg-arreda-green text-white font-bold px-8 py-4 rounded-xl hover:bg-arreda-dark transition flex justify-center items-center gap-2">
          <Search size={24} />
          <span className="md:hidden">Buscar</span>
        </button>
      </div>
    </div>
  );
}; // <-- Era essa chave que estava faltando!

export default SearchBox;