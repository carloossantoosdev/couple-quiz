import { create } from 'zustand'
import { questions } from '../data/questions.js'

// Estado e logica do jogo.
// status: 'stories' | 'start' | 'playing' | 'result' | 'surprise'
export const useQuizStore = create((set, get) => ({
  status: 'stories',
  currentIndex: 0,
  score: 0,
  // answers[i] = indice escolhido na pergunta i (ou null se nao respondida)
  answers: Array(questions.length).fill(null),
  // indice selecionado para a pergunta atual (para mostrar feedback antes do "Proxima")
  selectedIndex: null,
  musicOn: false,

  totalQuestions: questions.length,

  start: () =>
    set({
      status: 'playing',
      currentIndex: 0,
      score: 0,
      answers: Array(questions.length).fill(null),
      selectedIndex: null,
      musicOn: true,
    }),

  answer: (optionIndex) => {
    const { selectedIndex, currentIndex, answers, score } = get()
    // Evita responder duas vezes a mesma pergunta
    if (selectedIndex !== null) return

    const question = questions[currentIndex]
    const isCorrect = optionIndex === question.correctIndex
    const newAnswers = [...answers]
    newAnswers[currentIndex] = optionIndex

    set({
      selectedIndex: optionIndex,
      answers: newAnswers,
      score: isCorrect ? score + 1 : score,
    })
  },

  next: () => {
    const { currentIndex } = get()
    const isLast = currentIndex >= questions.length - 1
    if (isLast) {
      set({ status: 'result', selectedIndex: null })
    } else {
      set({ currentIndex: currentIndex + 1, selectedIndex: null })
    }
  },

  goToSurprise: () => set({ status: 'surprise' }),

  reset: () =>
    set({
      status: 'stories',
      currentIndex: 0,
      score: 0,
      answers: Array(questions.length).fill(null),
      selectedIndex: null,
    }),

  toggleMusic: () => set((s) => ({ musicOn: !s.musicOn })),
  setMusic: (on) => set({ musicOn: on }),
}))
