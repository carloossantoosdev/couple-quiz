import { useMemo } from 'react'
import { motion } from 'framer-motion'

// Confete/coracoes caindo ao revelar a surpresa.
const COLORS = ['#ff5c8a', '#ff8fb1', '#ffd1dc', '#ff6f9c', '#ffe066', '#fff']

export default function Confetti() {
  const pieces = useMemo(
    () =>
      Array.from({ length: 60 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.8,
        duration: 2.2 + Math.random() * 1.8,
        rotate: Math.random() * 360,
        color: COLORS[i % COLORS.length],
        size: 6 + Math.random() * 8,
      })),
    [],
  )

  return (
    <div className="confetti" aria-hidden="true">
      {pieces.map((p) => (
        <motion.span
          key={p.id}
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            background: p.color,
          }}
          initial={{ y: '-10vh', opacity: 1, rotate: 0 }}
          animate={{ y: '110vh', opacity: [1, 1, 0], rotate: p.rotate }}
          transition={{ duration: p.duration, delay: p.delay, ease: 'easeIn' }}
        />
      ))}
    </div>
  )
}
