import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
    // base: './', // may or may not be necessary?? without it, viewing index.html deployed at live server doesn't apply our css styles to the error on the page - with it, it does. so it feels like it's at least getting the css path right.
    server: {
    port: 3000,
    open: true,
    proxy: {
      '/graphql': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      },
    }
  },
  build: {
    outDir: 'build',
  },
})
