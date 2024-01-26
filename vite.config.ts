import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    manifest: true,
    rollupOptions: {
      // overwrite default .html entry
      input: '/src/main.tsx',
    },
  },
  server: {
    proxy: {
      "/getArtists": {
        target: "http://localhost:3001",
        secure: false,
      },
      "/getTracks": {
        target: "http://localhost:3001",
        secure: false,
      },
      "/getSearchedTracks": {
        target: "http://localhost:3001",
        secure: false,
      },
      "/getTracksByIds": {
        target: "http://localhost:3001",
        secure: false,
      }
    }
  },
  plugins: [react()],
  base: '/'
})
