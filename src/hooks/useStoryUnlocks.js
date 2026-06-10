import { useCallback, useEffect, useMemo, useState } from 'react'
import { storySchedule } from '../data/content.js'
import { isSupabaseConfigured, supabase } from '../lib/supabase.js'

const UNLOCK_MODE = import.meta.env.VITE_UNLOCK_MODE ?? 'local'
const TICK_MS = 1000

function normalizeRow(row) {
  return {
    storyId: row.story_id ?? row.storyId,
    title: row.title,
    sortOrder: row.sort_order ?? row.sortOrder,
    unlockAt: row.unlock_at ?? row.unlockAt,
  }
}

function buildLocalUnlocks() {
  return storySchedule.map(normalizeRow).sort((a, b) => a.sortOrder - b.sortOrder)
}

function isUnlockedAt(unlockAt, now = new Date()) {
  return now.getTime() >= new Date(unlockAt).getTime()
}

function formatUnlockTime(unlockAt) {
  return new Date(unlockAt).toLocaleString('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    day: 'numeric',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function useStoryUnlocks() {
  const [unlocks, setUnlocks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [now, setNow] = useState(() => new Date())

  const useRemote = UNLOCK_MODE === 'supabase' && isSupabaseConfigured

  const fetchUnlocks = useCallback(async () => {
    if (!useRemote) {
      setUnlocks(buildLocalUnlocks())
      setError(null)
      setLoading(false)
      return
    }

    setLoading(true)
    const { data, error: fetchError } = await supabase
      .from('story_unlocks')
      .select('story_id, title, sort_order, unlock_at')
      .order('sort_order', { ascending: true })

    if (fetchError) {
      setUnlocks(buildLocalUnlocks())
      setError(fetchError.message)
    } else {
      setUnlocks((data ?? []).map(normalizeRow))
      setError(null)
    }
    setLoading(false)
  }, [useRemote])

  useEffect(() => {
    fetchUnlocks()
  }, [fetchUnlocks])

  useEffect(() => {
    if (!useRemote || !supabase) return undefined

    const channel = supabase
      .channel('story_unlocks_changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'story_unlocks' },
        () => {
          fetchUnlocks()
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [useRemote, fetchUnlocks])

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), TICK_MS)
    return () => window.clearInterval(id)
  }, [])

  const unlockMap = useMemo(() => {
    const map = new Map()
    for (const row of unlocks) {
      map.set(row.storyId, row)
    }
    return map
  }, [unlocks])

  const isStoryUnlocked = useCallback(
    (storyId) => {
      const row = unlockMap.get(storyId)
      if (!row) return true
      return isUnlockedAt(row.unlockAt, now)
    },
    [unlockMap, now],
  )

  const getUnlockAt = useCallback(
    (storyId) => unlockMap.get(storyId)?.unlockAt ?? null,
    [unlockMap],
  )

  const getUnlockLabel = useCallback(
    (storyId) => {
      const unlockAt = getUnlockAt(storyId)
      return unlockAt ? formatUnlockTime(unlockAt) : null
    },
    [getUnlockAt],
  )

  const firstUnlockAt = useMemo(() => {
    if (!unlocks.length) return null
    return unlocks.reduce((earliest, row) => {
      const t = new Date(row.unlockAt).getTime()
      return t < earliest ? t : earliest
    }, Infinity)
  }, [unlocks])

  const anyUnlocked = useMemo(
    () => unlocks.some((row) => isUnlockedAt(row.unlockAt, now)),
    [unlocks, now],
  )

  const allUnlocked = useMemo(
    () => unlocks.length > 0 && unlocks.every((row) => isUnlockedAt(row.unlockAt, now)),
    [unlocks, now],
  )

  const firstUnlockedIndex = useCallback(
    (slideIds) => {
      const idx = slideIds.findIndex((id) => isStoryUnlocked(id))
      return idx >= 0 ? idx : 0
    },
    [isStoryUnlocked],
  )

  return {
    unlocks,
    loading,
    error,
    now,
    useRemote,
    isStoryUnlocked,
    getUnlockAt,
    getUnlockLabel,
    firstUnlockAt: firstUnlockAt === Infinity ? null : new Date(firstUnlockAt),
    anyUnlocked,
    allUnlocked,
    firstUnlockedIndex,
    isUnlockedAt: (unlockAt) => isUnlockedAt(unlockAt, now),
  }
}

export { formatUnlockTime, isUnlockedAt }
