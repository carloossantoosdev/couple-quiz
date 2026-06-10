import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import CoupleTimeline from './CoupleTimeline.jsx'

export default function TimelineSlide({ onScrollProgress }) {
  const rootRef = useRef(null)

  useEffect(() => {
    const scrollEl = rootRef.current?.closest('.stories-slide-wrap')
    if (!scrollEl || !onScrollProgress) return

    const update = () => {
      const { scrollTop, scrollHeight, clientHeight } = scrollEl
      const maxScroll = scrollHeight - clientHeight
      const atBottom = maxScroll <= 12 || scrollTop >= maxScroll - 40
      const pct = maxScroll <= 12 ? 100 : Math.min(100, (scrollTop / maxScroll) * 100)
      onScrollProgress({ pct, atBottom })
    }

    scrollEl.addEventListener('scroll', update, { passive: true })
    update()

    const observer = new ResizeObserver(update)
    observer.observe(scrollEl)

    return () => {
      scrollEl.removeEventListener('scroll', update)
      observer.disconnect()
    }
  }, [onScrollProgress])

  return (
    <div ref={rootRef} className="story-slide story-slide-timeline">
      <motion.h2
        className="story-title"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Nossa linha do tempo
      </motion.h2>
      <motion.p
        className="story-sub"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
      >
        Cada ano, um capítulo escrito a dois 💕
      </motion.p>

      <CoupleTimeline />
    </div>
  )
}
