import { motion } from 'framer-motion'
import { useQuizStore } from '../store/quizStore.js'
import { coupleName, appTitle } from '../data/content.js'

export default function StartScreen() {
  const start = useQuizStore((s) => s.start)
  const total = useQuizStore((s) => s.totalQuestions)

  return (
    <div className="card start-card">
      <motion.div
        className="big-heart"
        animate={{ scale: [1, 1.12, 1] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
      >
        💖
      </motion.div>

      <h1 className="title-script">{appTitle}</h1>
      <p className="subtitle">
        Olá, <strong>{coupleName}</strong>! Será que você lembra de tudo sobre a
        gente?
      </p>
      <p className="hint">
        São {total} perguntas. A cada acerto, você desbloqueia uma surpresa no
        final. 💕
      </p>

      <motion.button
        className="btn btn-primary"
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        onClick={start}
      >
        Começar 💘
      </motion.button>

      <p className="footnote">A música começa quando você clicar. 🎶</p>
    </div>
  )
}
