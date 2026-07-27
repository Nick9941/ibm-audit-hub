import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/ibm-audit-hub/',
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  }
})

// Made with Bob
