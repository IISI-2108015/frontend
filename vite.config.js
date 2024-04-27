import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: { // 設定代理，解決跨域問題
      "/*": {
        target: "http://localhost:8080",
        changeOrigin: true,
      }
    }
  }
})
