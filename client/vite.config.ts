import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode, ssrBuild }) => {
  const env = loadEnv(mode, process.cwd()); 
  return {
    build:{
      outDir: '../dist'
    },
    plugins: [vue()],
    server: {
      host: true,
      proxy: { // 本地开发接口代理 处理本地开发接口跨域问题
        '/api': {
          target: env.VITE_PROXY,
          changeOrigin: true,
          ws: true,
          secure: false,
          // rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    }
  }
})
