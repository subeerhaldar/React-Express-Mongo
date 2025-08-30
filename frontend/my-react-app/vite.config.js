import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy all requests starting with '/api' to 'http://localhost:3000'
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true, // Needed for virtual hosted sites
        //rewrite: (path) => path.replace(/^\/api/, ''), // Remove '/api' prefix from the request path
      },
      // You can add more proxy rules for different paths
      '/auth': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
});