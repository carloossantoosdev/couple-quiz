import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useQuizStore } from '../store/quizStore.js'

// Player de musica de fundo.
// COMO ADICIONAR A MUSICA (zero codigo):
//   1. Coloque o arquivo em src/assets/ com o nome "music"
//      (ex.: music.mp3, music.m4a, music.ogg ou music.wav).
//   2. Pronto! O player detecta o arquivo automaticamente e toca
//      em loop a partir do clique em "Comecar".
//   Sugestao: "Pra Voce Acreditar" - Ferrugem  ->  src/assets/music.mp3
//
// Detecta automaticamente qualquer src/assets/music.<ext> sem
// quebrar o build caso o arquivo ainda nao exista.
const musicModules = import.meta.glob(
  '../assets/music.{mp3,m4a,ogg,wav,aac}',
  { eager: true, query: '?url', import: 'default' },
)
const musicFile = Object.values(musicModules)[0] || ''

export default function MusicPlayer() {
  const audioRef = useRef(null)
  const musicOn = useQuizStore((s) => s.musicOn)
  const toggleMusic = useQuizStore((s) => s.toggleMusic)
  const [available] = useState(Boolean(musicFile))

  // Sincroniza play/pause com o estado global (navegadores bloqueiam
  // autoplay, entao a primeira reproducao acontece apos o clique em "Comecar").
  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !musicFile) return
    if (musicOn) {
      audio.volume = 0.4
      audio.play().catch(() => {
        /* ignora bloqueio de autoplay */
      })
    } else {
      audio.pause()
    }
  }, [musicOn])

  return (
    <>
      {musicFile && <audio ref={audioRef} src={musicFile} loop preload="auto" />}

      <motion.button
        className="music-btn"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={toggleMusic}
        title={
          available
            ? musicOn
              ? 'Pausar musica'
              : 'Tocar musica'
            : 'Adicione src/assets/music.mp3'
        }
        aria-label="Controle de musica"
      >
        {available ? (musicOn ? '\u{1F50A}' : '\u{1F507}') : '\u{1F3B5}'}
      </motion.button>
    </>
  )
}
