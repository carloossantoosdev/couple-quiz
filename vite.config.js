import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Em producao (GitHub Pages), defina VITE_BASE_PATH=/nome-do-repo/
// Ex.: VITE_BASE_PATH=/couple-quiz/
export default defineConfig({
  base: process.env.VITE_BASE_PATH || '/',
  plugins: [react()],
  server: {
    open: true,
    port: 5174,
    strictPort: false,
  },
})
