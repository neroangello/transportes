import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// se agrega como base el repo-name
export default defineConfig({
  base: '/transportes/',
  plugins: [react()],
})
