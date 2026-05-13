import React, { useState } from 'react';
import { Mail, Lock, User, IdCard, Car } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Login = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState('login'); 
  
  // Novo estado para guardar o e-mail digitado e fazer a verificação
  const [emailIfmg, setEmailIfmg] = useState('');

  const handleEnviarCodigo = (e) => {
    e.preventDefault();
    
    // Regra de Validação do Domínio
    if (!emailIfmg.endsWith('@academico.ifmg.edu.br')) {
      toast.error('O e-mail deve terminar com @academico.ifmg.edu.br', {
        style: { borderRadius: '10px', background: '#333', color: '#fff' }
      });
      return; // Interrompe a função aqui e não deixa avançar
    }

    toast.success('Código enviado para seu e-mail do IFMG!');
    setStep('codigo_verificacao');
  };

  const handleVerificarCodigo = (e) => {
    e.preventDefault();
    toast.success('Código verificado! Complete seu cadastro.');
    setStep('dados_pessoais');
  };

  const handleCadastroFinal = (e) => {
    e.preventDefault();
    toast.success('Conta criada com sucesso! Bem-vindo.');
    navigate('/');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    toast.success('Login efetuado com sucesso!');
    navigate('/');
  };

  return (
    <div className="flex-1 flex items-center justify-center py-12 px-4 bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
        
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-arreda-green justify-center mb-6">
            <Car size={36} weight="fill" />
            <span className="text-3xl font-extrabold">arreda</span>
          </Link>
          <h2 className="text-2xl font-bold text-gray-900">
            {step === 'login' && 'Bem-vindo de volta!'}
            {step === 'email_ifmg' && 'Validação Acadêmica'}
            {step === 'codigo_verificacao' && 'Verifique seu e-mail'}
            {step === 'dados_pessoais' && 'Finalize seu cadastro'}
          </h2>
        </div>

        {/* ETAPA 1: LOGIN */}
        {step === 'login' && (
          <form onSubmit={handleLogin} className="space-y-5">
            <input type="email" placeholder="E-mail principal" required className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-arreda-green outline-none" />
            <input type="password" placeholder="Senha" required className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-arreda-green outline-none" />
            <button className="w-full py-3 bg-arreda-green text-white font-bold rounded-xl hover:bg-arreda-dark transition">Entrar</button>
            <p className="text-center mt-4 text-gray-600">Não tem conta? <button type="button" onClick={() => setStep('email_ifmg')} className="text-arreda-green font-bold">Cadastre-se</button></p>
          </form>
        )}

        {/* ETAPA 2: PEDIR E-MAIL IFMG */}
        {step === 'email_ifmg' && (
          <form onSubmit={handleEnviarCodigo} className="space-y-5">
            <p className="text-sm text-gray-600">Para garantir a segurança da comunidade, valide seu vínculo com a instituição.</p>
            <input 
              type="email" 
              value={emailIfmg}
              onChange={(e) => setEmailIfmg(e.target.value)}
              placeholder="Seu e-mail @academico.ifmg.edu.br" 
              required 
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-arreda-green outline-none" 
            />
            <button className="w-full py-3 bg-arreda-green text-white font-bold rounded-xl hover:bg-arreda-dark transition">Enviar Código de Verificação</button>
            <button type="button" onClick={() => setStep('login')} className="w-full text-gray-500 font-medium mt-2 hover:text-gray-800 transition">Voltar para o Login</button>
          </form>
        )}

        {/* ETAPA 3: DIGITAR CÓDIGO */}
        {step === 'codigo_verificacao' && (
          <form onSubmit={handleVerificarCodigo} className="space-y-5">
            <p className="text-sm text-gray-600 text-center mb-4">
              Enviamos um código para <br/><span className="font-bold">{emailIfmg}</span>
            </p>
            <input 
              type="text" 
              placeholder="Código de 6 dígitos" 
              maxLength="6" 
              required 
              className="w-full p-3 border border-gray-300 rounded-xl text-center tracking-widest text-lg font-bold focus:ring-2 focus:ring-arreda-green outline-none transition" 
            />
            <button className="w-full py-3 bg-arreda-green text-white font-bold rounded-xl hover:bg-arreda-dark transition">Verificar Código</button>
          </form>
        )}

        {/* ETAPA 4: DADOS PESSOAIS */}
        {step === 'dados_pessoais' && (
          <form onSubmit={handleCadastroFinal} className="space-y-4">
            <input type="text" placeholder="Nome completo" required className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-arreda-green outline-none" />
            <input type="text" placeholder="Matrícula" required className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-arreda-green outline-none" />
            <input type="email" placeholder="E-mail pessoal (Opcional)" className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-arreda-green outline-none" />
            <input type="password" placeholder="Crie uma senha" required className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-arreda-green outline-none" />
            <button className="w-full py-3 bg-arreda-green text-white font-bold rounded-xl hover:bg-arreda-dark transition">Criar Conta</button>
          </form>
        )}

      </div>
    </div>
  );
};

export default Login;