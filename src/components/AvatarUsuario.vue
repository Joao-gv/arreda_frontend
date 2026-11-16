<template>
  <span
    class="inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-arreda-light font-bold text-arreda-dark"
    :style="{ width: `${size}px`, height: `${size}px`, fontSize: `${Math.max(12, size * 0.36)}px` }"
    role="img"
    :aria-label="`Avatar de ${nome || 'usuário'}`"
  >
    <img
      v-if="fotoUrl && !erroImagem"
      :src="fotoUrl"
      alt=""
      class="h-full w-full object-cover"
      @error="erroImagem = true"
    />
    <span v-else aria-hidden="true">{{ iniciais }}</span>
  </span>
</template>

<script setup>
import { computed, ref, watch } from 'vue'

const props = defineProps({
  nome: { type: String, default: '' },
  fotoUrl: { type: String, default: null },
  size: { type: Number, default: 40 }
})

const erroImagem = ref(false)

const iniciais = computed(() => {
  const partes = (props.nome || '').trim().split(/\s+/).filter(Boolean)
  if (!partes.length) return '?'
  return partes.length === 1
    ? partes[0].slice(0, 2).toLocaleUpperCase('pt-BR')
    : `${partes[0][0]}${partes[partes.length - 1][0]}`.toLocaleUpperCase('pt-BR')
})

watch(() => props.fotoUrl, () => {
  erroImagem.value = false
})
</script>
