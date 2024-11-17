import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
 server: {
  proxy:{
    '/api': 'http://localhost:3000',
    '/temp': 'http://192.168.1.9:3000'
  },
 },
  plugins: [react()],
})
