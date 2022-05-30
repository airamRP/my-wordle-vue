<template>
  <div class="home">
    <wordle />
  </div>
</template>

<script>
// @ is an alias to /src
import Wordle from '@/components/wordle.vue'

export default {
  name: 'WordleView',
  components: {
    Wordle
  }
}
</script>
