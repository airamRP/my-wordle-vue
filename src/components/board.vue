<template>
  <div class="board">
    <div class="board-word" v-for="row in maxTries" :key="row">
      <template v-if="boardLetters[0]">
        <div class="board-word-letter" :class="getStyleLetter(row - 1, col - 1)" v-for="col in lengthWord" :key="col">
          {{ boardLetters[row - 1][col - 1].letter }}
        </div>
      </template>
    </div>
  </div>
  <transition name="modal">
    <modal-info v-if="modalInfo" @closeModal="modalInfo = ''">{{ modalInfo }}</modal-info>
  </transition>
</template>

<script>
import modalInfo from '@/components/modalInfo.vue'

import useWordle from "@/composables/useWordle";

export default {
  name: 'boardWordle',
  components: { modalInfo },
  setup() {
    const { maxTries, getStyleLetter, lengthWord, boardLetters, modalInfo } = useWordle()
    return {
      maxTries, getStyleLetter, lengthWord, boardLetters, modalInfo
    }
  }
}
</script>

<style lang="scss" scoped>
.board {
  // border: 1px solid red;
  margin-bottom: 2rem;
  font-size: 1.2rem;
  font-weight: bolder;

  &-word {
    // border: 1px solid green;
    display: flex;
    justify-content: center;
    gap: .2rem;
    margin-bottom: .2rem;
    &-letter {
      flex: 0 1 50px;
      border: 1px solid rgb(200, 200, 200);
      border-radius: 3px;
      width: 50px;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}

.empty {
  background-color: rgb(250, 250, 255);
  color: #000;
}

.pending {
  transition: border .5s;
  background-color: #fff;
  border: 1px solid #000;
  box-shadow: none;
  color: #000;
}

.error {
  background-color: rgb(100, 100, 100);
  color: #fff;
}

.present {
  background-color: rgb(196, 171, 64);
  color: #fff;
}

.success {
  background-color: rgb(112, 202, 124);
  color: #fff;
}

.transitionIn {
  transition: all .5s;
  border: 5px solid #000;
}

.next {
  background-color: rgb(250, 250, 255);
  border: 1px solid #000;
}
</style>