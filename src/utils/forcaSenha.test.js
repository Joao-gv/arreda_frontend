// Testes da lógica do indicador visual de força de senha.
// Rodar com: node src/utils/forcaSenha.test.js
// Sem framework de teste: usa node:assert (a decisão foi não instalar vitest ainda).
import assert from 'node:assert/strict'
import { calcularForcaSenha } from './forcaSenha.js'

let executados = 0
let falhas = 0

const testar = (nome, afirmacoes) => {
  executados++
  try {
    afirmacoes()
    console.log(`✔ ${nome}`)
  } catch (erro) {
    falhas++
    console.error(`✖ ${nome}`)
    console.error(`   ${erro.message}`)
  }
}

const FRACA = { nivel: 1, rotulo: 'Fraca', cor: 'bg-red-400', texto: 'text-red-500' }
const MEDIA = { nivel: 2, rotulo: 'Média', cor: 'bg-yellow-400', texto: 'text-yellow-600' }
const FORTE = { nivel: 3, rotulo: 'Forte', cor: 'bg-arreda-green', texto: 'text-arreda-green' }
const VAZIO = { nivel: 0, rotulo: '', cor: '', texto: '' }

testar('senha vazia não exibe o indicador', () => {
  assert.deepEqual(calcularForcaSenha(''), VAZIO)
})

// BUG relatado: "abc" aparecia como Forte porque pontos=0 caía no retorno final
testar("senha curta sem número como 'abc' aparece como Fraca", () => {
  assert.deepEqual(calcularForcaSenha('abc'), FRACA)
})

testar('senha curta com símbolo mas sem atender a regra aparece como Fraca', () => {
  assert.deepEqual(calcularForcaSenha('ab!'), FRACA)
})

testar('senha de 7 caracteres com letra, número e símbolo aparece como Fraca', () => {
  assert.deepEqual(calcularForcaSenha('$Abc123'), FRACA)
})

testar('senha de 8 caracteres sem número aparece como Fraca', () => {
  assert.deepEqual(calcularForcaSenha('abcdefgh'), FRACA)
})

testar('senha de 8 caracteres sem letra aparece como Fraca', () => {
  assert.deepEqual(calcularForcaSenha('12345678'), FRACA)
})

testar('senha com 12 símbolos e sem letra/número aparece como Fraca (o backend recusaria)', () => {
  assert.deepEqual(calcularForcaSenha('!!!!!!!!!!!!'), FRACA)
})

testar('senha acima do máximo de 72 caracteres aparece como Fraca (o backend recusaria)', () => {
  assert.deepEqual(calcularForcaSenha('Abc1' + 'a'.repeat(72)), FRACA)
})

testar('senha válida de 8 caracteres sem símbolo aparece como Fraca', () => {
  assert.deepEqual(calcularForcaSenha('Abc12345'), FRACA)
})

testar('senha válida de 12 caracteres sem símbolo aparece como Média', () => {
  assert.deepEqual(calcularForcaSenha('Abc123456789'), MEDIA)
})

testar('senha válida de 9 caracteres com símbolo aparece como Média', () => {
  assert.deepEqual(calcularForcaSenha('Abc12345!'), MEDIA)
})

testar('senha válida com 72 caracteres, letra, número e símbolo aparece como Forte', () => {
  assert.deepEqual(calcularForcaSenha('Abc1' + 'a'.repeat(67) + '!'), FORTE)
})

testar('senha válida de 13 caracteres com letra, número e símbolo aparece como Forte', () => {
  assert.deepEqual(calcularForcaSenha('Abc123456789!'), FORTE)
})

console.log(`\n${executados - falhas}/${executados} testes passaram`)
process.exit(falhas ? 1 : 0)
