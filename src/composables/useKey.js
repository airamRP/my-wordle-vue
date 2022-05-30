import { useEventListener } from './useEvent'
import { ref } from 'vue'
export function useKey() {

  const key = ref('')

  const update = (event) => {
    const availableKeys = 'a b c d e f g h i j k l m n ñ o p q r s t u v w x y z enter backspace'.split(' ')    
    const keyAux = event.key.toLowerCase()
    if (availableKeys.includes(keyAux)) {
      key.value = keyAux
    } else {
      key.value = ''
    }
  }

  useEventListener('keyup', window, update)

  return {
    key
  }
}