import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/px-snap',
  plugins: [
    tailwindcss(),
  ],
})