import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'https://job-listing-q0po.onrender.com', // 👈 Render backend
        changeOrigin: true,
        secure: false,
      },
    },
  },
})

