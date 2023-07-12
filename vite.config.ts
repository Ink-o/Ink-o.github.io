import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

const _resolve = (targetDiv: string) => {
  return resolve(__dirname, targetDiv)
}
export default defineConfig({
  plugins: [react()],
  base: './', // 以相对路径为请求资源
  resolve: {
    alias: {
      '@': _resolve('./src'),
    },
  },
})
