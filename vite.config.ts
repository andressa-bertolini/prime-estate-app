import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
export default defineConfig({
  base: '/prime-estate/',
  plugins: [react()],
  resolve: {
    alias: {
      '@/assets': path.resolve(__dirname, 'src/assets'),
      '@/components': path.resolve(__dirname, 'src/components'),
      '@/pages': path.resolve(__dirname, 'src/pages'),
      '@/services': path.resolve(__dirname, 'src/services'),
      '@/layouts': path.resolve(__dirname, 'src/layouts'),
      '@/routes': path.resolve(__dirname, 'src/routes'),
      '@/hooks': path.resolve(__dirname, 'src/hooks'),
      '@/context': path.resolve(__dirname, 'src/context'),
      '@/types': path.resolve(__dirname, 'src/types'),
      '@/utils': path.resolve(__dirname, 'src/utils'),
      '@/sections': path.resolve(__dirname, 'src/sections'),
    },
  },
})