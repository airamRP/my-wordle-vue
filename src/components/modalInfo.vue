<template>
  <div class="modal" @click="closeModal" ref="modal">
    <div class="modal-body">
      <slot>
        <p>Información</p>
      </slot>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'ModalInfo',
  emits: ['closeModal'],

  setup(_, { emit }) {
    const modal = ref(null)

    const closeModal = (event) => {
      // Cerrar modal al hacer click en cualquier lugar
      // de la ventana excepto en el body del modal
      if (event.target === modal.value) {
        emit('closeModal')
      }
    }
    return {
      closeModal, modal
    }
  },
}
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  color: #ddd;
}

.modal-body {
  margin: 50px auto;
  padding: 1rem 1rem;
  border-radius: 10px;
  background-color: #111;
  box-shadow: 1px 1px 1px #555;

  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 2rem;
}

//  Sytles applied to element with transition = "modal"
.modal-enter-from {
  opacity: 0;
  transform: translateY(-60px);
}

.modal-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.modal-enter-active {
  transition: all 0.3s ease;
}

.modal-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.modal-leave-to {
  opacity: 0;
  transform: translateY(-60px);
}

.modal-leave-active {
  transition: all 0.3s ease;
}
</style>