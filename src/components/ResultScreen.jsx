import { motion } from 'framer-motion'
import { useQuizStore } from '../store/quizStore.js'
import { coupleName } from '../data/content.js'

function messageForScore(score, total) {
  const ratio = score / total
  if (ratio === 1)
    return {
      emoji: '👑',
      title: 'Perfeito!',
      text: `Você acertou TUDO, ${coupleName}! Ninguém conhece a nossa história melhor que você. Meu coração é todo seu. 💖`,
    }
  if (ratio >= 0.6)
    return {
      emoji: '💕',
      title: 'Quase tudo!',
      text: 'Você lembra de quase tudo da gente. Cada detalhe seu me faz amar você mais. 🥰',
    }
  if (ratio >= 0.3)
    return {
      emoji: '😊',
      title: 'No caminho certo!',
      text: 'Alguns escaparam, mas isso é só desculpa pra gente criar memórias novas juntos. 💞',
    }
  return {
    emoji: '😄',
    title: 'Tudo bem!',
    text: 'Não importa o placar - o que importa é que eu te escolho todos os dias. 💘',
  }
}

export default function ResultScreen() {
  const score = useQuizStore((s) => s.score)
  const total = useQuizStore((s) => s.totalQuestions)
  const goToSurprise = useQuizStore((s) => s.goToSurprise)
  const reset = useQuizStore((s) => s.reset)

  const msg = messageForScore(score, total)

  return (
    <div className="card result-card">
      <motion.div
        className="big-heart"
        initial={{ scale: 0 }}
        animate={{ scale: 1, rotate: [0, -8, 8, 0] }}
        transition={{ duration: 0.8 }}
      >
        {msg.emoji}
      </motion.div>

      <h1 className="title-script">{msg.title}</h1>

      <div className="score-big">
        {score} <span>/ {total}</span>
      </div>

      <p className="subtitle">{msg.text}</p>

      <motion.button
        className="btn btn-primary"
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        onClick={goToSurprise}
      >
        Ver a surpresa 🎁
      </motion.button>

      <button className="btn btn-ghost" onClick={reset}>
        Jogar de novo 🔁
      </button>
    </div>
  )
}
