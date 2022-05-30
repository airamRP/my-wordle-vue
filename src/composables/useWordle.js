import { wordsData as words } from "@/data/wordle.js"
import { MESSAGES as INFO } from '@/constants/messages.js'
import { STYLES } from '@/constants/game.js'

import { ref } from 'vue'

const maxTries = ref(6)
const lengthWord = ref(5)
const boardLetters = ref([])
const rigthWord = ref('')
const modalInfo = ref('')

const keyboardStyle = ref({})

let currentRow = 0
let currentCol = 0

let endGameFlag = false

export default function () {

  const newGame = () => {
    endGameFlag = false
    currentCol = 0
    currentRow = 0
    initKeyboard()
    initLetters()
    styleNextLetter()
    getWord()
  }

  const initKeyboard = () => {
    const aux = [...Array(26)].map((_, index) => {
      return String.fromCharCode(index + 65)
    })
    aux.push('Ñ') // 'Ñ': 209
    aux.forEach(item => keyboardStyle.value[item] = STYLES.empty)
  }

  const initLetters = () => {
    boardLetters.value = Array.from({ length: maxTries.value }, () => {
      return Array.from({ length: lengthWord.value }, () => {
        return {
          letter: '',
          style: STYLES.empty
        }
      })
    })
  }

  // Random Guess Word
  const getWord = () => {
    const currentWords = words[lengthWord.value]
    const max = currentWords.length
    const randomWord = Math.floor(Math.random() * max)
    rigthWord.value = currentWords[randomWord].toUpperCase()
  }

  const updateLengthWord = (value) => {
    lengthWord.value = value
  }

  const updateMaxTries = (value) => {
    maxTries.value = value
  }

  const sendLetter = (letter) => {
    if (endGameFlag) {
      newGame()
      return
    }
    if (currentCol >= lengthWord.value) {
      showInfo(INFO.SEND)
      return
    }
    animationStyleLetter(letter, STYLES.pending, currentRow, currentCol)
    currentCol++
    styleNextLetter()
  }

  const back = () => {
    if (currentCol > 0) {
      boardLetters.value[currentRow][currentCol] = { style: STYLES.empty }
      currentCol--
      boardLetters.value[currentRow][currentCol].letter = ''
      styleNextLetter()
    }
  }

  const sendWord = () => {
    // Si se ha terminado el juego y se pulsa enviar (o cualquier tecla), empezar nuevo juego
    if (endGameFlag) {
      newGame()
      return
    }

    // Letras insuficientes
    if (currentCol < lengthWord.value) {
      showInfo(INFO.ENOUGHT)
      return
    }

    // Obtener la palabra del usuario
    const newWord = boardLetters.value[currentRow].map(item => {
      return item.letter
    }).join('')

    // Con más o todas las palabras del diccionario, descomentar para que
    // no se acepte como válida una palabra que no esté en la lista
    /*     if(!words[lengthWord.value].includes(newWord.toLowerCase())) {
          showInfo(INFO.FAIL)
          return
        } */

    // Palabra acertada. Fin juego
    if (newWord === rigthWord.value) {
      const aux = [...Array(lengthWord.value)].map(() => {
        return 0  // Marca las letras de la palabra como 'success'
      })
      animationSolution(aux, currentRow)
      showInfo()  // Modal
      endGameFlag = true
      return
    }

    // En otro caso. Analizar aciertos y fallos
    const rightW = [...rigthWord.value]
    const newW = [...newWord]

    const cW = {}
    const cG = {}

    rightW.forEach((letter, index) => {
      const lg = newW[index]
      cW[letter] = cW[letter] || 0

      if (!rightW.includes(lg)) {
        cW[letter] = (cW[letter] || 0) + 1
      } else {
        if (letter !== lg) {
          cG[lg] = (cG[lg] || 0) + 1
          cW[letter] = (cW[letter] || 0) + 1
        }
      }
    })

    // Determinar cuántos 'present' se muestran
    Object.keys(cG).map(item => cG[item] = Math.min(cG[item], cW[item]))

    // Dar estilo según aciertos
    const solution = []

    newW.forEach((letter, index) => {
      const lw = rigthWord.value[index]
      if (lw === letter) {
        updateStyleKeyBoard(letter, STYLES.success)
        solution[index] = STYLES.success
      } else {
        if (cG[letter] > 0) {
          updateStyleKeyBoard(letter, STYLES.present)
          solution[index] = STYLES.present
          cG[letter]--
        } else {
          updateStyleKeyBoard(letter, STYLES.error)
          solution[index] = STYLES.error
        }
      }
    })
    animationSolution(solution, currentRow)

    // Actualizar filas y columnas
    currentCol = 0
    currentRow++
    styleNextLetter()

    // Palabra no acertada. No hay más oportunidades. Fin del juego
    if (currentRow >= maxTries.value) {
      endGameFlag = true
      showInfo('', rigthWord.value)
    }
  }

  // Estilo de las letras del tablero
  const getStyleLetter = (row, col) => {
    const style = boardLetters.value[row][col]?.style
    const result = Object.keys(STYLES).find(item => STYLES[item] === style)
    return result
  }

  // Estilo de las letras del teclado
  const updateStyleKeyBoard = (letter, style) => {
    if (keyboardStyle.value[letter] > style) {
      keyboardStyle.value[letter] = style
    }
  }

  const getStyleKeyboard = (letter) => {
    return Object.keys(STYLES).find(item => STYLES[item] === keyboardStyle.value[letter])
  }

  // Establecer la información mostrada en el modal
  const showInfo = (text = '', word = '') => {
    setTimeout(() => {
      modalInfo.value = ''
    }, 2000)

    modalInfo.value = word ?
      INFO.DEFEAT(word) :
      text || INFO.OK()
  }

  const styleNextLetter = () => {
    if (currentCol < lengthWord.value && currentRow < maxTries.value) {
      setTimeout(()=> {
        boardLetters.value[currentRow][currentCol] = { style: STYLES.next }
      }, 300)
    }
  }

  const animationStyleLetter = (letter, style, row, col) => {
    setTimeout(() => {
      boardLetters.value[row][col] = { letter, style }
    }, 100)
    boardLetters.value[row][col] = { style: STYLES.transitionIn }
  }

  const animationSolution = (solution, row) => {
    solution.forEach((style, index) => {
      setTimeout(() => {
        boardLetters.value[row][index].style = style
      }, 200 * index)
    })
  }

  return {
    boardLetters,
    keyboardStyle,
    newGame,
    sendLetter,
    sendWord,
    back,
    getStyleLetter,
    getStyleKeyboard,
    modalInfo,
    updateLengthWord,
    updateMaxTries,
    lengthWord,
    maxTries
  }
}
