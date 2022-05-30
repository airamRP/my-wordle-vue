<template>
  <div class="header">
    <button title="Options" @click="showModalOptions = true">&#x1f7bf;</button>
    <h4>Wordle-Sim</h4>
    <button title="New Game" @click="newGame">&#x2b6f;</button>
  </div>

  <Teleport to="#app">
    <modal-options @closeModal="showModalOptions = false" :show='showModalOptions' />
  </Teleport>
</template>

<script>
import modalOptions from '@/components/modalOptions.vue'

import useWordle from "@/composables/useWordle";

import { ref } from 'vue'

export default {
  name: 'boardWordle',
  components: { modalOptions },
  setup() {
    const showModalOptions = ref(false)

    const { newGame } = useWordle()
    
    return {
      showModalOptions,
      newGame
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  // border: 1px solid red;
  margin: 0 auto;
  padding: 2rem 0 1.5rem 0;
  display: grid;
  grid-template-columns: auto 1fr auto;
  column-gap: 1rem;
  align-items: center;

  & h4 {
    flex: 1;
  }

  & button {
    font-size: 1.5rem;
    padding: 0;
    box-shadow: none;
    border: none;
    background-color: transparent;
    cursor: pointer;
  }
}
</style>