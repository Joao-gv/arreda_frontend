import { ref } from 'vue'

const exibir = ref(false)
const mensagem = ref('')
const tipo = ref('success') // 'success' | 'error' | 'warning' | 'info'

export function useToast() {
  const dispararToast = (msg, tipoAlerta = 'success') => {
    mensagem.value = msg
    tipo.value = tipoAlerta
    exibir.value = true
    
    // Some sozinho após 4 segundos
    setTimeout(() => {
      exibir.value = false
    }, 4000)
  }

  return {
    exibir,
    mensagem,
    tipo,
    dispararToast
  }
}