import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { heartHuntItems } from '../../data/content.js'

export default function HeartHuntSlide({ onHuntProgress }) {
  const [found, setFound] = useState(() => new Set())
  const [activeMessage, setActiveMessage] = useState(null)
  const total = heartHuntItems.length

  const handleFind = useCallback((item) => {
    setFound((prev) => {
      if (prev.has(item.id)) return prev
      const next = new Set(prev)
      next.add(item.id)
      return next
    })
    setActiveMessage(item.message)
  }, [])

  useEffect(() => {
    const count = found.size
    onHuntProgress?.({
      count,
      total,
      complete: count >= total,
      pct: total ? (count / total) * 100 : 100,
    })
  }, [found, total, onHuntProgress])

  return (
    <div className="story-slide story-slide-hunt">
      <motion.h2
        className="story-title"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Caça aos corações
      </motion.h2>
      <motion.p
        className="story-sub"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.12 }}
      >
        Encontre os corações escondidos e revele cada mensagem 💕
      </motion.p>

      <div className="heart-hunt-progress">
        <span>
          {found.size} de {total} corações encontrados
        </span>
        <div className="heart-hunt-progress-bar">
          <div
            className="heart-hunt-progress-fill"
            style={{ width: `${total ? (found.size / total) * 100 : 0}%` }}
          />
        </div>
      </div>

      <div
        className="heart-hunt-board"
        onClick={(e) => e.stopPropagation()}
        onPointerDown={(e) => e.stopPropagation()}
      >
        {heartHuntItems.map((item, i) => {
          const isFound = found.has(item.id)
          if (isFound) return null

          return (
            <motion.button
              key={item.id}
              type="button"
              className="heart-hunt-heart"
              style={{ left: `${item.x}%`, top: `${item.y}%` }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + i * 0.06, type: 'spring', stiffness: 260 }}
              whileTap={{ scale: 1.25 }}
              onClick={() => handleFind(item)}
              aria-label="Coração escondido"
            >
              💗
            </motion.button>
          )
        })}
      </div>

      <AnimatePresence mode="wait">
        {activeMessage && (
          <motion.p
            key={activeMessage}
            className="heart-hunt-message"
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.35 }}
          >
            {activeMessage}
          </motion.p>
        )}
      </AnimatePresence>

      {found.size >= total && (
        <motion.p
          className="heart-hunt-done"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Você encontrou todos! Toque fora do jogo à direita para continuar →
        </motion.p>
      )}
    </div>
  )
}
