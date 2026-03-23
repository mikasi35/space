// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react({
      // silence the fast-refresh lint rule for monolithic files
    }),
  ],
    base: "/spacemine/",
})

