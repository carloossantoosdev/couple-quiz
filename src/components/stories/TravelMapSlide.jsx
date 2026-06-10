import { useCallback, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { travelPlaces } from '../../data/content.js'
import TravelMap from './TravelMap.jsx'

export default function TravelMapSlide({ onMapProgress }) {
  const [discovered, setDiscovered] = useState(() => new Set())
  const total = travelPlaces.length

  const handleDiscover = useCallback((id) => {
    setDiscovered((prev) => {
      if (prev.has(id)) return prev
      const next = new Set(prev)
      next.add(id)
      return next
    })
  }, [])

  useEffect(() => {
    const count = discovered.size
    onMapProgress?.({
      count,
      total,
      complete: count >= total,
      pct: total ? (count / total) * 100 : 100,
    })
  }, [discovered, total, onMapProgress])

  return (
    <div className="story-slide story-slide-map">
      <motion.h2
        className="story-title"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Nossos lugares no mapa
      </motion.h2>
      <motion.p
        className="story-sub story-sub--map"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.12 }}
      >
        Toque nos marcadores 💕 para revelar cada memória de viagem
      </motion.p>

      <div className="travel-map-progress">
        <span>
          {discovered.size} de {total} lugares descobertos
        </span>
        <div className="travel-map-progress-bar">
          <div
            className="travel-map-progress-fill"
            style={{ width: `${total ? (discovered.size / total) * 100 : 0}%` }}
          />
        </div>
      </div>

      <div
        className="travel-map-shell"
        onClick={(e) => e.stopPropagation()}
        onPointerDown={(e) => e.stopPropagation()}
      >
        <TravelMap
          places={travelPlaces}
          discovered={discovered}
          onDiscover={handleDiscover}
        />
      </div>

      {discovered.size >= total && (
        <motion.p
          className="story-map-done"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Você revisitou todos os nossos lugares! Toque à direita para continuar →
        </motion.p>
      )}
    </div>
  )
}
