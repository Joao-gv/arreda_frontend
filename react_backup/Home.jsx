import React from 'react';
import { ChevronRight } from 'lucide-react';
import SearchBox from '../components/SearchBox';

const Home = () => {
  return (
    <main>
      <div className="bg-arreda-light pt-16 pb-32 px-4 flex flex-col items-center">
        <div className="text-center max-w-3xl">
          <h2 className="text-5xl font-black text-gray-900 mb-6 leading-tight">
            Sua carona para o IFMG,<br /> a um clique de distância.
          </h2>
          <p className="text-gray-700 mb-8 text-xl font-medium">
            Viaje com colegas, economize dinheiro e ajude o meio ambiente.
          </p>
        </div>
      </div>

      <div className="px-4">
        <SearchBox />
      </div>

      <div className="container mx-auto mt-24 px-4 pb-20">
        <h3 className="text-3xl font-bold text-gray-800 mb-10 text-center">Por que usar o Arreda?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Economia garantida", desc: "Divida os custos da viagem e gaste menos indo para as aulas." },
            { title: "Comunidade segura", desc: "Viaje apenas com alunos e professores cadastrados no sistema." },
            { title: "Menos trânsito", desc: "Menos carros na rua significa um trajeto mais rápido para todos." }
          ].map((item, index) => (
            <div key={index} className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-md transition border border-gray-100">
              <div className="w-12 h-12 bg-arreda-light rounded-full flex items-center justify-center mb-6">
                <ChevronRight className="text-arreda-green" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h4>
              <p className="text-gray-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Home;