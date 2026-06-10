import { useCallback, useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { coupleName, loveWheelPrizes } from '../../data/content.js'

const WHEEL_COLORS = [
  '#ff6b9d',
  '#ff8fab',
  '#ffb3c6',
  '#e84393',
  '#fd79a8',
  '#f368e0',
  '#ff5c8a',
  '#ffa8c5',
]

function getSpinTarget(currentRotation, winIndex, segmentCount) {
  const segmentAngle = 360 / segmentCount
  const segmentCenter = winIndex * segmentAngle + segmentAngle / 2
  const targetMod = (360 - segmentCenter + 360) % 360
  const currentMod = ((currentRotation % 360) + 360) % 360
  let delta = targetMod - currentMod
  if (delta <= 0) delta += 360
  const fullSpins = (5 + Math.floor(Math.random() * 2)) * 360
  return currentRotation + fullSpins + delta
}

function formatToday() {
  return new Date().toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default function LoveWheelSlide({ onWheelProgress }) {
  const [rotation, setRotation] = useState(0)
  const [spinning, setSpinning] = useState(false)
  const [wonPrize, setWonPrize] = useState(null)
  const segmentCount = loveWheelPrizes.length
  const segmentAngle = 360 / segmentCount

  const wheelGradient = useMemo(() => {
    const stops = loveWheelPrizes
      .map((_, i) => {
        const start = (i / segmentCount) * 100
        const end = ((i + 1) / segmentCount) * 100
        const color = WHEEL_COLORS[i % WHEEL_COLORS.length]
        return `${color} ${start}% ${end}%`
      })
      .join(', ')
    return `conic-gradient(from -90deg, ${stops})`
  }, [segmentCount])

  useEffect(() => {
    onWheelProgress?.({
      complete: Boolean(wonPrize),
      pct: wonPrize ? 100 : 0,
    })
  }, [wonPrize, onWheelProgress])

  const handleSpin = useCallback(() => {
    if (spinning || wonPrize) return

    const winIndex = Math.floor(Math.random() * segmentCount)
    const prize = loveWheelPrizes[winIndex]
    const target = getSpinTarget(rotation, winIndex, segmentCount)

    setSpinning(true)
    setRotation(target)

    window.setTimeout(() => {
      setWonPrize(prize)
      setSpinning(false)
    }, 4200)
  }, [rotation, segmentCount, spinning, wonPrize])

  return (
    <div className="story-slide story-slide-wheel">
      <motion.h2
        className="story-title"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Roleta da sorte do amor
      </motion.h2>
      <motion.p
        className="story-sub"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        Gire uma vez e ganhe um cupom simbólico para usar hoje 🎁
      </motion.p>

      <div
        className="love-wheel-shell"
        onClick={(e) => e.stopPropagation()}
        onPointerDown={(e) => e.stopPropagation()}
      >
        <div className="love-wheel-pointer" aria-hidden="true">
          ▼
        </div>

        <motion.div
          className="love-wheel-disc"
          animate={{ rotate: rotation }}
          transition={
            spinning
              ? { duration: 4.2, ease: [0.12, 0.8, 0.2, 1] }
              : { duration: 0 }
          }
        >
          <div className="love-wheel-bg" style={{ background: wheelGradient }} />
          {loveWheelPrizes.map((prize, i) => {
            const angle = i * segmentAngle + segmentAngle / 2
            return (
              <div
                key={prize.id}
                className="love-wheel-segment-label"
                style={{ transform: `rotate(${angle}deg)` }}
              >
                <span style={{ transform: `rotate(${-angle}deg)` }}>
                  <span className="love-wheel-segment-emoji">{prize.emoji}</span>
                  <span className="love-wheel-segment-text">{prize.shortLabel}</span>
                </span>
              </div>
            )
          })}
        </motion.div>

        <div className="love-wheel-hub" aria-hidden="true">
          💕
        </div>
      </div>

      {!wonPrize && (
        <motion.button
          type="button"
          className="btn btn-primary love-wheel-spin"
          whileHover={{ scale: spinning ? 1 : 1.04 }}
          whileTap={{ scale: spinning ? 1 : 0.96 }}
          disabled={spinning}
          onClick={handleSpin}
        >
          {spinning ? 'Girando...' : 'Girar a roleta 🎡'}
        </motion.button>
      )}

      <AnimatePresence>
        {wonPrize && (
          <motion.div
            className="love-wheel-coupon"
            initial={{ opacity: 0, y: 24, scale: 0.92, rotate: -2 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 220, damping: 18 }}
          >
            <div className="love-wheel-coupon-notch love-wheel-coupon-notch-left" />
            <div className="love-wheel-coupon-notch love-wheel-coupon-notch-right" />
            <p className="love-wheel-coupon-badge">Cupom do amor</p>
            <p className="love-wheel-coupon-emoji">{wonPrize.emoji}</p>
            <h3 className="love-wheel-coupon-title">{wonPrize.label}</h3>
            <p className="love-wheel-coupon-detail">{wonPrize.couponDetail}</p>
            <div className="love-wheel-coupon-meta">
              <span>Para: {coupleName}</span>
              <span>Válido em: {formatToday()}</span>
            </div>
            <p className="love-wheel-coupon-foot">
              Apresente este cupom quando quiser — eu cumpro com prazer 💌
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {wonPrize && (
        <motion.p
          className="love-wheel-done"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Guarde seu prêmio! Toque à direita para continuar →
        </motion.p>
      )}
    </div>
  )
}
