import { motion } from 'framer-motion'
import { useQuizStore } from '../store/quizStore.js'

export default function ProgressBar() {
  const currentIndex = useQuizStore((s) => s.currentIndex)
  const total = useQuizStore((s) => s.totalQuestions)
  const score = useQuizStore((s) => s.score)

  const progress = ((currentIndex + 1) / total) * 100

  return (
    <div className="progress">
      <div className="progress-top">
        <span>
          Pergunta {currentIndex + 1} de {total}
        </span>
        <span className="score-pill">💕 {score} acertos</span>
      </div>
      <div className="progress-track">
        <motion.div
          className="progress-fill"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}
