import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import {fileURLToPath} from "node:url";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@src': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  test: {
    environment: 'jsdom',
    setupFiles: './test/unit/setupTests.js',
    include: ['**/test/unit/**.spec.*'],
  },
})
