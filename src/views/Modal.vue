<template>
  <Teleport to="body">
    <div v-if="isOpen" class="modal-overlay" @click="closeModal">
      <!-- @click.stop impede que o clique no conteúdo feche o modal -->
      <div class="modal-content" @click.stop>
        <header class="modal-header">
          <slot name="header">
            <h3>Título Padrão</h3>
          </slot>
          <button class="close-btn" @click="closeModal">X</button>
        </header>

        <main class="modal-body">
          <slot name="body">
            <p>Conteúdo padrão do modal.</p>
          </slot>
        </main>

        <footer class="modal-footer">
          <slot name="footer">
            <button class="action-btn " @click="closeModal">Fechar</button>
          </slot>
        </footer>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['update:isOpen', 'close'])

const closeModal = () => {
  emit('update:isOpen', false)
  emit('close')
}
</script>

<style scoped>
.modal-overlay {
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

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  min-width: 300px;
  max-width: 500px;
  width: 100%;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
}
</style>