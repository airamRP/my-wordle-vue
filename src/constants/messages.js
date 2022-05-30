export const MESSAGES = {
  'SEND': 'Enviar palabra',
  'FAIL': 'La palabra no está en la lista',
  'ENOUGHT': 'No hay suficientes letras',
  'DEFEAT': (solution) =>
    `¡Has perdido! La palabra correcta era ${solution}`,
  'OK': () => {
    const result = [
      '¡Impresionante!', '¡Magnífico!',
      '¡Espléndido!', '¡Estupendo!', '¡Wow!'
    ]
    const random = Math.floor(Math.random() * result.length)
    return result[random]
  }
}