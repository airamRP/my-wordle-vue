<template>
  <div class="abc">
    <div class="abc-row">
      <button v-for="letter in abc[0].split('')" :key="letter" @click="sendLetter(letter)"
        :class="getStyleKeyboard(letter)">
        {{ letter }}
      </button>
    </div>
    <div class="abc-row">
      <button v-for="letter in abc[1].split('')" :key="letter" @click="sendLetter(letter)"
        :class="getStyleKeyboard(letter)">
        {{ letter }}
      </button>
    </div>
    <div class="abc-row">
      <button title="Enviar palabra" class="ok" @click="sendWord">&#x2714;</button>
      <button v-for="letter in abc[2].split('')" :key="letter" @click="sendLetter(letter)"
        :class="getStyleKeyboard(letter)">
        {{ letter }}
      </button>
      <button title="Eliminar última letra" class="back" @click="back">&#x21e6;</button>
    </div>
  </div>
</template>

<script>
import useWordle from "@/composables/useWordle";
import { useKey } from '@/composables/useKey.js'
import { watchEffect } from '@vue/runtime-core';

export default {
  name: 'abcWordle',

  setup() {
    const abc = ['QWERTYUIOP', 'ASDFGHJKLÑ', 'ZXCVBNM']

    const { key } = useKey()
    const { sendLetter, back, sendWord, getStyleKeyboard, keyboardStyle } = useWordle()

    // Control entrada por teclado
    watchEffect(() => {
      switch (key.value) {
        case '':
          break
        case 'enter':
          sendWord()
          break
        case 'backspace':
          back()
          break
        default:
          sendLetter(key.value.toUpperCase())
      }
      key.value = ''
    })

    return {
      abc, sendLetter, back, sendWord, getStyleKeyboard, keyboardStyle,
      key
    }
  }
}
</script>

<style lang="scss" scoped>
.abc {
  display: flex;
  flex-direction: column;
  gap: .2rem;

  &-row {
    display: flex;
    gap: .2rem;

    &>* {
      flex: 1 1 50px;
      font-size: 1.2rem;
      padding: .4rem .2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid rgb(100, 100, 100);
      border-radius: 3px;
      background-color: rgb(200, 200, 200);
      transition: all ease .5s;
      cursor: pointer;

      &:hover {
        background-color: rgb(150, 150, 150);
        transition: all ease .5s;
      }
    }

    & .back,
    & .ok {
      background-color: rgb(160, 160, 160);
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
</style>