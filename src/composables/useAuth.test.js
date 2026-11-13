// Testes do contrato do composable useAuth.
// Rodar com: node src/composables/useAuth.test.js
//
// REGRESSÃO do bug "clearAuth is not a function": o composable definia
// clearAuth internamente mas não a expunha no retorno. O fluxo de redefinição
// de senha chama clearAuth() logo após o 200 do backend — o TypeError caía no
// catch genérico e exibia "Erro ao redefinir a senha." mesmo com a senha
// alterada com sucesso.

import assert from 'node:assert/strict'

// localStorage não existe em Node: stub mínimo ANTES de importar o módulo
const armazenamento = {}
globalThis.localStorage = {
  getItem: (chave) => (chave in armazenamento ? armazenamento[chave] : null),
  setItem: (chave, valor) => { armazenamento[chave] = String(valor) },
  removeItem: (chave) => { delete armazenamento[chave] },
}

const { useAuth } = await import('./useAuth.js')

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

testar('useAuth expõe clearAuth como função', () => {
  const auth = useAuth()
  assert.equal(typeof auth.clearAuth, 'function')
})

testar('clearAuth remove token/refreshToken do storage e zera o estado em memória', () => {
  const auth = useAuth()
  auth.setToken('jwt-de-teste', 'refresh-de-teste')
  assert.equal(auth.token.value, 'jwt-de-teste')
  assert.equal(armazenamento['@arreda:token'], 'jwt-de-teste')

  auth.clearAuth()

  assert.equal(auth.token.value, null)
  assert.equal(armazenamento['@arreda:token'], undefined)
  assert.equal(armazenamento['@arreda:refreshToken'], undefined)
})

console.log(`\n${executados - falhas}/${executados} testes passaram`)
process.exit(falhas ? 1 : 0)
