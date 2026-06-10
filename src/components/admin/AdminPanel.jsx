import { useCallback, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { appTitle, storySchedule } from '../../data/content.js'
import { isSupabaseConfigured, supabase } from '../../lib/supabase.js'

function formatScheduleInput(isoString) {
  if (!isoString) return ''
  const date = new Date(isoString)
  const offset = date.getTimezoneOffset()
  const local = new Date(date.getTime() - offset * 60000)
  return local.toISOString().slice(0, 16)
}

function toIsoFromLocalInput(value) {
  if (!value) return new Date().toISOString()
  return new Date(value).toISOString()
}

function getDefaultScheduleUnlock(storyId) {
  const row = storySchedule.find((s) => s.storyId === storyId)
  return row?.unlockAt ?? new Date(Date.now() + 86400000).toISOString()
}

function isStoryUnlockedAt(unlockAt, now = new Date()) {
  return now >= new Date(unlockAt)
}

export default function AdminPanel() {
  const [pin, setPin] = useState('')
  const [authenticated, setAuthenticated] = useState(false)
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [busyId, setBusyId] = useState(null)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [statusNow, setStatusNow] = useState(() => new Date())

  const fetchRows = useCallback(async () => {
    if (!isSupabaseConfigured || !supabase) {
      setRows(storySchedule)
      setLoading(false)
      return
    }

    setLoading(true)
    const { data, error: fetchError } = await supabase
      .from('story_unlocks')
      .select('story_id, title, sort_order, unlock_at')
      .order('sort_order', { ascending: true })

    if (fetchError) {
      setError(fetchError.message)
      setRows(storySchedule.map((s) => ({
        story_id: s.storyId,
        title: s.title,
        sort_order: s.sortOrder,
        unlock_at: s.unlockAt,
      })))
    } else {
      setRows(data ?? [])
      setError('')
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchRows()
  }, [fetchRows])

  useEffect(() => {
    const id = window.setInterval(() => setStatusNow(new Date()), 1000)
    return () => window.clearInterval(id)
  }, [])

  const handleLogin = (e) => {
    e.preventDefault()
    if (!pin.trim()) return
    setAuthenticated(true)
    setMessage('')
    setError('')
  }

  const callUnlockStory = async (storyId, unlockAtIso) => {
    if (!supabase) {
      setError('Supabase não configurado. Defina VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY.')
      return false
    }

    const { error: rpcError } = await supabase.rpc('admin_unlock_story', {
      p_story_id: storyId,
      p_pin: pin,
      p_unlock_at: unlockAtIso,
    })

    if (rpcError) {
      const msg = rpcError.message?.includes('invalid_pin')
        ? 'PIN incorreto.'
        : rpcError.message
      setError(msg)
      return false
    }

    return true
  }

  const callUnlock = async (storyId, unlockAtIso) => {
    setBusyId(storyId)
    setMessage('')
    setError('')

    const ok = await callUnlockStory(storyId, unlockAtIso)

    if (ok) {
      const locking = new Date(unlockAtIso) > new Date()
      setMessage(
        locking ? `Story "${storyId}" bloqueado novamente.` : `Story "${storyId}" liberado!`,
      )
      await fetchRows()
    }

    setBusyId(null)
  }

  const lockStory = (storyId) => callUnlock(storyId, getDefaultScheduleUnlock(storyId))

  const getStoryTargets = () =>
    rows.length
      ? rows.map((row) => ({
          storyId: row.story_id ?? row.storyId,
          unlockAt: row.unlock_at ?? row.unlockAt,
        }))
      : storySchedule.map((row) => ({
          storyId: row.storyId,
          unlockAt: row.unlockAt,
        }))

  const unlockAllStories = async () => {
    if (!supabase) {
      setError('Supabase não configurado. Defina VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY.')
      return
    }

    setBusyId('unlock-all')
    setMessage('')
    setError('')

    const nowIso = new Date().toISOString()
    for (const row of getStoryTargets()) {
      const ok = await callUnlockStory(row.storyId, nowIso)
      if (!ok) {
        setBusyId(null)
        return
      }
    }

    setMessage('Todos os stories liberados!')
    await fetchRows()
    setBusyId(null)
  }

  const lockAllStories = async () => {
    if (!supabase) {
      setError('Supabase não configurado. Defina VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY.')
      return
    }

    setBusyId('lock-all')
    setMessage('')
    setError('')

    for (const row of storySchedule) {
      const ok = await callUnlockStory(row.storyId, row.unlockAt)
      if (!ok) {
        setBusyId(null)
        return
      }
    }

    setMessage('Todos os stories bloqueados novamente (horário padrão restaurado).')
    await fetchRows()
    setBusyId(null)
  }

  return (
    <div className="admin-page">
      <div className="admin-card card">
        <h1 className="title-script">Admin — Stories</h1>
        <p className="subtitle">{appTitle} · admin</p>

        {!isSupabaseConfigured && (
          <p className="admin-alert admin-alert-warn">
            Supabase não configurado. Configure as variáveis de ambiente para liberar stories.
          </p>
        )}

        {!authenticated ? (
          <form className="admin-login" onSubmit={handleLogin}>
            <label htmlFor="admin-pin">PIN de administrador</label>
            <input
              id="admin-pin"
              type="password"
              inputMode="numeric"
              autoComplete="off"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="Digite o PIN"
            />
            <button type="submit" className="btn btn-primary">
              Entrar
            </button>
            <p className="admin-footnote">Use o PIN de administrador configurado no Supabase</p>
          </form>
        ) : (
          <>
            {loading && <p className="admin-loading">Carregando...</p>}

            {!loading && (
              <ul className="admin-story-list">
                {rows.map((row) => {
                  const storyId = row.story_id ?? row.storyId
                  const unlockAt = row.unlock_at ?? row.unlockAt
                  const unlocked = isStoryUnlockedAt(unlockAt, statusNow)
                  const scheduleId = `schedule-${storyId}`

                  return (
                    <li key={storyId} className={`admin-story-item${unlocked ? ' is-unlocked' : ''}`}>
                      <div className="admin-story-head">
                        <strong>{row.title}</strong>
                        <span className="admin-story-id">{storyId}</span>
                      </div>
                      <p className="admin-story-status">
                        {unlocked ? 'Liberado' : 'Bloqueado'} ·{' '}
                        {new Date(unlockAt).toLocaleString('pt-BR', {
                          timeZone: 'America/Sao_Paulo',
                        })}
                      </p>
                      <div className="admin-story-actions">
                        {unlocked ? (
                          <motion.button
                            type="button"
                            className="btn btn-ghost btn-sm admin-lock-btn"
                            disabled={busyId !== null}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => lockStory(storyId)}
                          >
                            {busyId === storyId ? '...' : 'Bloquear novamente'}
                          </motion.button>
                        ) : (
                          <motion.button
                            type="button"
                            className="btn btn-primary btn-sm"
                            disabled={busyId !== null}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => callUnlock(storyId, new Date().toISOString())}
                          >
                            {busyId === storyId ? '...' : 'Liberar agora'}
                          </motion.button>
                        )}
                        <label className="admin-schedule-label" htmlFor={scheduleId}>
                          Agendar
                        </label>
                        <input
                          key={`${storyId}-${unlockAt}`}
                          id={scheduleId}
                          type="datetime-local"
                          className="admin-schedule-input"
                          defaultValue={formatScheduleInput(unlockAt)}
                        />
                        <button
                          type="button"
                          className="btn btn-ghost btn-sm admin-schedule-save"
                          disabled={busyId !== null}
                          onClick={(e) => {
                            const input = e.currentTarget.previousElementSibling
                            if (input?.value) {
                              callUnlock(storyId, toIsoFromLocalInput(input.value))
                            }
                          }}
                        >
                          Salvar horário
                        </button>
                      </div>
                    </li>
                  )
                })}
              </ul>
            )}

            <div className="admin-bulk">
              <button
                type="button"
                className="btn btn-primary"
                disabled={busyId !== null || !isSupabaseConfigured}
                onClick={unlockAllStories}
              >
                {busyId === 'unlock-all' ? 'Liberando...' : 'Liberar todos agora'}
              </button>
              <button
                type="button"
                className="btn btn-ghost admin-lock-all-btn"
                disabled={busyId !== null || !isSupabaseConfigured}
                onClick={lockAllStories}
              >
                {busyId === 'lock-all' ? 'Bloqueando...' : 'Bloquear todos novamente'}
              </button>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => {
                  setAuthenticated(false)
                  setPin('')
                }}
              >
                Sair
              </button>
            </div>

            {message && <p className="admin-alert admin-alert-ok">{message}</p>}
            {error && <p className="admin-alert admin-alert-error">{error}</p>}
          </>
        )}
      </div>
    </div>
  )
}
