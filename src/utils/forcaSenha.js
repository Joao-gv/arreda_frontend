// Lógica do indicador visual de força de senha (usada em RedefinirSenha.vue).
// A regra de validação é a mesma combinada com o time no backend (RedefinirSenhaDTO):
// 8 a 72 caracteres, com pelo menos uma letra e um número.

const VAZIO = { nivel: 0, rotulo: '', cor: '', texto: '' }
const FRACA = { nivel: 1, rotulo: 'Fraca', cor: 'bg-red-400', texto: 'text-red-500' }
const MEDIA = { nivel: 2, rotulo: 'Média', cor: 'bg-yellow-400', texto: 'text-yellow-600' }
const FORTE = { nivel: 3, rotulo: 'Forte', cor: 'bg-arreda-green', texto: 'text-arreda-green' }

export function calcularForcaSenha(senha) {
  if (!senha) return VAZIO

  // Senha que viola a regra do backend sempre aparece como Fraca,
  // porque seria recusada no envio mesmo parecendo forte visualmente.
  const atendeRegra =
    senha.length >= 8 &&
    senha.length <= 72 &&
    /[A-Za-z]/.test(senha) &&
    /\d/.test(senha)
  if (!atendeRegra) return FRACA

  // Aqui a senha já tem 8+ caracteres com letra e número; pontos começa em 1.
  let pontos = 1
  if (senha.length >= 12) pontos++
  if (/[^A-Za-z0-9]/.test(senha)) pontos++

  if (pontos === 1) return FRACA
  if (pontos === 2) return MEDIA
  return FORTE
}
