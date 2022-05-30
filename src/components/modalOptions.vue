<template>
  <transition name="modal">
    <div v-if="show" class="modal" @click="clickModal" ref="modal">
      <div class="modal-container">

        <div class="modal-header">
          <h4>Ajustes</h4>
          <span @click="closeModal">&times;</span>
        </div>

        <div class="modal-body">
          <div>
            <label for="triesModal">Intentos</label>
            <input type="range" min="3" max="8" v-model.number="triesModal" id="triesModal">
            <span @click="closeModal">{{ triesModal }}</span>
          </div>
          <div>
            <label for="lengthWordModal">Letras</label>
            <input type="range" min="5" max="7" v-model.number="lengthWordModal" id="lengthWordModal">
            <span>{{ lengthWordModal }}</span>
          </div>
        </div>

      </div>
    </div>
  </transition>
</template>

<script>
import useWordle from "@/composables/useWordle";

import { ref } from 'vue'

export default {
  name: 'ModalInfo',
  props: ['show'],
  emits: ['closeModal'],

  setup(_, { emit }) {
    const { newGame, maxTries, lengthWord } = useWordle()

    const modal = ref(null)
    const triesModal = ref(maxTries.value)
    const lengthWordModal = ref(lengthWord.value)

    const closeModal = () => {
      maxTries.value = triesModal.value
      lengthWord.value = lengthWordModal.value
      newGame()
      emit('closeModal')
    }

    const clickModal = (event) => {
      // Cerrar modal al hacer click en cualquier lugar
      // de la ventana excepto en el body del modal
      if (event.target === modal.value) {
        closeModal()
      }
    }
    return {
      triesModal, lengthWordModal,
      clickModal,
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
  color: #333;

  // overflow: auto;
  // background-color: #f5f5f5;
  // background-color: rgb(0,0,0);
  background-color: rgba(0, 0, 0, .09);
}

.modal-container {
  margin: 50px auto;
  // padding: 1rem 1rem;

  color: #d3d3d3;
  background-color: #111;
  border-radius: 10px;
  box-shadow: 1px 1px 1px #555;
  width: fit-content;
}

.modal-header {
  /* margin: 50px auto; */
  // border: 1px solid green;
  padding: 0.5rem 1rem;

  background-color: rgba(100, 100, 100, .2);
  border-bottom: 1px solid #535353;
  display: flex;
  align-items: baseline;

  & h4 {
    flex: 1;
    justify-self: flex-start;
    align-self: flex-start;
    // border: 1px solid orange;
  }

  & span {
    cursor: pointer;
  }
}

.modal-body {
  // border: 1px solid blue;
  font-size: .8rem;
  padding: 1rem 1rem;
  display: flex;
  flex-direction: column;
  row-gap: 1rem;

  &>* {
    display: grid;
    grid-template-columns: auto 1fr 20px;
    column-gap: 1rem;
  }
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

/* 
.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}



.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
} */
</style>