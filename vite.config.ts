import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    target: 'esnext'
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
  resolve: {
    alias: {
      "@types": path.resolve(__dirname, './src/ts/types/index.js'),
      "@constants": path.resolve(__dirname, './src/ts/constants/index.ts'),
      "@store": path.resolve(__dirname, './src/store/store.js'),
      "@hooks": path.resolve(__dirname, './src/hooks/hooks.ts'),
      "@firebase/config.js": path.resolve(__dirname, './src/api/firebase/config.js'),
      "@firebase/index.js": path.resolve(__dirname, './src/api/firebase/index.js')
    }
  },
  base: "./"
})
