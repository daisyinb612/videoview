import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite 配置
export default defineConfig({
  plugins: [react()],

  // 部署到 GitHub Pages 时，必须设置 base 为仓库名
  // 对应访问地址为：https://daisyinb612.github.io/videoview/
  base: '/videoview/',

  server: {
    port: 3000,
    open: true
  }
})

