import { AnimatePresence, motion } from 'framer-motion'
import { useQuizStore } from '../store/quizStore.js'
import { questions } from '../data/questions.js'
import { resolveQuestionPhoto } from '../data/content.js'
import ProgressBar from './ProgressBar.jsx'

export default function QuestionCard() {
  const currentIndex = useQuizStore((s) => s.currentIndex)
  const selectedIndex = useQuizStore((s) => s.selectedIndex)
  const answer = useQuizStore((s) => s.answer)
  const next = useQuizStore((s) => s.next)
  const total = useQuizStore((s) => s.totalQuestions)

  const q = questions[currentIndex]
  const answered = selectedIndex !== null
  const isCorrect = answered && selectedIndex === q.correctIndex
  const isLast = currentIndex >= total - 1

  const optionClass = (i) => {
    if (!answered) return 'option'
    if (i === q.correctIndex) return 'option option-correct'
    if (i === selectedIndex) return 'option option-wrong'
    return 'option option-dim'
  }

  return (
    <div className="card question-card">
      <ProgressBar />

      <AnimatePresence mode="wait">
        <motion.h2
          key={q.id}
          className="question-text"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {q.question}
        </motion.h2>
      </AnimatePresence>

      <div className="options">
        {q.options.map((opt, i) => (
          <motion.button
            key={i}
            className={optionClass(i)}
            disabled={answered}
            onClick={() => answer(i)}
            whileHover={!answered ? { scale: 1.02 } : {}}
            whileTap={!answered ? { scale: 0.98 } : {}}
          >
            <span className="option-letter">{String.fromCharCode(65 + i)}</span>
            <span className="option-text">{opt}</span>
            {answered && i === q.correctIndex && <span className="mark">✓</span>}
            {answered && i === selectedIndex && i !== q.correctIndex && (
              <span className="mark">✗</span>
            )}
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {answered && (
          <motion.div
            className={`feedback ${isCorrect ? 'feedback-ok' : 'feedback-no'}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <p>{isCorrect ? q.successMessage : q.failMessage}</p>

            {isCorrect && (
              <motion.div
                className="memory reveal"
                initial={{ opacity: 0, scale: 0.94, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.18, duration: 0.45 }}
              >
                <div className="memory-photo">
                  <img src={resolveQuestionPhoto(q)} alt={q.question} />
                </div>
                <div className="memory-body">
                  <p className="memory-card">{q.card}</p>
                </div>
              </motion.div>
            )}

            <motion.button
              className="btn btn-primary"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={next}
            >
              {isLast ? 'Ver a carta final 💌' : 'Próxima 💗'}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
