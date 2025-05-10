import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  base: '/hoshiranear_Frontend/',
  plugins: [react()],
  server: {
    port: 3000 // change here
  }
})
