import { motion } from 'framer-motion'
import {
  coupleName,
  relationshipStart,
  formatRelationshipDate,
} from '../../data/content.js'
import { useRelationshipTime } from '../../hooks/useRelationshipTime.js'
import { pad2 } from '../../utils/relationshipTime.js'

function CounterUnit({ value, label }) {
  return (
    <motion.div
      className="story-counter-unit"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <span className="story-counter-value">{pad2(value)}</span>
      <span className="story-counter-label">{label}</span>
    </motion.div>
  )
}

export default function TimeTogetherSlide() {
  const time = useRelationshipTime(relationshipStart)
  const orbitsDisplay = time.orbits.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  return (
    <div className="story-slide story-slide-time">
      <motion.p
        className="story-kicker"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Desde {formatRelationshipDate(relationshipStart)} 💕
      </motion.p>

      <motion.h2
        className="story-title"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {coupleName}, estamos juntos há
      </motion.h2>

      <div className="story-counter-grid">
        <CounterUnit value={time.years} label="anos" />
        <CounterUnit value={time.months} label="meses" />
        <CounterUnit value={time.days} label="dias" />
        <CounterUnit value={time.hours} label="horas" />
        <CounterUnit value={time.minutes} label="min" />
        <CounterUnit value={time.seconds} label="seg" />
      </div>

      <motion.div
        className="story-orbit"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <div className="story-orbit-scene">
          <div className="story-orbit-ring" />
          <div className="story-orbit-path">
            <span className="story-earth">🌍</span>
          </div>
          <span className="story-sun">☀️</span>
        </div>
        <p className="story-orbit-text">
          A Terra já deu <strong>{orbitsDisplay}</strong> voltas ao redor do Sol
          <br />
          desde o nosso primeiro dia juntos
        </p>
      </motion.div>
    </div>
  )
}
