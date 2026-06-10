import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { coupleName, valentinesDay } from '../../data/content.js'

function pad(n) {
  return String(n).padStart(2, '0')
}

function useCountdown(targetDate) {
  const [parts, setParts] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, done: false })

  useEffect(() => {
    if (!targetDate) return undefined

    const tick = () => {
      const diff = targetDate.getTime() - Date.now()
      if (diff <= 0) {
        setParts({ days: 0, hours: 0, minutes: 0, seconds: 0, done: true })
        return
      }
      const days = Math.floor(diff / 86400000)
      const hours = Math.floor((diff % 86400000) / 3600000)
      const minutes = Math.floor((diff % 3600000) / 60000)
      const seconds = Math.floor((diff % 60000) / 1000)
      setParts({ days, hours, minutes, seconds, done: false })
    }

    tick()
    const id = window.setInterval(tick, 1000)
    return () => window.clearInterval(id)
  }, [targetDate])

  return parts
}

export default function ValentinesCountdown({ targetDate }) {
  const { days, hours, minutes, seconds, done } = useCountdown(targetDate)

  const [y, m, d] = valentinesDay.split('-').map(Number)
  const displayDate = new Date(y, m - 1, d).toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <div className="story-slide story-slide-countdown">
      <motion.div
        className="countdown-heart"
        animate={{ scale: [1, 1.12, 1] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        💝
      </motion.div>

      <motion.h2
        className="story-title"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Quase lá, {coupleName}
      </motion.h2>

      <motion.p
        className="story-sub"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
      >
        Sua surpresa começa no Dia dos Namorados — {displayDate}
      </motion.p>

      {!done && targetDate && (
        <motion.div
          className="countdown-grid"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <div className="countdown-unit">
            <strong>{pad(days)}</strong>
            <span>dias</span>
          </div>
          <div className="countdown-unit">
            <strong>{pad(hours)}</strong>
            <span>horas</span>
          </div>
          <div className="countdown-unit">
            <strong>{pad(minutes)}</strong>
            <span>min</span>
          </div>
          <div className="countdown-unit">
            <strong>{pad(seconds)}</strong>
            <span>seg</span>
          </div>
        </motion.div>
      )}

      <motion.p
        className="countdown-foot"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Presentes especiais serão liberados ao longo do dia. Volte em breve 💕
      </motion.p>
    </div>
  )
}

export function LockedStorySlide({ title, unlockLabel, unlockAt }) {
  const { days, hours, minutes, seconds, done } = useCountdown(
    unlockAt ? new Date(unlockAt) : null,
  )

  return (
    <div className="story-slide story-slide-locked">
      <motion.div
        className="locked-icon"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        🔒
      </motion.div>

      <motion.h2
        className="story-title"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {title}
      </motion.h2>

      <motion.p
        className="story-sub"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.12 }}
      >
        Este presente ainda não liberou
      </motion.p>

      {unlockLabel && (
        <motion.p
          className="locked-schedule"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Libera em: <strong>{unlockLabel}</strong>
        </motion.p>
      )}

      {!done && unlockAt && (
        <motion.div
          className="countdown-grid countdown-grid-compact"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.28 }}
        >
          <div className="countdown-unit">
            <strong>{pad(days)}</strong>
            <span>d</span>
          </div>
          <div className="countdown-unit">
            <strong>{pad(hours)}</strong>
            <span>h</span>
          </div>
          <div className="countdown-unit">
            <strong>{pad(minutes)}</strong>
            <span>m</span>
          </div>
          <div className="countdown-unit">
            <strong>{pad(seconds)}</strong>
            <span>s</span>
          </div>
        </motion.div>
      )}

      <motion.p
        className="locked-foot"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35 }}
      >
        Volte quando liberar — ou aguarde a surpresa chegar sozinha ✨
      </motion.p>
    </div>
  )
}
