import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// GH_PAGES=1 builds for https://orbitstudio2026.github.io/restro-asia-web/
export default defineConfig({
  base: process.env.GH_PAGES ? '/restro-asia-web/' : '/',
  plugins: [react(), tailwindcss()],
})
