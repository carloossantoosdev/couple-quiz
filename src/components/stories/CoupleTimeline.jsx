import { motion } from 'framer-motion'
import {
  timeline,
  relationshipStart,
  formatRelationshipDate,
  resolveTimelinePhoto,
} from '../../data/content.js'

function TimelineCard({ entry }) {
  return (
    <article className="couple-timeline__card">
      {entry.title && (
        <h3 className="couple-timeline__card-title">{entry.title}</h3>
      )}
      <div className="couple-timeline__photo">
        <img
          src={resolveTimelinePhoto(entry)}
          alt={entry.title || `Nossa história em ${entry.year}`}
        />
      </div>
      <p className="couple-timeline__quote">{entry.quote}</p>
    </article>
  )
}

export default function CoupleTimeline() {
  const lastYear = timeline[timeline.length - 1]?.year

  return (
    <div className="couple-timeline">
      <div className="couple-timeline__line" aria-hidden="true" />

      <motion.header
        className="couple-timeline__milestone couple-timeline__milestone--start"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      >
        <div className="couple-timeline__node couple-timeline__node--start">
          <span className="couple-timeline__heart">💕</span>
        </div>
        <div className="couple-timeline__milestone-body">
          <span className="couple-timeline__milestone-label">Começo</span>
          <strong className="couple-timeline__milestone-date">
            {formatRelationshipDate(relationshipStart)}
          </strong>
          <p className="couple-timeline__milestone-note">O dia em que tudo começou</p>
        </div>
      </motion.header>

      <ol className="couple-timeline__list">
        {timeline.map((entry, i) => {
          const isRight = i % 2 === 0

          return (
            <motion.li
              key={entry.id ?? `${entry.year}-${i}`}
              className={`couple-timeline__item ${isRight ? 'couple-timeline__item--right' : 'couple-timeline__item--left'}`}
              initial={{ opacity: 0, x: isRight ? 28 : -28 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.08 + i * 0.1, duration: 0.5, ease: 'easeOut' }}
            >
              <div className="couple-timeline__col couple-timeline__col--left">
                {!isRight && <TimelineCard entry={entry} />}
              </div>

              <div className="couple-timeline__col couple-timeline__col--center">
                <span className="couple-timeline__year">{entry.year}</span>
                <span className="couple-timeline__node" />
              </div>

              <div className="couple-timeline__col couple-timeline__col--right">
                {isRight && <TimelineCard entry={entry} />}
              </div>
            </motion.li>
          )
        })}
      </ol>

      <motion.footer
        className="couple-timeline__milestone couple-timeline__milestone--end"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 + timeline.length * 0.1, duration: 0.45 }}
      >
        <div className="couple-timeline__node couple-timeline__node--end">
          <span className="couple-timeline__pulse" />
        </div>
        <div className="couple-timeline__milestone-body">
          <span className="couple-timeline__milestone-label">Agora</span>
          <strong className="couple-timeline__milestone-date">
            {lastYear ? `${lastYear} → ∞` : 'Hoje'}
          </strong>
          <p className="couple-timeline__milestone-note">E a história continua...</p>
        </div>
      </motion.footer>
    </div>
  )
}
