import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'



// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // import.meta.dirname = équivalent ESM de __dirname (qui n'existe pas dans un module ES)
  resolve: { alias: { '@': path.resolve(import.meta.dirname, 'src') } },
})
