<template>
  <div class="container-wordle">
    <header-component />
    <board-component />
    <abc-component />
  </div>
</template>

<script>
import headerComponent from '@/components/header.vue'
import boardComponent from '@/components/board.vue'
import abcComponent from '@/components/abc.vue'

import useWordle from "@/composables/useWordle";

import { onMounted } from '@vue/runtime-core'

export default {
  name: 'wordle',
  components: {
    headerComponent,
    boardComponent,
    abcComponent,
  },

  setup() {
    const { newGame } = useWordle()

    onMounted(() => {
      newGame()
    })
  },
}
</script>

<style lang="scss" scoped>
.container-wordle {
  margin: 0 auto;
  width: 92%;
}

@media all and (min-width: 320px) {
  .container-wordle {
    width: 80%;
  }
}

@media all and (min-width: 768px) {
  .container-wordle {
    width: 60%;
  }
}

@media all and (min-width: 1200px) {
  .container-wordle {
    width: 50%;
  }
}
</style>