import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { jigsawPuzzle, resolvePuzzlePhoto } from '../../data/content.js'
import Confetti from '../Confetti.jsx'

const DRAG_THRESHOLD = 8

function shufflePositions(rows, cols) {
  const total = rows * cols
  const ids = Array.from({ length: total }, (_, i) => i)

  do {
    for (let i = total - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[ids[i], ids[j]] = [ids[j], ids[i]]
    }
  } while (ids.every((id, index) => id === index))

  return ids
}

function countCorrect(positions) {
  return positions.filter((pieceId, index) => pieceId === index).length
}

function pieceBackgroundStyle(pieceId, rows, cols, photoUrl) {
  const correctRow = Math.floor(pieceId / cols)
  const correctCol = pieceId % cols
  const xPct = cols <= 1 ? 0 : (correctCol / (cols - 1)) * 100
  const yPct = rows <= 1 ? 0 : (correctRow / (rows - 1)) * 100

  return {
    backgroundImage: `url(${photoUrl})`,
    backgroundSize: `${cols * 100}% ${rows * 100}%`,
    backgroundPosition: `${xPct}% ${yPct}%`,
  }
}

function getCellIndexAtPoint(x, y) {
  const el = document.elementFromPoint(x, y)
  const cell = el?.closest('[data-cell-index]')
  if (!cell) return null
  const index = Number(cell.dataset.cellIndex)
  return Number.isFinite(index) ? index : null
}

export default function JigsawPuzzleSlide({ onPuzzleProgress }) {
  const { rows, cols, title, subtitle, completionMessage } = jigsawPuzzle
  const total = rows * cols
  const photoUrl = resolvePuzzlePhoto(jigsawPuzzle)

  const [positions, setPositions] = useState(() => shufflePositions(rows, cols))
  const [drag, setDrag] = useState(null)
  const [selectedIndex, setSelectedIndex] = useState(null)
  const [imageReady, setImageReady] = useState(false)

  const positionsRef = useRef(positions)
  const pointerRef = useRef(null)
  const didDragRef = useRef(false)

  useEffect(() => {
    positionsRef.current = positions
  }, [positions])

  const correctCount = useMemo(() => countCorrect(positions), [positions])
  const isComplete = correctCount >= total

  const reportProgress = useCallback(() => {
    onPuzzleProgress?.({
      count: correctCount,
      total,
      complete: isComplete,
      pct: total ? (correctCount / total) * 100 : 100,
    })
  }, [correctCount, total, isComplete, onPuzzleProgress])

  useEffect(() => {
    reportProgress()
  }, [reportProgress])

  useEffect(() => {
    const img = new Image()
    img.onload = () => setImageReady(true)
    img.onerror = () => setImageReady(true)
    img.src = photoUrl
  }, [photoUrl])

  const swapCells = useCallback((fromIndex, toIndex) => {
    if (fromIndex === toIndex) return
    setPositions((prev) => {
      const next = [...prev]
      next[fromIndex] = prev[toIndex]
      next[toIndex] = prev[fromIndex]
      return next
    })
    setSelectedIndex(null)
  }, [])

  const clearPointer = useCallback(() => {
    pointerRef.current = null
    setDrag(null)
  }, [])

  const finishDrag = useCallback((clientX, clientY) => {
    const active = pointerRef.current
    if (!active || active.mode !== 'drag') {
      clearPointer()
      return
    }

    const toIndex = getCellIndexAtPoint(clientX, clientY) ?? active.hoverIndex
    const currentPositions = positionsRef.current

    if (
      toIndex != null
      && toIndex !== active.fromIndex
      && currentPositions[toIndex] !== toIndex
    ) {
      swapCells(active.fromIndex, toIndex)
    }

    clearPointer()
  }, [clearPointer, swapCells])

  const handleWindowPointerMove = useCallback((e) => {
    const active = pointerRef.current
    if (!active) return

    const dx = e.clientX - active.startX
    const dy = e.clientY - active.startY
    const distance = Math.hypot(dx, dy)

    if (active.mode === 'pending' && distance >= DRAG_THRESHOLD) {
      didDragRef.current = true
      const next = {
        ...active,
        mode: 'drag',
        pieceId: positionsRef.current[active.fromIndex],
        x: e.clientX,
        y: e.clientY,
        hoverIndex: active.fromIndex,
      }
      pointerRef.current = next
      setDrag(next)
      setSelectedIndex(null)
      return
    }

    if (active.mode !== 'drag') return

    const hoverIndex = getCellIndexAtPoint(e.clientX, e.clientY) ?? active.hoverIndex
    const next = {
      ...active,
      x: e.clientX,
      y: e.clientY,
      hoverIndex,
    }
    pointerRef.current = next
    setDrag(next)
  }, [])

  const handleWindowPointerUp = useCallback((e) => {
    const active = pointerRef.current
    if (!active) return

    if (active.mode === 'drag') {
      finishDrag(e.clientX, e.clientY)
      return
    }

    clearPointer()
  }, [clearPointer, finishDrag])

  useEffect(() => {
    window.addEventListener('pointermove', handleWindowPointerMove)
    window.addEventListener('pointerup', handleWindowPointerUp)
    window.addEventListener('pointercancel', handleWindowPointerUp)

    return () => {
      window.removeEventListener('pointermove', handleWindowPointerMove)
      window.removeEventListener('pointerup', handleWindowPointerUp)
      window.removeEventListener('pointercancel', handleWindowPointerUp)
    }
  }, [handleWindowPointerMove, handleWindowPointerUp])

  const handlePiecePointerDown = useCallback((e, cellIndex) => {
    e.stopPropagation()

    const pieceId = positionsRef.current[cellIndex]
    if (pieceId === cellIndex) return

    didDragRef.current = false
    pointerRef.current = {
      mode: 'pending',
      fromIndex: cellIndex,
      startX: e.clientX,
      startY: e.clientY,
    }
  }, [])

  const handlePieceClick = useCallback((e, cellIndex) => {
    e.stopPropagation()
    if (didDragRef.current) {
      didDragRef.current = false
      return
    }

    const currentPositions = positionsRef.current
    if (currentPositions[cellIndex] === cellIndex) return

    if (selectedIndex == null) {
      setSelectedIndex(cellIndex)
      return
    }

    if (selectedIndex === cellIndex) {
      setSelectedIndex(null)
      return
    }

    if (currentPositions[cellIndex] === cellIndex) {
      setSelectedIndex(cellIndex)
      return
    }

    swapCells(selectedIndex, cellIndex)
  }, [selectedIndex, swapCells])

  return (
    <div className="story-slide story-slide-puzzle">
      {isComplete && <Confetti />}

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
        {subtitle}
      </motion.p>

      <div className="jigsaw-progress">
        <span>
          {correctCount} de {total} peças no lugar
        </span>
        <div className="jigsaw-progress-bar">
          <div
            className="jigsaw-progress-fill"
            style={{ width: `${total ? (correctCount / total) * 100 : 0}%` }}
          />
        </div>
      </div>

      <div
        className="jigsaw-board"
        style={{
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
        }}
        onClick={(e) => e.stopPropagation()}
        onPointerDown={(e) => e.stopPropagation()}
      >
        {positions.map((pieceId, cellIndex) => {
          const isLocked = pieceId === cellIndex
          const isDragging = drag?.fromIndex === cellIndex
          const isSelected = selectedIndex === cellIndex
          const isDropTarget = drag?.fromIndex != null && drag.hoverIndex === cellIndex && !isLocked

          return (
            <div
              key={cellIndex}
              className={`jigsaw-cell${isDropTarget ? ' is-drop-target' : ''}`}
              data-cell-index={cellIndex}
            >
              <motion.div
                role="button"
                tabIndex={isLocked ? -1 : 0}
                className={`jigsaw-piece${isLocked ? ' is-locked' : ''}${isDragging ? ' is-dragging' : ''}${isSelected ? ' is-selected' : ''}${!imageReady ? ' is-loading' : ''}`}
                style={pieceBackgroundStyle(pieceId, rows, cols, photoUrl)}
                onPointerDown={(e) => handlePiecePointerDown(e, cellIndex)}
                onClick={(e) => handlePieceClick(e, cellIndex)}
                whileTap={isLocked ? undefined : { scale: 0.97 }}
                aria-label={isLocked ? 'Peça encaixada' : 'Arraste ou toque para trocar de lugar'}
              />
            </div>
          )
        })}
      </div>

      <AnimatePresence mode="wait">
        {isComplete && (
          <motion.p
            key="done"
            className="jigsaw-message"
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.35 }}
          >
            {completionMessage}
          </motion.p>
        )}
      </AnimatePresence>

      {isComplete && (
        <motion.p
          className="jigsaw-done"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          Foto montada! Toque fora do jogo à direita para continuar →
        </motion.p>
      )}

      {drag?.mode === 'drag' && (
        <div
          className="jigsaw-drag-ghost"
          style={{
            ...pieceBackgroundStyle(drag.pieceId, rows, cols, photoUrl),
            left: drag.x,
            top: drag.y,
          }}
          aria-hidden="true"
        />
      )}
    </div>
  )
}
