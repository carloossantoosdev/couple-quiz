import { AnimatePresence, motion } from 'framer-motion'
import { useQuizStore } from './store/quizStore.js'
import StoriesViewer from './components/stories/StoriesViewer.jsx'
import StartScreen from './components/StartScreen.jsx'
import QuestionCard from './components/QuestionCard.jsx'
import ResultScreen from './components/ResultScreen.jsx'
import SurpriseReveal from './components/SurpriseReveal.jsx'
import MusicPlayer from './components/MusicPlayer.jsx'
import FloatingHearts from './components/FloatingHearts.jsx'

const screens = {
  start: StartScreen,
  playing: QuestionCard,
  result: ResultScreen,
  surprise: SurpriseReveal,
}

export default function App() {
  const status = useQuizStore((s) => s.status)

  if (status === 'stories') {
    return (
      <div className="app">
        <MusicPlayer />
        <StoriesViewer />
      </div>
    )
  }

  const Screen = screens[status] ?? StartScreen

  return (
    <div className="app">
      <FloatingHearts />
      <MusicPlayer />
      <main className="stage">
        <AnimatePresence mode="wait">
          <motion.div
            key={status}
            className="screen"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -24, scale: 0.98 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <Screen />
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
}
