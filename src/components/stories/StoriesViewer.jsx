import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import TimeTogetherSlide from './TimeTogetherSlide.jsx'
import TimelineSlide from './TimelineSlide.jsx'
import TravelMapSlide from './TravelMapSlide.jsx'
import QuizIntroSlide from './QuizIntroSlide.jsx'

const SLIDES = [
  { id: 'time', Component: TimeTogetherSlide, duration: 18000 },
  { id: 'timeline', Component: TimelineSlide, duration: null },
  { id: 'map', Component: TravelMapSlide, duration: null },
  { id: 'quiz', Component: QuizIntroSlide, duration: null },
]

const SWIPE_THRESHOLD = 60

export default function StoriesViewer() {
  const [index, setIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [paused, setPaused] = useState(false)
  const [timelineScroll, setTimelineScroll] = useState({ pct: 0, atBottom: false })
  const [mapProgress, setMapProgress] = useState({
    count: 0,
    total: 0,
    complete: false,
    pct: 0,
  })

  const slide = SLIDES[index]
  const Slide = slide.Component
  const isLast = index >= SLIDES.length - 1
  const isTimeline = slide.id === 'timeline'
  const isMap = slide.id === 'map'

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
    if (slide.id !== 'timeline') {
      setTimelineScroll({ pct: 0, atBottom: false })
    }
    if (slide.id !== 'map') {
      setMapProgress({ count: 0, total: 0, complete: false, pct: 0 })
    }
  }, [index, slide.id])

  useEffect(() => {
    if (isTimeline) {
      setProgress(timelineScroll.atBottom ? 100 : timelineScroll.pct)
      return
    }

    if (isMap) {
      setProgress(mapProgress.complete ? 100 : mapProgress.pct)
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
    timelineScroll,
    mapProgress,
    goNext,
  ])

  const handleTimelineScroll = useCallback((state) => {
    setTimelineScroll(state)
  }, [])

  const handleMapProgress = useCallback((state) => {
    setMapProgress(state)
  }, [])

  const handleTap = (e) => {
    if (e.target.closest('button, a, input, textarea')) return
    if (
      e.target.closest(
        '.travel-map-shell, .travel-map, .leaflet-container, .leaflet-pane, .leaflet-popup, .leaflet-control',
      )
    ) {
      return
    }

    const x = e.clientX
    const third = window.innerWidth / 3
    if (x < third) goPrev()
    else if (x > third * 2) goNext()
  }

  const hint = isLast
    ? 'Toque em Começar 💘'
    : isMap
      ? 'Toque fora do mapa: direita avança · esquerda volta'
      : 'Toque à direita para avançar · esquerda para voltar'

  const renderSlide = () => {
    if (isTimeline) return <TimelineSlide onScrollProgress={handleTimelineScroll} />
    if (isMap) return <TravelMapSlide onMapProgress={handleMapProgress} />
    return <Slide />
  }

  return (
    <div
      className="stories"
      onPointerDown={() => !isTimeline && !isMap && setPaused(true)}
      onPointerUp={() => !isTimeline && !isMap && setPaused(false)}
      onPointerLeave={() => !isTimeline && !isMap && setPaused(false)}
    >
      <div className="stories-progress">
        {SLIDES.map((s, i) => (
          <div key={s.id} className="stories-progress-track">
            <div
              className="stories-progress-fill"
              style={{
                width:
                  i < index ? '100%' : i === index ? `${progress}%` : '0%',
              }}
            />
          </div>
        ))}
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
            drag={isMap ? false : 'x'}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.12}
            onDragEnd={(_, info) => {
              if (isMap) return
              if (info.offset.x < -SWIPE_THRESHOLD) goNext()
              else if (info.offset.x > SWIPE_THRESHOLD) goPrev()
            }}
          >
            {renderSlide()}
          </motion.div>
        </AnimatePresence>
      </div>

      <p className="stories-hint">{hint}</p>
    </div>
  )
}
