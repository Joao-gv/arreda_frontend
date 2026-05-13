import React from 'react';
import { Clock, Users, User, ArrowRight, Car } from 'lucide-react';
import toast from 'react-hot-toast';

const BuscarCaronas = () => {
  // Simulando dados que virão do seu banco PostgreSQL no futuro
  const caronas = [
    { id: 1, motorista: 'Ana Souza', curso: 'Ciência da Computação', origem: 'Centro', destino: 'IFMG', horario: '07:00', vagas: 3, modelo: 'Fiat Mobi (Prata)' },
    { id: 2, motorista: 'Lucas Mendes', curso: 'Engenharia', origem: 'Bairro Esperança', destino: 'IFMG', horario: '07:15', vagas: 1, modelo: 'Chevrolet Onix (Preto)' },
    { id: 3, motorista: 'Mariana Silva', curso: 'Administração', origem: 'Terminal Rodoviário', destino: 'IFMG', horario: '07:30', vagas: 4, modelo: 'VW Polo (Branco)' },
  ];

  const handleSolicitar = (motorista) => {
    toast.success(`Solicitação enviada para ${motorista}! Verifique seu e-mail.`);
  };

  return (
    <div className="flex-1 bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-arreda-light p-3 rounded-full text-arreda-green">
              <Car size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">Caronas para o IFMG</h2>
              <p className="text-gray-500 text-sm">Mostrando resultados para hoje</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {caronas.map((carona) => (
            <div key={carona.id} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition flex flex-col md:flex-row justify-between items-center gap-6">
              
              <div className="flex items-center gap-4 w-full md:w-1/3">
                <div className="bg-gray-100 p-3 rounded-full text-gray-500">
                  <User size={24} />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-lg">{carona.motorista}</p>
                  <p className="text-xs text-gray-400">{carona.modelo}</p>
                </div>
              </div>

              <div className="flex flex-col w-full md:w-1/3">
                <div className="flex items-center gap-2 text-gray-800 font-bold mb-2">
                  <Clock size={18} className="text-arreda-green" />
                  <span className="text-lg">{carona.horario}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-2 rounded-lg">
                  <span className="truncate">{carona.origem}</span>
                  <ArrowRight size={14} />
                  <span className="font-bold text-arreda-green truncate">{carona.destino}</span>
                </div>
              </div>

              <div className="flex items-center justify-between w-full md:w-1/3 gap-4">
                <div className="flex flex-col items-center justify-center bg-arreda-light px-4 py-2 rounded-xl text-arreda-dark">
                  <div className="flex items-center gap-1">
                    <Users size={18} />
                    <span className="font-black text-xl">{carona.vagas}</span>
                  </div>
                  <span className="text-[10px] font-bold uppercase">Vagas</span>
                </div>
                <button
                  onClick={() => handleSolicitar(carona.motorista)}
                  className="flex-1 bg-arreda-green text-white font-bold px-6 py-3 rounded-xl hover:bg-arreda-dark transition shadow-sm"
                >
                  Solicitar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BuscarCaronas;