import { motion } from 'framer-motion'
import { useQuizStore } from '../../store/quizStore.js'
import { coupleName, quizStoryTitle } from '../../data/content.js'

export default function QuizIntroSlide() {
  const start = useQuizStore((s) => s.start)
  const total = useQuizStore((s) => s.totalQuestions)

  return (
    <div className="story-slide story-slide-quiz">
      <motion.div
        className="story-quiz-heart"
        animate={{ scale: [1, 1.14, 1] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
      >
        💖
      </motion.div>

      <motion.h2
        className="story-title"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {quizStoryTitle}
      </motion.h2>

      <motion.p
        className="story-sub"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Olá, <strong>{coupleName}</strong>! Será que você lembra de tudo sobre a gente?
      </motion.p>

      <motion.p
        className="story-hint"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35 }}
      >
        São {total} perguntas. A cada acerto, você desbloqueia uma surpresa no final. 💕
      </motion.p>

      <motion.button
        className="btn btn-primary story-quiz-btn"
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        onClick={(e) => {
          e.stopPropagation()
          start()
        }}
      >
        Começar 💘
      </motion.button>

      <p className="story-footnote">A música começa agora 🎶</p>
    </div>
  )
}
