import react from '@vitejs/plugin-react'

import * as path from 'path'
import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      plugins: [
        visualizer({
          open: true, // 直接在浏览器中打开分析报告
          filename: 'stats.html', // 输出文件的名称
          gzipSize: true, // 显示gzip后的大小
          brotliSize: true, // 显示brotli压缩后的大小
        }),
      ],
    },
  },
  server: {
    proxy: {
      // '/api/login': 'http://8.130.108.74:9010/api/v1',
      '/api': {
        target: 'http://8.130.108.74:9010/api/v1',
        changeOrigin: true,
      },
    },
  },
})
