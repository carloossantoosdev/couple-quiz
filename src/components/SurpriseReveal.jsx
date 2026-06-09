import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useQuizStore } from '../store/quizStore.js'
import { questions } from '../data/questions.js'
import {
  letter,
  signature,
  letterVideo,
  letterVideoCaption,
  resolveQuestionPhoto,
} from '../data/content.js'
import Confetti from './Confetti.jsx'

export default function SurpriseReveal() {
  const answers = useQuizStore((s) => s.answers)
  const total = useQuizStore((s) => s.totalQuestions)
  const reset = useQuizStore((s) => s.reset)

  const [showLetter, setShowLetter] = useState(false)
  const [celebrate, setCelebrate] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setCelebrate(false), 4000)
    return () => clearTimeout(t)
  }, [])

  // Cada pergunta acertada revela a foto + carta daquela pergunta.
  const items = questions.map((q, i) => ({
    q,
    unlocked: answers[i] === q.correctIndex,
  }))
  const unlockedCount = items.filter((it) => it.unlocked).length
  const allUnlocked = unlockedCount === total

  return (
    <div className="card surprise-card">
      {celebrate && <Confetti />}

      <h1 className="title-script">As nossas lembranças 🎁</h1>
      <p className="subtitle">
        Você revelou <strong>{unlockedCount}</strong> de {total} lembranças
        {allUnlocked ? ' - todas! 💖' : ' com seus acertos. 💕'}
      </p>

      <div className="memories">
        {items.map(({ q, unlocked }, i) => (
          <motion.div
            key={q.id}
            className={`memory ${unlocked ? '' : 'memory-locked'}`}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.12 }}
          >
            {unlocked ? (
              <>
                <div className="memory-photo">
                  <img src={resolveQuestionPhoto(q)} alt={q.question} />
                </div>
                <div className="memory-body">
                  <h3 className="memory-title">{q.question}</h3>
                  <p className="memory-card">{q.card}</p>
                </div>
              </>
            ) : (
              <div className="memory-locked-inner">
                <span className="lock">🔒</span>
                <small>
                  Essa lembrança ficou guardada... acerte essa pergunta para
                  revelar 💕
                </small>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {!showLetter ? (
        <motion.button
          className="btn btn-primary"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => setShowLetter(true)}
        >
          Abrir a carta final 💌
        </motion.button>
      ) : (
        <motion.div
          className="letter"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="letter-text">{letter}</p>

          {letterVideo && (
            <>
              <div className="letter-video">
                <video controls playsInline preload="metadata" src={letterVideo}>
                  Seu navegador não suporta vídeo.
                </video>
              </div>
              {letterVideoCaption && (
                <p className="letter-video-caption">{letterVideoCaption}</p>
              )}
            </>
          )}

          <p className="letter-sign">{signature}</p>
        </motion.div>
      )}

      <button className="btn btn-ghost" onClick={reset}>
        Voltar ao início 🔁
      </button>
    </div>
  )
}
