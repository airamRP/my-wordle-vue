import { onMounted, onUnmounted } from "vue"

export function useEventListener (event, target, callback) {
  onMounted(() => target.addEventListener(event, callback))
  onUnmounted(() => window.removeEventListener(event, callback))
}