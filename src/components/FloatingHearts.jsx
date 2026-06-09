import { useMemo } from 'react'
import { motion } from 'framer-motion'

// Coracoes subindo suavemente ao fundo da tela.
const HEARTS = ['heart-pink', 'heart-red', 'heart-rose', 'heart-magenta']
const EMOJI = {
  'heart-pink': '\u{1F495}',
  'heart-red': '\u{1F496}',
  'heart-rose': '\u{1F497}',
  'heart-magenta': '\u{1F49E}',
}

export default function FloatingHearts() {
  const items = useMemo(
    () =>
      Array.from({ length: 14 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 16 + Math.random() * 22,
        duration: 8 + Math.random() * 8,
        delay: Math.random() * 8,
        emoji: EMOJI[HEARTS[i % HEARTS.length]],
      })),
    [],
  )

  return (
    <div className="floating-hearts" aria-hidden="true">
      {items.map((h) => (
        <motion.span
          key={h.id}
          style={{ left: `${h.left}%`, fontSize: h.size }}
          initial={{ y: '105vh', opacity: 0 }}
          animate={{ y: '-15vh', opacity: [0, 0.8, 0.8, 0] }}
          transition={{
            duration: h.duration,
            delay: h.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {h.emoji}
        </motion.span>
      ))}
    </div>
  )
}
