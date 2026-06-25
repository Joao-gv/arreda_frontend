<script setup>
import { useToast } from '../composables/useToast.js'
const { exibir, mensagem, tipo } = useToast()
</script>

<template>
  <div v-if="exibir" class="toast" @click="exibir = false">
    <div :class="`alert alert-${tipo}`">
      <span class="text-lg font-medium mb-4">{{ mensagem }}</span>
    </div>
  </div>
</template>

<style scoped>
.toast{
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.alert-error {
  background-color: #ff7474!important;
  color: #ffffff!important;
  padding: 20px;
  border-radius: 8px;
  min-width: 300px;
  max-width: 500px;
  width: 100%;
}

.alert-success {
  background-color: #19e7a9!important;
  color: #ffffff!important;
  padding: 20px;
  border-radius: 8px;
  min-width: 300px;
  max-width: 500px;
  width: 100%;
}

.alert{
  background-color: #ffffff;
  color: #131212;
  padding: 20px;
  border-radius: 8px;
  min-width: 300px;
  max-width: 500px;
  width: 100%;
}

</style>