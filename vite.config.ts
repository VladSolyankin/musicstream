import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  content: [
      './index.html',
      './src/*.{ts,tsx,js,jsx}',
  ],
  theme: {
    extend: [],
  },
  plugins: [react()],
})
