import { useCallback, useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useStoryUnlocks } from '../../hooks/useStoryUnlocks.js'
import TimeTogetherSlide from './TimeTogetherSlide.jsx'
import TimelineSlide from './TimelineSlide.jsx'
import TravelMapSlide from './TravelMapSlide.jsx'
import HeartHuntSlide from './HeartHuntSlide.jsx'
import LoveWheelSlide from './LoveWheelSlide.jsx'
import QuizIntroSlide from './QuizIntroSlide.jsx'
import ValentinesCountdown, { LockedStorySlide } from './LockedStorySlide.jsx'

const SLIDES = [
  { id: 'time', title: 'Tempo juntos', Component: TimeTogetherSlide, duration: 18000 },
  { id: 'timeline', title: 'Timeline', Component: TimelineSlide, duration: null },
  { id: 'map', title: 'Mapa', Component: TravelMapSlide, duration: null },
  { id: 'hearts', title: 'Caça aos corações', Component: HeartHuntSlide, duration: null },
  { id: 'wheel', title: 'Roleta da sorte', Component: LoveWheelSlide, duration: null },
  { id: 'quiz', title: 'Quiz do Casal', Component: QuizIntroSlide, duration: null },
]

const SLIDE_IDS = SLIDES.map((s) => s.id)
const SWIPE_THRESHOLD = 60

const BLOCK_NAV_SELECTORS = [
  '.travel-map-shell',
  '.travel-map',
  '.leaflet-container',
  '.leaflet-pane',
  '.leaflet-popup',
  '.leaflet-control',
  '.heart-hunt-board',
  '.heart-hunt-heart',
  '.love-wheel-shell',
  '.love-wheel-disc',
  '.love-wheel-spin',
  '.love-wheel-coupon',
].join(', ')

export default function StoriesViewer() {
  const {
    loading: unlockLoading,
    anyUnlocked,
    firstUnlockAt,
    isStoryUnlocked,
    getUnlockAt,
    getUnlockLabel,
    firstUnlockedIndex,
  } = useStoryUnlocks()

  const [index, setIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [paused, setPaused] = useState(false)
  const [hasInitializedIndex, setHasInitializedIndex] = useState(false)
  const [timelineScroll, setTimelineScroll] = useState({ pct: 0, atBottom: false })
  const [mapProgress, setMapProgress] = useState({
    count: 0,
    total: 0,
    complete: false,
    pct: 0,
  })
  const [huntProgress, setHuntProgress] = useState({
    count: 0,
    total: 0,
    complete: false,
    pct: 0,
  })
  const [wheelProgress, setWheelProgress] = useState({
    complete: false,
    pct: 0,
  })

  const slide = SLIDES[index]
  const isLast = index >= SLIDES.length - 1
  const isTimeline = slide.id === 'timeline'
  const isMap = slide.id === 'map'
  const isHearts = slide.id === 'hearts'
  const isWheel = slide.id === 'wheel'
  const isInteractive = isMap || isHearts || isWheel
  const currentUnlocked = isStoryUnlocked(slide.id)

  const unlockedSlideIds = useMemo(
    () => SLIDE_IDS.filter((id) => isStoryUnlocked(id)),
    [isStoryUnlocked],
  )

  const goNext = useCallback(() => {
    if (isLast) return
    setIndex((i) => i + 1)
    setProgress(0)
  }, [isLast])

  const goPrev = useCallback(() => {
    if (index <= 0) return
    setIndex((i) => i - 1)
    setProgress(0)
  }, [index])

  useEffect(() => {
    if (unlockLoading || !anyUnlocked || hasInitializedIndex) return
    setIndex(firstUnlockedIndex(SLIDE_IDS))
    setProgress(0)
    setHasInitializedIndex(true)
  }, [unlockLoading, anyUnlocked, hasInitializedIndex, firstUnlockedIndex])

  useEffect(() => {
    if (anyUnlocked) return
    setHasInitializedIndex(false)
  }, [anyUnlocked])

  useEffect(() => {
    if (slide.id !== 'timeline') {
      setTimelineScroll({ pct: 0, atBottom: false })
    }
    if (slide.id !== 'map') {
      setMapProgress({ count: 0, total: 0, complete: false, pct: 0 })
    }
    if (slide.id !== 'hearts') {
      setHuntProgress({ count: 0, total: 0, complete: false, pct: 0 })
    }
    if (slide.id !== 'wheel') {
      setWheelProgress({ complete: false, pct: 0 })
    }
  }, [index, slide.id])

  useEffect(() => {
    if (!currentUnlocked) {
      setProgress(0)
      return
    }

    if (isTimeline) {
      setProgress(timelineScroll.atBottom ? 100 : timelineScroll.pct)
      return
    }

    if (isMap) {
      setProgress(mapProgress.complete ? 100 : mapProgress.pct)
      return
    }

    if (isHearts) {
      setProgress(huntProgress.complete ? 100 : huntProgress.pct)
      return
    }

    if (isWheel) {
      setProgress(wheelProgress.complete ? 100 : wheelProgress.pct)
      return
    }

    if (paused || !slide.duration) return

    const start = Date.now()
    const id = setInterval(() => {
      const elapsed = Date.now() - start
      const pct = Math.min(100, (elapsed / slide.duration) * 100)
      setProgress(pct)
      if (pct >= 100) goNext()
    }, 50)

    return () => clearInterval(id)
  }, [
    index,
    paused,
    slide.duration,
    slide.id,
    isTimeline,
    isMap,
    isHearts,
    isWheel,
    currentUnlocked,
    timelineScroll,
    mapProgress,
    huntProgress,
    wheelProgress,
    goNext,
  ])

  const handleTimelineScroll = useCallback((state) => {
    setTimelineScroll(state)
  }, [])

  const handleMapProgress = useCallback((state) => {
    setMapProgress(state)
  }, [])

  const handleHuntProgress = useCallback((state) => {
    setHuntProgress(state)
  }, [])

  const handleWheelProgress = useCallback((state) => {
    setWheelProgress(state)
  }, [])

  const handleTap = (e) => {
    if (e.target.closest('button, a, input, textarea')) return
    if (e.target.closest(BLOCK_NAV_SELECTORS)) return

    const x = e.clientX
    const third = window.innerWidth / 3
    if (x < third) goPrev()
    else if (x > third * 2) goNext()
  }

  const hint = !anyUnlocked
    ? 'Aguarde o Dia dos Namorados 💝'
    : !currentUnlocked
      ? 'Presente bloqueado · toque à direita para continuar'
      : isLast
        ? 'Toque em Começar 💘'
        : isMap
          ? 'Toque fora do mapa: direita avança · esquerda volta'
          : isHearts
            ? 'Toque fora da área do jogo: direita avança · esquerda volta'
            : isWheel
              ? 'Gire a roleta · toque fora dela para avançar ou voltar'
              : 'Toque à direita para avançar · esquerda para voltar'

  const renderSlide = () => {
    if (!currentUnlocked) {
      return (
        <LockedStorySlide
          title={slide.title}
          unlockLabel={getUnlockLabel(slide.id)}
          unlockAt={getUnlockAt(slide.id)}
        />
      )
    }

    if (isTimeline) return <TimelineSlide onScrollProgress={handleTimelineScroll} />
    if (isMap) return <TravelMapSlide onMapProgress={handleMapProgress} />
    if (isHearts) return <HeartHuntSlide onHuntProgress={handleHuntProgress} />
    if (isWheel) return <LoveWheelSlide onWheelProgress={handleWheelProgress} />
    return <slide.Component />
  }

  if (unlockLoading) {
    return (
      <div className="stories stories-loading">
        <p className="stories-hint">Carregando surpresas...</p>
      </div>
    )
  }

  if (!anyUnlocked) {
    return (
      <div className="stories">
        <div className="stories-progress">
          {SLIDES.map((s) => (
            <div key={s.id} className="stories-progress-track is-locked">
              <div className="stories-progress-fill" style={{ width: '0%' }} />
            </div>
          ))}
        </div>
        <div className="stories-body">
          <ValentinesCountdown targetDate={firstUnlockAt} />
        </div>
        <p className="stories-hint">{hint}</p>
      </div>
    )
  }

  return (
    <div
      className="stories"
      onPointerDown={() => !isTimeline && !isInteractive && currentUnlocked && setPaused(true)}
      onPointerUp={() => !isTimeline && !isInteractive && setPaused(false)}
      onPointerLeave={() => !isTimeline && !isInteractive && setPaused(false)}
    >
      <div className="stories-progress">
        {SLIDES.map((s, i) => {
          const unlocked = isStoryUnlocked(s.id)
          return (
            <div
              key={s.id}
              className={`stories-progress-track${unlocked ? '' : ' is-locked'}`}
              title={unlocked ? s.id : `Bloqueado · ${getUnlockLabel(s.id) ?? ''}`}
            >
              <div
                className="stories-progress-fill"
                style={{
                  width:
                    i < index && unlocked
                      ? '100%'
                      : i === index && unlocked
                        ? `${progress}%`
                        : '0%',
                }}
              />
              {!unlocked && <span className="stories-progress-lock" aria-hidden="true">🔒</span>}
            </div>
          )
        })}
      </div>

      <div className="stories-body" onClick={handleTap}>
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            className="stories-slide-wrap"
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35 }}
            drag={isInteractive ? false : 'x'}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.12}
            onDragEnd={(_, info) => {
              if (isInteractive) return
              if (info.offset.x < -SWIPE_THRESHOLD) goNext()
              else if (info.offset.x > SWIPE_THRESHOLD) goPrev()
            }}
          >
            {renderSlide()}
          </motion.div>
        </AnimatePresence>
      </div>

      <p className="stories-hint">{hint}</p>
      {unlockedSlideIds.length < SLIDES.length && (
        <p className="stories-unlock-meta">
          {unlockedSlideIds.length} de {SLIDES.length} presentes liberados
        </p>
      )}
    </div>
  )
}
