import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/ibm-audit-hub/' : '/',
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  }
})

// Made with Bob
