import { useEffect, useState } from 'react'
import { getTimeTogether } from '../utils/relationshipTime.js'

export function useRelationshipTime(startDate) {
  const [time, setTime] = useState(() => getTimeTogether(startDate))

  useEffect(() => {
    const tick = () => setTime(getTimeTogether(startDate))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [startDate])

  return time
}
