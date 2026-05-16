import React, { useState } from 'react'; // <-- Importar useState
import { MapPin, Calendar, Clock, Users, CarFront, Loader2 } from 'lucide-react'; // <-- Adicionado o Loader2
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import toast from 'react-hot-toast';
import api from '../../src/services/api'; // <-- Importando nossa conexão com o Spring Boot

const caronaSchema = z.object({
  origem: z.string().min(3, 'A origem deve ter pelo menos 3 letras'),
  destino: z.string().min(3, 'O destino deve ter pelo menos 3 letras'),
  data: z.string().min(1, 'A data é obrigatória'),
  horario: z.string().min(1, 'O horário é obrigatório'),
  carro: z.string().min(4, 'Informe o modelo e a cor do carro'),
  vagas: z.string().min(1, 'Selecione o número de vagas'),
});

const OferecerCarona = () => {
  const [isLoading, setIsLoading] = useState(false); // Estado para controlar o botão

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(caronaSchema),
    defaultValues: { destino: 'Campus IFMG' }
  });

  // Função assíncrona para esperar a resposta do servidor
  const onSubmit = async (data) => {
    setIsLoading(true); // Desativa o botão e mostra o loading

    try {
      // 1. Convertendo os dados caso seu backend exija formatos específicos
      // Ex: transformando as vagas de string para número (Integer no Java)
      const payload = {
        ...data,
        vagas: parseInt(data.vagas, 10) 
      };

      // 2. Disparando o POST para o Spring Boot (Ex: endpoint /api/caronas)
      // Atenção: Substitua '/api/caronas' pelo endpoint real que você criar no Java
      const response = await api.post('/api/caronas', payload);

      // 3. Sucesso!
      console.log('Resposta do Servidor:', response.data);
      toast.success('Carona publicada com sucesso! 🎉');
      reset(); // Limpa o formulário

    } catch (error) {
      // 4. Tratamento de Erros
      console.error('Erro na requisição:', error);
      
      // Verifica se o erro veio do servidor ou se a API está fora do ar
      if (error.response) {
        toast.error(`Erro do servidor: ${error.response.data.message || 'Falha ao salvar'}`);
      } else {
        toast.error('Erro de conexão. O Spring Boot está rodando na porta 8080?');
      }
    } finally {
      setIsLoading(false); // Reativa o botão
    }
  };

  return (
    <div className="flex-1 bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        
        <div className="mb-8 text-center md:text-left">
          <h2 className="text-3xl font-extrabold text-gray-900">Oferecer uma Carona</h2>
          <p className="mt-2 text-gray-600">Preencha os detalhes da sua viagem para ajudar outros estudantes.</p>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
          {/* Formulário gerenciado pelo handleSubmit */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            
            {/* Rota */}
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Rota da Viagem</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center p-3 border border-gray-300 rounded-xl focus-within:ring-2 focus-within:ring-arreda-green transition cursor-text">
                    <MapPin className="text-gray-400 mr-3" size={24} />
                    <input {...register('origem')} type="text" placeholder="Saindo de (Ex: Centro)" className="w-full bg-transparent outline-none" />
                  </label>
                  {errors.origem && <p className="text-red-500 text-sm mt-1 ml-1 font-medium">{errors.origem.message}</p>}
                </div>
                
                <div>
                  <label className="flex items-center p-3 border border-gray-300 rounded-xl focus-within:ring-2 focus-within:ring-arreda-green transition cursor-text">
                    <MapPin className="text-arreda-green mr-3" size={24} />
                    <input {...register('destino')} type="text" placeholder="Indo para" className="w-full bg-transparent outline-none" />
                  </label>
                  {errors.destino && <p className="text-red-500 text-sm mt-1 ml-1 font-medium">{errors.destino.message}</p>}
                </div>
              </div>
            </div>

            {/* Data e Hora */}
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Data e Horário</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center p-3 border border-gray-300 rounded-xl focus-within:ring-2 focus-within:ring-arreda-green transition cursor-pointer">
                    <Calendar className="text-gray-400 mr-3" size={24} />
                    <input {...register('data')} type="date" onClick={(e) => e.target.showPicker && e.target.showPicker()} className="w-full bg-transparent outline-none cursor-pointer" />
                  </label>
                  {errors.data && <p className="text-red-500 text-sm mt-1 ml-1 font-medium">{errors.data.message}</p>}
                </div>

                <div>
                  <label className="flex items-center p-3 border border-gray-300 rounded-xl focus-within:ring-2 focus-within:ring-arreda-green transition cursor-pointer">
                    <Clock className="text-gray-400 mr-3" size={24} />
                    <input {...register('horario')} type="time" onClick={(e) => e.target.showPicker && e.target.showPicker()} className="w-full bg-transparent outline-none cursor-pointer" />
                  </label>
                  {errors.horario && <p className="text-red-500 text-sm mt-1 ml-1 font-medium">{errors.horario.message}</p>}
                </div>
              </div>
            </div>

            {/* Detalhes do Carro */}
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Detalhes e Vagas</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center p-3 border border-gray-300 rounded-xl focus-within:ring-2 focus-within:ring-arreda-green transition cursor-text">
                    <CarFront className="text-gray-400 mr-3" size={24} />
                    <input {...register('carro')} type="text" placeholder="Modelo / Cor do Carro" className="w-full bg-transparent outline-none" />
                  </label>
                  {errors.carro && <p className="text-red-500 text-sm mt-1 ml-1 font-medium">{errors.carro.message}</p>}
                </div>

                <div>
                  <label className="flex items-center p-3 border border-gray-300 rounded-xl focus-within:ring-2 focus-within:ring-arreda-green transition cursor-pointer">
                    <Users className="text-gray-400 mr-3" size={24} />
                    <select {...register('vagas')} className="w-full bg-transparent outline-none cursor-pointer text-gray-700">
                      <option value="">Lugares disponíveis</option>
                      <option value="1">1 vaga</option>
                      <option value="2">2 vagas</option>
                      <option value="3">3 vagas</option>
                      <option value="4">4 vagas</option>
                    </select>
                  </label>
                  {errors.vagas && <p className="text-red-500 text-sm mt-1 ml-1 font-medium">{errors.vagas.message}</p>}
                </div>
              </div>
            </div>

           {/* Botão de Envio com Loading */}
            <div className="pt-4">
              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full flex justify-center items-center py-4 px-4 border border-transparent rounded-xl shadow-sm text-lg font-bold text-white bg-arreda-green hover:bg-arreda-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-arreda-green transition disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin mr-2" size={24} />
                    Publicando...
                  </>
                ) : (
                  'Publicar Carona'
                )}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default OferecerCarona;